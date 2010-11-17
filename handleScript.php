<?php
	/*
		Web Interface for C3DL Build System
		
		Interpret HTML parameters and pass arguments to shell script for output.
	*/
	error_reporting(E_ALL);
	if (isset($_GET['submitBtn'])) {
		$result = array();
		$fileName = "c3dlapi";
		$minifyArg = "full";
		$debugArg = "debug";

		// Client requestts minified version
		if(isset($_GET['getMini'])) {
			$minifyArg = "minified";
		}
		
		if(isset($_GET['getDebug']))
		{
			$debugArg = "nodebug";
		}
		
		// We'll be outputting a js file
		header('Content-type: application/javascript');

		// It will be called c3dl.js (possibly c3dl-min.js
		header('Content-Disposition: attachment; filename="'.$fileName.'.js"');
		
		//build absolute path
		$currDir = exec('pwd');
		$cmd = $currDir."/c3dlbuildbot ".$minifyArg." ".$debugArg;
		$retVal;
		
		// Pass arguments to shell script, which builds library
		// Shell script outputs to stdout, which is redirected to browser
		passthru($cmd, $retVal);
		
		if ($retVal !== 0) {
			echo "Error Code: $retVal";
			echo "\nCommand String: $cmd";
		}
	} else
		echo "Button not pressed";
?>
