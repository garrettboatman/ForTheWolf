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

  /* Convert datepicker value to MySQL date */
  function toSqlDate($inputString){
    $delim = '-';
    $splitInput = explode($delim, $inputString);

    if(count($splitInput) == 3){
      $outputString = $splitInput[2] . "-" . $splitInput[0] . "-" . $splitInput[1];    
      return $outputString;
    } else {
      return "";
    }

  }
					
?>
