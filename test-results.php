<?php if(isset($_GET['do-search']) || isset($_GET['single-episode'])) { //a request was made to display results ?>
				
		<div id="body_wrapper">
			<div class="container">
				<div class="row-fluid">
					<div class="results-wrapper span12">
						Showing <span class="results-number"><!-- TODO: Results --></span> Results for 
						<span class="search-string">
							" <?php printSearchTerms(array_unique($search)); echo $searchErr ?>"
						</span>
						<?php
						if(!empty($exactPhrase)) echo 'Exact phrase enabled <br>';
						if(!empty($titleOnly)) echo "Search limited to title only <br>";  
						if(!empty($fromDate) && !empty($toDate)) echo 'Between ' . $fromDate . ' and ' . $toDate .'<br>';
						?>
					</div>
				</div>
				<div class="row-fluid">
					<div class="episodes-wrapper span12">	
						<?php
							// Create connection
							
							// Garrett's Local Setup:: $con=mysqli_connect("localhost", "root", "root", "janda");
							$con=mysqli_connect("mysql.jakeandamir.dreamhosters.com", "mithos", "martel1864", "janda");
							// Chris $con=mysqli_connect("192.168.1.9", "mithos", "martel", "janda");

							// Check connection
							if (mysqli_connect_errno($con))
							{
							  echo "Failed to connect to MySQL: " . mysqli_connect_error();
							}
							//else { echo "Successfully connected. <br>"; }
							
							/* fields
								search : array
								exact-phrase : string
								title-only : string {checked='checked'}
								from-date : string
								to-date : string
							
							*/							
						
              // join all search terms into one string
							if(!empty($exactPhrase)) {
                $exactString = implode(" ", $search);
                $search = array();
                array_push($search, $exactString);
							}
							
							// Create query for single episode
							if(isset($_GET['single-episode']) && isset($_GET['single-id'])) {								
								$singleId = $_GET['single-id'];
								$fullQuery = "SELECT * FROM episodes WHERE id=" . $singleId . ";";
							} 
							
							// Create query for search
							else {														
								// Build the title search terms
								$titleQuery = "SELECT * from episodes WHERE ((";
								$scriptQuery = "";							
                $dateQuery = "";
								$searchLength = count($search);
								
								if( isset($search) && $searchLength > 0){
									// construct title query
									for ($i = 0; $i < $searchLength; $i++) {
										$word = mysqli_real_escape_string($con, $search[$i]);
										$titleQuery = $titleQuery . "title LIKE '%" . $word . "%'";
										if($i != $searchLength - 1){
											$titleQuery = $titleQuery . " AND ";
										} 
									}
								
									if( empty($titleOnly)){							
										$scriptQuery = ") OR (";
										
										// construct script query
										for ($i = 0; $i < $searchLength; $i++) {
											$word = mysqli_real_escape_string($con, $search[$i]);
											$scriptQuery = $scriptQuery . "script LIKE '%" . $word . "%'";
											if($i != $searchLength - 1){
												$scriptQuery = $scriptQuery . " AND ";
											} else {
												$scriptQuery = $scriptQuery . "))";
											}
										}
																				
									} else {
										$titleQuery = $titleQuery . "))"; 
									}

									if(!empty($toDate) && !empty($fromDate)) {
                    $dateQuery = " AND (air_date <='". $toDate ."' AND air_date >= '" . $fromDate . "') ORDER BY air_date ASC";

                  }
								$fullQuery = $titleQuery . "" . $scriptQuery . "" . $dateQuery . ";"; //may not need semicolon
								
								}								
								
							}
							
							echo $fullQuery;
							//execute the SQL query and return records
							$result = mysqli_query($con, $fullQuery);
						?>
						
						
						<?php
							//fetch tha data from the database
							while ($row = mysqli_fetch_array($result)) {
								
								$id = $row{'id'};
								$title = $row{'title'};
								$link = $row{'link'};
								$script = $row{'script'};
								$duration = $row{'duration'};
								$air_date = $row{'air_date'};
								$scribe = $row{'scribe'};
								$iframe = $row{'embed_src'};
								//continued below		
						?>
						

						<!-- Starts and Episode Item -->
						<article class="episode-item">
							<div class="episode-item-header">
								<table class="episode-header-inner">
									<tr>
										<td class="header-inner-dropdown"><div class="arrow-wrapper"><span class="dropdown_arrow"></span></span></td>
										<td class="header-inner-title"><?php echo $title; ?></td>
										<td class="header-inner-calendar hidden-phone"><span class="calendar"></span></td>
										<td class="header-inner-date hidden-phone"><span><?php echo $air_date; ?></span></td>
									</tr>
								</table>
							</div>
							<div class="episode-item-content">
								<div class="episode-item-content-inner">
									<div class="row-fluid">
										<div class="span7 episode-video">
											<div class="episode-video-inner">
												<!-- TODO: iframe on this <a href="<?php echo $link;?>" target="blank"> Episode </a> -->
												<iframe src="<?php echo $iframe; ?>" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>
											</div>
										</div>
										<div class="span5 episode-details-wrapper">
											<table class="episode-details">
											<!-- <tr>
												<td><span class="play"></span></td>
												 <td>Movie Date 2 (with Ben Schwartz and Thomas Middleditch)</td>
											</tr> -->
											<tr class="visible-phone">
												<td><span class="calendar"></span></td>
												<td><?php echo $air_date; ?></td>
											</tr>
											<tr>
												<td><span class="clock-icon"></span></td>
												<td><?php echo $duration; ?></td>
											</tr>
											
											<!-- if Outtakes exist -->
											<?php 
											$extrasQuery = "SELECT * FROM extras WHERE episode_id = ".$id;
											$extrasResult = mysqli_query($con, $extrasQuery);
											while($exRow = mysqli_fetch_array($extrasResult)) {
												$exLink = $exRow{'link'};
												$exName = $exRow{'name'}; ?>
												<tr>
													<td><span class="noun_project_2863"></span></td>
													<td><a class="button" href="<?php echo $exLink; ?>"><?php echo $exName; ?></a></td>
												</tr>
											<?php } ?>
											<!-- endif -->
											
											<tr>
												<td><span class="reddit_icon"></span></td>
												<td><a class="button" href="#">Post</a> by <a target="_blank" class="button" href="http://www.reddit.com/u/<?php echo $scribe; ?>"><?php echo $scribe; ?></a></td>
											
											<!-- <?php  // TODO: Create Front End Share Options create permalink to episode page
											$singleEpisodeUrl = "index.php?single-episode=1&single-id=" . $id ; ?>
											<span class="permalink"> <a href="<?php echo $singleEpisodeUrl; ?>">Permalink</a></span>-->
											</tr>
											</table>
											<button class="script-button">
												<table>
													<tr>
														<td><span class="script-icon"></span></td>
														<td>&nbsp;&nbsp;<span class="show-script">Show</span><span class="hide-script">Hide</span> Episode Script</td>
													</tr>
												</table>								
											</button>
										</div>
										<div class="row-fluid">
											<div class="span12">
												<div class="episode-script">
													<div class="episode-script-inner">
														<?php echo $script;?>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</article>										
						<?php
							} //end row iteration
							//} //end if statement
						?>
						<!-- End Episode -->
					</div>
				</div>
			</div>
		</div>
<?php } ?>
