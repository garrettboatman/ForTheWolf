<?php
			include "dbConfig.php";
			$con=mysqli_connect($hostName, $userName, $password, $database);
			
			if (mysqli_connect_errno($con))	{
			  echo "Failed to connect to MySQL: " . mysqli_connect_error();
			}
			
			$query = "SELECT * FROM episodes";
			
			$result = mysqli_query($con, $query);

			//fetch tha data from the database
			while ($row = mysqli_fetch_array($result)) {
				
				$id = $row{'id'};
				$title = $row{'title'};
				$link = $row{'link'};
				$duration = $row{'duration'};
				$air_date = $row{'air_date'};
				$scribe = $row{'scribe'};
				$iframe = $row{'embed_src'};
				
				echo "ID: " . $id . ", Title: " . $title . ", Link: " . $link . ", Duration: " .  $duration . 
					", Air date: " . $air_date  . ", Scribe: " . $scribe . ", Embed src url: " . $iframe . "<br/>";
			
			}
			
?>