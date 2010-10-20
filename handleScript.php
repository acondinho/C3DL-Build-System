<?php
	if (isset($_GET['submitBtn'])) {
		$result = array();
		$fileName = "c3dl";
		$minifyArg = "";

		// Client requestts minified version
		if(isset($_GET['getMini'])) {
			$minifyArg = "1";
			$fileName .= "-min";
		}
		
		// We'll be outputting a js file
		header('Content-type: application/javascript');

		// It will be called c3dl.js (possibly c3dl-min.js)
		header('Content-Disposition: attachment; filename="'.$fileName.'.js"');
		
		passthru("./c3dlbuildbot $minify");
	} else
		echo "Button not pressed";
?>