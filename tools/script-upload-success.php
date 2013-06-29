<?php

	function printErrors($array) {		
		//$array = array_unique($array);
		foreach ($array as $value) {
			echo $value . ' ';
		}	
	}

?>

<!DOCTYPE html>
<html>
	<head>
		<title>Jake & Amir | Script upload success</title>	
	</head>
	<body>
		<a href="script-upload.php"> Back to uploader </a>
	
		<?php
			$title = $link = $embedSrc = $duration = $airDate = $scribe = $script = "";
			$errors = array();
			
			if($_SERVER["REQUEST_METHOD"] == "POST") {
									
				if(!empty($_POST["title"])) {
					$title =  mysql_real_escape_string ( $_POST["title"] );
				} else {
					array_push($errors, "title");
				}
				if(!empty($_POST["link"])) {
					$link =  mysql_real_escape_string ( $_POST["link"] );
				} else {
					array_push($errors, "link");
				}
				if(!empty($_POST["embed-src"])) {
					$embedSrc =  mysql_real_escape_string ( $_POST["embed-src"] );
				} else {
					array_push($errors, "embed");
				}
				if(!empty($_POST["duration"])) {
					$duration =  mysql_real_escape_string ($_POST["duration"] );
				} else {
					array_push($errors, "duration");
				}
				if(!empty($_POST["air-date"])) {
					$airDate =  mysql_real_escape_string ($_POST["air-date"] );
				} else {
					array_push($errors, "air date");
				}
				if(!empty($_POST["scribe"])) {
					$scribe =  mysql_real_escape_string ( $_POST["scribe"] );
				} else {
					array_push($errors, "scribe");
				}
				if(!empty($_POST["script"])) {
					//nl2br = newline to break
					$script = mysql_real_escape_string(nl2br($_POST["script"])) ;
				} else {
					array_push($errors, "script");
				}				
			}
			
			echo "title: " . $title . "<br>";
			echo "link: " . $link . "<br>";
			echo "embed src: " . $embedSrc . "<br>";
			echo "duration: " . $duration . "<br>";
			echo "air date: " . $airDate . "<br>";
			echo "scribe: " . $scribe . "<br>";
			echo '<textarea rows="20" cols="40" name="script-result">' . $script . '</textarea>';
			
			echo "<br>";
			
			if(empty($errors)){
				echo "Running query: <br>";
				
				$insertionQuery = 'INSERT INTO episodes (title, link, embed_src, duration, air_date, scribe, script) 
					VALUES ("' . $title . '", "' . $link . '", "' . $embedSrc . '", "' . $duration . '", "' 
						. $airDate . '", "' . $scribe . '", "' . $script . '");';				

				$fakeQuery = 'INSERT INTO episodes (title, link, embed_src, duration, air_date, scribe, script) 
					VALUES ("' . $title . '", "' . $link . '", "' . $embedSrc . '", "' . $duration . '", "' 
						. $airDate . '", "' . $scribe . '", [script goes here]);';				
				
				echo $fakeQuery;
				
				$con=mysqli_connect("mysql.jakeandamir.dreamhosters.com", "mithos", "martel1864", "janda");
				if (mysqli_connect_errno($con))	{
				  echo "Failed to connect to MySQL: " . mysqli_connect_error();
				}
				mysqli_query($con, "set names utf8");
				mysqli_query($con, $insertionQuery);
				echo '<br>query completed';
				
			} else {
				echo "Error(s) detected. The script insertion will not continue until they are fixed. <br>";
				printErrors($errors);					
			}
				
		?>
		
	</body>	
</html>