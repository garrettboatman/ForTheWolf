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
		<title> Jake and Amir Script Database</title>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css">
		<script src="http://code.jquery.com/jquery-1.9.1.js" type="text/javascript"></script>
		<script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js" type="text/javascript"></script>
		<script src="js/javascript.js" type="text/javascript"></script>
	</head>	
	<body>
		<div id="container">
			<div id="main-header"><h1><a href="index.php">Jake and Amir Script Database </a></h1><sub><em>alpha</em></sub></div>
			<div id="content">
				<div class="content-box">
					<div id="search-area">
					
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
					
						<form method="get" action="index.php">
							<input id="search-terms-bar" class="default-text"  type="text" name="search"
								value="<?php printSearchTerms($search); ?>" autocomplete="off" /> 								
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
								<button id="advanced-options-button" class="form-button" type="button">Advanced Options &#9660;</button>								
								<input id="submit-search" class="form-button" type="submit" />
								<button id="clear-all-button" class="form-button" type="button"> Clear All </button>
							</div>
						</form>
					</div>
				</div>
				
				
				<?php include "test-results.php"; ?>
				
				
			</div>
		</div>
		
		
		
		</div>
		
	</body>
</html>
