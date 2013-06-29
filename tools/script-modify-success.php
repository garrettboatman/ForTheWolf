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
		<title>Jake & Amir | Script modify success</title>	
	</head>
	<body>
		<a href="script-upload.php"> Back to uploader </a>
	
		<?php
			$id = $script = "";
			$errors = array();
			
			if($_SERVER["REQUEST_METHOD"] == "POST") {
									
				
				if(!empty($_POST["id"])) {
					$id =  mysql_real_escape_string ( $_POST["id"] );
				} else {
					array_push($errors, "id");
				}
				if(!empty($_POST["new-script"])) {
					//nl2br = newline to break
					$script = mysql_real_escape_string(nl2br($_POST["new-script"])) ;
				} else {
					array_push($errors, "script");
				}				
			}
			
			echo "id: " . $id . "<br>";
			echo '<textarea rows="20" cols="40" name="script-result">' . $script . '</textarea>';
			
			echo "<br>";
			
			if(empty($errors)){
				echo "Running query: <br>";
				
				$updateQuery = 'UPDATE episodes SET script="' . $script . '" WHERE id=' . $id . ';';			
				$fakeQuery = 'UPDATE episodes SET script="' . '[script]' . '" WHERE id=' . $id . ';';
				
				echo $fakeQuery;
				
				$con=mysqli_connect("192.168.1.9", "mithos", "martel", "janda");
				if (mysqli_connect_errno($con))	{
				  echo "Failed to connect to MySQL: " . mysqli_connect_error();
				}
				mysqli_query($con, "set names utf8");
				mysqli_query($con, $updateQuery);
				echo '<br>query completed';
				
			} else {
				echo "Error(s) detected. The script update will not continue until they are fixed. <br>";
				printErrors($errors);					
			}
				
		?>
		
	</body>	
</html>