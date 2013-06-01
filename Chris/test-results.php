<?php if(isset($_GET['do-search']) || isset($_GET['single-episode'])) { //a request was made to display results ?>
				
				<div class="content-box">
					<div id="results-area">
						
						<div id="back-to-top" type="button"> Back to top </div>
											
						<div id="results-info">
						<?php 
							echo "Showing results for: "; printSearchTerms(array_unique($search)); echo $searchErr.'<br>';
							if(!empty($exactPhrase)) echo 'with the exact phrase:' . $exactPhrase.'<br>';
							if(!empty($titleOnly)) echo "Search limited to title only <br>";  
							if(!empty($fromDate) && !empty($toDate)) echo 'Between' . $fromDate . ' and ' . $toDate.'<br>';
						?>
						</div>
						
						<?php
							// Create connection
							$con=mysqli_connect("192.168.1.2", "mithos", "martel", "janda");

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
							
							if(!empty($exactPhrase)) {
								array_push($search, $exactPhrase);
							}
							
							// Create query for single episode
							if(isset($_GET['single-episode']) && isset($_GET['single-id'])) {								
								$singleId = $_GET['single-id'];
								$fullQuery = "SELECT * FROM episodes WHERE id=" . $singleId . ";";
							} 
							
							// Create query for search
							else {														
								// Build the title search terms
								$titleQuery = "SELECT * from episodes WHERE (";
								$scriptQuery = "";							
								$searchLength = count($search);
								
								if( isset($search) && $searchLength > 0){
									// construct title query
									for ($i = 0; $i < $searchLength; $i++) {
										$word = mysql_real_escape_string($search[$i]);
										$titleQuery = $titleQuery . "title LIKE '%" . $word . "%'";
										if($i != $searchLength - 1){
											$titleQuery = $titleQuery . " AND ";
										} 
									}
								
									if( empty($titleOnly)){							
										$scriptQuery = ") OR (";
										
										// construct script query
										for ($i = 0; $i < $searchLength; $i++) {
											$word = mysql_real_escape_string($search[$i]);
											$scriptQuery = $scriptQuery . "script LIKE '%" . $word . "%'";
											if($i != $searchLength - 1){
												$scriptQuery = $scriptQuery . " AND ";
											} else {
												$scriptQuery = $scriptQuery . ")";
											}
										}
										
										
									} else {
										$titleQuery = $titleQuery . ")"; 
									}
									
								$fullQuery = $titleQuery . "" . $scriptQuery . ";"; //may not need semicolon
								
								}								
								
							}
							
							echo $fullQuery;
							//execute the SQL query and return records
							$result = mysqli_query($con, $fullQuery);
						?>
						
						<div id="results-accordion">
						
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
								
								//continued below		
						?>
							<div><!-- header -->
								<table class="results-header-table"> 
									<tr>
										<th class="results-header title"><?php echo $title; ?></th>
										<th class="results-header date"><?php echo $air_date; ?></th>
										<th class="results-header time"><?php echo $duration; ?></th>
									</tr>
								</table> 	
							</div><!-- end header -->
							
							<div><!-- content -->
								<div class="script-meta-data"> 
								
									<?php // create permalink to episode page
										$singleEpisodeUrl = "index.php?single-episode=1&single-id=" . $id ; ?>
									<span class="permalink"> <a href="<?php echo $singleEpisodeUrl; ?>">Permalink</a></span>
									<br>
									<span class="user">Script transcribed by <?php echo $scribe; ?> </span> 
									<span class="extras">
										<a href="<?php echo $link;?>" target="blank"> Episode </a>
										<?php 
										$extrasQuery = "SELECT * FROM extras WHERE episode_id = ".$id;
										$extrasResult = mysqli_query($con, $extrasQuery);
										while($exRow = mysqli_fetch_array($extrasResult)) {
											$exLink = $exRow{'link'};
											$exName = $exRow{'name'};
											echo ' | <a href="'.$exLink.'" target="blank">'.$exName.'</a>';
										}

										?>
									</span> 
								</div>
															
								<div class="script">
									<div><?php echo $script;?></div>
								</div>
								
							</div><!-- end content -->
						<?php
							} //end row iteration
							//} //end if statement
						?>
						</div>
					</div>
				</div>
<?php } ?>