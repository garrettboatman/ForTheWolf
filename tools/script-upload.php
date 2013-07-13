<META http-equiv="Content-Type" content="text/html; charset=utf-8">

<?php
//session_start();
?>

<!DOCTYPE html>
 
<html>
	<head>
		<title>Jake & Amir | Script upload</title>	
	</head>
	<body>
	
		<h2>Welcome to my domain...</h2>

		<form action="script-upload-success.php" method="post">
			ID: <input type="text" name="id"> <b> Leave this blank to create a new episode.</b> Don't fuck around.  <br/>
			Title: <input type="text" name="title"> <br/>
			Link: <input type="text" name="link"> The link listed in the 
				<a href="http://www.reddit.com/r/jakeandamir/comments/11ai05/the_unofficial_ja_master_list/c7hlkoq">Reddit master list </a> 
				(e.g. <i>http://www.jakeandamir.com/post/1544860521/toilet-paper )</i> <br/>
			Embed src: <input type="text" name="embed-src"> (note: do <i>not</i> use an swf for old college humor uploads. Only use links of the format http://www.collegehumor.com/e/6338943 )<br/>
			Duration: <input type="text" name="duration"> e.g <i> 2:25 </i> <br/>
			Air Date: <input type="text" name="air-date"> e.g. <i> 2013-02-12 </i> <br/>
			Scribe: <input type="text" name="scribe"> Transcriber's reddit name e.g. <i>just_4_you_babe</i><br/>
			Script:<br> <textarea rows="20" cols="40" name="script"></textarea> Note: line breaks will be converted into html br tags. <br/>
			<input type="hidden" name="script-upload" value="1">
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
