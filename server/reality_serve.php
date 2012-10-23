<?php 
	//Keeps the node re3l server always running
	$running = true;

	$logs = "";
	//$logs = ">logs/reality.txt";		//You can uncomment these logs to switch them on - warning they get quite large quickly
	
	
	while($running == true) {
		exec('nice node reality/server/reality_serve_js.js ' . $logs);
	}
?>
	
