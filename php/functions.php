<?php					
	/* Print the contents of $search array */
	function printSearchTerms($array) {						
		//$array = array_unique($array);
		foreach ($array as $value) {
			echo $value . ' ';
		}
	}
	
	/* Remove blank entries from search array */
	function removeBlanks($array) {
		$newArray = array();
		foreach ($array as $value) {
			if(!empty($value)){
				trim($value);
				array_push($newArray, $value);
			}
		}		
		return $newArray;
	}
					
?>