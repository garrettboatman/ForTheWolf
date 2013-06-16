<?php

//class="expando"

//need to add proper doctype, consider getting it audited.

// select title, (select name from extras e where e.episode_id = ep.id) as name from episodes ep;


//temp notes:
/*

$ sudo vim /etc/mysql/my.cnf
	bind-address = 0.0.0.0

$ sudo service mysql restart

mysql> CREATE USER 'mithos'@'localhost' IDENTIFIED BY 'martel';

mysql> GRANT ALL PRIVILEGES ON *.* TO 'mithos'@'%' IDENTIFIED BY 'martel' WITH GRANT OPTION;
mysql> FLUSH PRIVILEGES;

mysql> SELECT user from mysql.user;

$ sudo mysql


import MySQLdb
con = MySQLdb.connect(host="192.168.1.20", user="mithos", passwd="martel", db="janda")
cursor = con.cursor()
cursor.execute('ALTER table extras drop foreign key extras_ibfk_1')
con.commit()



<div style="clear:both; width:99%; padding:5px; border:2px solid #000000; background-color:white">

 */

require "php/functions.php"; 

session_start();

//$_SESSION['cart'] = array(); //contains all items
//echo $_SERVER['PHP_SELF'];


?>

<!DOCTYPE html>
<html>
	<head>
		<title>Jake & Amir | Script Archive</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
		<!-- Fonts -->
		<link href="fonts/fonts.css" rel="stylesheet">
		<!-- Bootstrap -->
		<link href="css/bootstrap.css" rel="stylesheet" media="screen"> 
		
		<link href="css/datepicker.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css">
		<!-- IE -->
		<!--[if lte IE 10]<link href="css/ie.css" rel="stylesheet"><![endif]-->

		
	</head>
	<body class="preload">
		<div class="site_info"></div>
		<div id="header_wrapper">
			<div id="header-inner">
				<div class="container">
					<div class="row-fluid">
						<div class="span8 offset2 search-wrapper">
					
					<?php // Declare all search parameters for the search form
					
					$searchErr = $exactPhraseErr = $titleOnlyErr = $fromDateErr = $toDateErr = "";
					$titleOnly = $exactPhrase = $fromDate = $toDate = "";					
					$search = array();
					
					if($_SERVER["REQUEST_METHOD"] == "GET") {
						if(empty($_GET["search"])) {
							$searchErr = "No search terms selected.";
						} else {
							$search = removeBlanks(explode(" ", $_GET["search"]));
						}
						if(empty($_GET["exact-phrase"])) {
							$exactPhraseErr = "No search terms selected.";
						} else {
							$exactPhrase = $_GET["exact-phrase"];
						}						
						if(empty($_GET["title-only"])) {
							$titleOnlyErr =  "Missing";
						} else {
							$titleOnly = "checked='checked'";
						}
						if(empty($_GET["from-date"])) {
							$fromDateErr = "Missing";
						} else {
							$fromDate = $_GET["from-date"];
						}
						if(empty($_GET["to-date"])) {
							$toDateErr = "Missing";
						} else {
							$toDate = $_GET["to-date"];
						}
					}
					?>
							<!-- Search Form -->					
							<form method="get" action="index.php">
								<label for="search-terms-bar" class="ie">Search any phrase...</label>
								<input id="search-terms-bar" class="default-text" type="text" name="search" value="<?php printSearchTerms($search); ?>" autocomplete="off" placeholder="Search any phrase..." >
								<button class="search-button" type="submit"><span class="profilesearch"></span></button>											<a class="button advanced-button">Advanced Options</a>
								
								<!-- TODO New Advanced Options -->
								<div id="advanced-options">
									<input id="title" type="checkbox" value="title"><label for="title">Episode Title</label>
									<input id="phrase" type="checkbox" value="phrase"><label for="phrase">Exact Phrase</label>
									<br>
									<div class="range-wrapper">
										<input id="range-start" class="range datepicker" placeholder="Start Date" type="text"  value="02-14-2012">
										<span class="range-label"> to </span>
										<input id="range-end"  class="range datepicker" placeholder="End Date" type="text" value="02-16-2012">
									</div>
								</div>
								<!-- END New Advanced Options -->
								
								<!-- TODO Old ADVANCED OPTIONS -->
								<div id="advanced-options">
									<div>
										<input id="exact-phrase-bar" class="default-text"  type="text" name="exact-phrase"
											value="<?php echo $exactPhrase;?>" autocomplete="off" />
									</div>
									<div id="title-only" class="advanced-option-box">
										<input id="title-only-checkbox" type="checkbox" name="title-only" <?php echo $titleOnly;?> />
										<label for="title-only-checkbox"> Search by title only</label>
									</div>
									<div id="date-pickers" class="advanced-option-box">
										<label>Between</label> <input id="from-date" class="date-input" type="text" name="from-date" value="<?php echo $fromDate;?>" />
										<label>and</label> <input id="to-date" class="date-input" type="text" name="to-date" value="<?php echo $toDate?>" />
									</div>
								</div>
								<div class="submit-container">
									<input type="hidden" name="do-search" value="1">
									<!-- <button id="advanced-options-button" class="form-button" type="button">Advanced Options &#9660;</button>								
									<input id="submit-search" class="form-button" type="submit" />
									<button id="clear-all-button" class="form-button" type="button"> Clear All </button> -->
								</div>
								<!-- END Old ADVANCED OPTIONS -->
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
				
				
				<?php include "test-results.php"; ?>
		<div id="footer-wrapper">
			<div class="footer">
				<div class="container">
					<div class="row-fluid">
						<div class="span12">
				&copy; 2013 Christopher Chu & <a href="http://www.garrettboatman.com">Garrett Boatman</a> | All videos owned by <a href="">CollegeHumor.com</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<a class="info" data-original-title="Oh sheesh, y'all!" data-toggle="popover" data-html="true" data-placement="left" data-content="This site was developed by die hard J&A fans Christopher Chu and <a href='http://www.garrettboatman.com'>Garrett Boatman</a> for die hard J&A fans across the world. We hope you enjoy! <br><br> And a huge thanks to Amir and <a href='http://www.reddit.com/r/jakeandamir'>/r/JakeandAmir</a> for the support and ultimately making this happen!<br><br><a href='https://github.com/garrettboatman/ForTheWolf/'>Fork us on Github</a> <br>See some issues? <a href='https://github.com/garrettboatman/ForTheWolf/issues'>Let us know!</a>" title=""> <span class="profileinfo"></span></a>
	</body>
	
	
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
	<!-- Development JS -->
	<script type="text/javascript" src="js/bootstrap.js"></script> 
	
	<script type="text/javascript" src="js/modernizr.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
	
	<script>
		 $('.info').popover();
	</script>
</html>
