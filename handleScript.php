<?php
	if (isset($_GET['submitBtn'])) {
		$result = array();
		$fileName = "c3dlapi";
		$minifyArg = "full";

		// Client requestts minified version
		if(isset($_GET['getMini'])) {
			$minifyArg = "minified";
		}
		
		// We'll be outputting a js file
		header('Content-type: application/javascript');

		// It will be called c3dl.js (possibly c3dl-min.js
		passthru("./c3dlbuildbot $minify");
		header('Content-Disposition: attachment; filename="'.$fileName.'.js"');

	} else
		echo "Button not pressed";
?>