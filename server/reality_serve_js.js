/*

	Node Javascript Re3l server
	
	
	    Copyright (C) 2012  Rvolve Ltd.

	    This program is free software: you can redistribute it and/or modify
	    it under the terms of the GNU Affero General Public License as
	    published by the Free Software Foundation, either version 3 of the
	    License, or (at your option) any later version.

	    This program is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU Affero General Public License for more details.

	    You should have received a copy of the GNU Affero General Public License
	    along with this program.  If not, see http://www.gnu.org/licenses/.

	Contact webmaster AT rvolve.com
	
	
	Requirements:
	
	Run on a server using Node.  You must have MySQL installed.
	
	Get mysql node connector
	------------------------

	From: http://nodejsdb.org/db-mysql/

	sudo apt-get install libmysqlclient15-dev
	export MYSQL_CONFIG=/usr/bin/mysql_config

	npm install db-mysql


	Get socket.io
	-------------

	npm install socket.io


	Install sql files for objects
	------------------------------

	E.g.
	mysql -u root -p <reality_YOUR_MODEL.sql

	You can convert 3D models into Re3l models from http://rvolve.com/create_reality_model.php
	

	Run the node server
	-------------------
	
	Edit the database username, password and host in this script below.
	
	node reality_serve_js.js &
	or
	nohup node reality_serve_js.js > output.log &
	or for continual operation after a crash, a PHP wrapper:
	php reality_serve.php &





	

*/


var dbHostname = "127.0.0.1";
var dbUser = "YOUR MySQL Username here";
var dbPassword = "YOUR MySQL Password here"; 
var re3lPort = "10000";



var io = require('socket.io').listen(re3lPort);


/* TODO fix these errors:

 (node) warning: possible EventEmitter memory leak detected. 11 listeners added. Use emitter.setMaxListeners() to increase limit.
Trace
    at Socket.<anonymous> (events.js:139:15)
    at [object Object].<anonymous> (/var/www/rvolve/reality/server/reality_serve_js.js:135:15)
(node) warning: possible EventEmitter memory leak detected. 11 listeners added. Use emitter.setMaxListeners() to increase limit.
Trace
    at Socket.<anonymous> (events.js:139:15)
    at [object Object].<anonymous> (/var/www/rvolve/reality/server/reality_serve_js.js:109:15)

*/


function getChunk(tempdb, chunkId, modelId, clientRequestId, socket)
{
	//Gets a single chunk from the reality engine database
	var runOnce = false;
	
	
	
	if(chunkId) {
		if(modelId) {
			
		 	tempdb.query('SELECT * FROM tbl_voxel_block WHERE int_voxel_block_id = ' + chunkId + ' AND int_model_id = ' + modelId).execute(function(error, rows, cols) {
						
						
				if (error) {
					socket.emit('chunk_request_reply' + clientRequestId, '[[],[],[],' + clientRequestId +']');
			
				} else {
					if(rows[0]) {
					
						if(runOnce == false) {
							socket.emit('chunk_request_reply' + clientRequestId, '[' + rows[0].int_voxel_block_id + ',' + rows[0].json_voxel_colour + ',' + rows[0].json_voxel_block_child_id + ', ' + clientRequestId + ']');
							runOnce = true;
						}
					} else {
						socket.emit('chunk_request_reply' + clientRequestId, '[[],[],[], ' + clientRequestId +']');
	
					}
				}
			
				return;	
				
			});
		}
	}
	
	
	
	return;
}


var connectionDb;		//global to this connection
var myConnections = [];

var chunks = [];


io.sockets.on('connection', function (socket) {
  socket.on('chunk_request', function (data) {
   	
   	if(data.newConnection == true) {
		var mysql = require('db-mysql');
		var db = new mysql.Database({
		    hostname: dbHostName,
		    user: dbUser,
		    password: dbPassword,
		    database: data.db
		})
		
		
		
	
		var tempdb = db;
		connectionDb = db;
		myConnections[data.db] = db;
		
	
		db.connect(function(error) {   //warning take out the async = false
	
		    var mytempdb = tempdb;
		   
	
		    if (error) {
			return console.log('CONNECTION error: ' + error);
		    }
		  
		    tempdb.query("SET NAMES 'utf8'").execute(function(error, rows, cols) {
		    			if (error) {
				        	socket.emit('chunk_request_reply', 'ERROR: ' + error);
				        	return;
			       		 }
			       		
		    		});
		    	
		    	
		     getChunk(tempdb, data.chunkId, data.modelId, data.clientRequestId, socket);
		     chunks[socket] = [];
		     chunks[socket][tempdb] = [];
		     chunks[socket][tempdb][data.clientRequestId] = true;
		     
		   
		   
		     //Now start a new thread for handling this database in future
		     socket.on('chunk_request_' + data.db, function (mydata) {
			   
			
			   
			   
			   console.log('In thread:' + mydata.clientRequestId);
			   if(!chunks[socket][tempdb]) {
			   
			   	//Attempt to restart
			   	chunks[socket] = [];
			   	chunks[socket][tempdb] = [];
			   
			   }
			   if((chunks[socket][tempdb][mydata.clientRequestId])&&(chunks[socket][tempdb][mydata.clientRequestId] == true)) {
			   	console.log('2nd request to:' + mydata.clientRequestId + '\n');
			   	
			   } else {
			   	 
			   	 
			   	getChunk(tempdb, mydata.chunkId, mydata.modelId, mydata.clientRequestId, socket);
			   	chunks[socket][tempdb][mydata.clientRequestId] = true;
			   	
			   }
		     
		     });
		     
		     socket.on('disconnect', function () {
		     	console.log('Disconnected about to disconnect db');
		     	//exit(0);
		     	chunks[socket][tempdb] = null;	//clear out the chunks
			 mytempdb.disconnect();
		     });
		   
		      
		
		});
	} 
    
    	
    

	
  });
  
 
  
});
