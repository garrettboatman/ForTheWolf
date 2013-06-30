<?php
//session_start();
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Jake & Amir | Script upload</title>	
	</head>
	<body>
	
		<h2>New Script Uploader </h2>
		
		<p> 
			Note: this is for <b>new scripts only</b>. Adding a	
			script for an existing episode will create a duplicate.
		</p>
		
		<form action="script-upload-success.php" method="post">
			Title: <input type="text" name="title"> Make sure this matches the CSV file title <i>exactly</i> <br/>
			Link: <input type="text" name="link"> The link listed in the Reddit master list (e.g. http://www.jakeandamir.com/post/1544860521/toilet-paper )<br/>
			Embed src: <input type="text" name="embed-src"> (note: do <i>not</i> use an swf for old college humor uploads. Use links of the format http://www.collegehumor.com/e/6338943 )<br/>
			Duration: <input type="text" name="duration"> e.g 2:25 <br/>
			Air Date: <input type="text" name="air-date"> e.g. 2013-02-12 <br/>
			Scribe: <input type="text" name="scribe"> Transcriber's reddit name. Don't leave it blank, find out or put <i>wiki</i><br/>
			Script:<br> <textarea rows="20" cols="40" name="script"></textarea> The script itself. We may need to edit the text before pasting it in. <br/>
			<input type="hidden" name="script-upload" value="1">
			<input type="submit">
		</form>
		
		<hr/>
		
		<h2>Existing script modifier </h2>
		
		<p> 
			Note: this is for <b>episodes already in the database</b>. 
			The intent is to update/add a script to an existing episode.
		</p>
		
		<form action="script-upload-success.php" method="post">
			
			Id: <input type="text" name="id"> ID of an episode that is already in the database <br/>
			Script:<br> <textarea rows="20" cols="40" name="new-script"></textarea> The script itself. We may need to edit the text before pasting it in. <br/>
			<input type="hidden" name="script-modify" value="1">
			<input type="submit">
		</form>
		
		<hr/>
		
		<h2>Extras/Outtakes creation </h2>
		
		<p> 
			Note: this is for <b>episodes already in the database</b>. 
			The intent is to create a new extras entry for an existing episode.
			You can add as many as you want to a single episode.
		</p>
		
		<p> 
			You can find this info on the <a href="http://www.reddit.com/r/jakeandamir/comments/11ai05/the_unofficial_ja_master_list/c7hlkoq">Reddit master list </a>
		</p>
		
		<form action="script-upload-success.php" method="post">
			
			Episode Id: <input type="text" name="id-extra"> ID of an episode that is already in the database <br/>
			Name: <input type="text" name="name-extra"> E.g., "Outtakes", "Behind the scenes". Whatever is listed in the <br/>
			Link:  <input type="text" name="link-extra"> Link to the extra (not an embed) <br/>

			<input type="hidden" name="create-extra" value="1">
			<input type="submit">
		</form>
		
	</body>	
</html>
