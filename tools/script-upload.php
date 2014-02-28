<META http-equiv="Content-Type" content="text/html; charset=utf-8">

<?php
//session_start();
?>

<?php require "../header.php"; ?>
	<body>
	
		<div class="container episode-editor">
			<div class="row-fluid">
				<div class="span6 offset3">
					<div class="center">
					<h2 class="bebas">Episode Uploader/Editor</h2>
					</div>
			
					<form action="script-upload-success.php" method="post">
						
						<input placeholder="Episode ID" type="text" name="id"> <label for="id"> Leave this blank to create a new episode. To edit an episode, enter the ID. Don't fuck around</label><br>
						<input placeholder="Episode Title" type="text" name="title"> <label for="title">e.g. Cheryl Part 2 w/ Allison Williams</label><br/>
						<input placeholder="Episode Link" type="text" name="link"> <label for="link">The link listed on the episode's JakeandAmir.com post<br>
							e.g. <a href="http://www.jakeandamir.com/post/1544860521/toilet-paper">http://www.jakeandamir.com/post/1544860521/toilet-paper</a></label> <br/>
						<input placeholder="Embed source" type="text" name="embed-src"> <label for="embed-src">Get the embed source from collegehumor.com and... iframe="CopyThisURL"<br>
						(e.g. http://www.collegehumor.com/e/6338943)</label><br/>
						<input placeholder="Duration" type="text" name="duration"> <label for="duration">e.g 2:25</label> <br/>
						<input placeholder="Air Date" type="text" name="air-date"> <label for="air-date"> e.g. 2013-02-12</label> <br/>
						<input placeholder="Scribe" type="text" name="scribe"> <label for="scribe">Transcriber's reddit name found on <a href="http://www.reddit.com/r/jakeandamirscripts">/r/jakeandamirscripts</a>
						<br>
						e.g. <i>seeegma</i></label><br/>
						<span class="bebas">Script Text</span><br><label for="script">Note: line breaks will be converted into html &#060;br/&#062; tags</label> <textarea class="script-insert" rows="20" cols="40" name="script"></textarea>  <br/>
						<input type="hidden" name="script-upload" value="1">
						<div class="center">
						<input class="button" type="submit">
						</div>
					</form>
					
					<div class="line-break"></div>
					
						<div class="center">
							<h2 class="bebas">Extras/Outtakes creation </h2>
						</div>
					<p> 
						Note: this is for <b>episodes already in the database</b>. 
						The intent is to create a new extras entry for an existing episode.
						You can add as many as you want to a single episode.
					</p>
					
					<p> 
						You can find this info on the <a href="http://www.reddit.com/r/jakeandamir/comments/11ai05/the_unofficial_ja_master_list/c7hlkoq">Reddit master list </a>
					</p>
					
					<form action="script-upload-success.php" method="post">
						
						<input placeholder="Episode Id" type="text" name="id-extra"> <label>ID of an episode that is already in the database</label> <br/>
						<input placeholder="Name/Type" type="text" name="name-extra"> <label>e.g. "Outtakes", "Behind the scenes".</label> <br/>
						<input placeholder="Link" type="text" name="link-extra"> <label>Link to the extra (not an embed)</label> <br/>
			
						<input type="hidden" name="create-extra" value="1">
						<div class="center">
							<input class="button" type="submit">
						</div>
					</form>
				</div>
			</div>
		</div>
	</body>	
</html>
