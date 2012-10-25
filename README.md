re3l
====

The Re3l infinite detail javascript graphics engine



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

You can convert 3D models into Re3l models from http://re3l.org/create.php


Run the node server
-------------------

Edit the database username, password and host in this script below.

node reality_serve_js.js &
or
nohup node reality_serve_js.js > output.log &
or for continual operation after a crash, a PHP wrapper:
php reality_serve.php &


Contact: Peter Abrahamson, webmaster AT rvolve.com

