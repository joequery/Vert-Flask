
	<div id="footer">
		<div id="footerinfo">
			<p>©<?php echo date('Y'); ?> McCullough Designs | mcculloughdesigns@yahoo.com | <?php echo $phone; ?> | Tyler, TX </p>
			</div>
		<div id="footerlinks"><?php
	
	
	
	
	for ($i = 0; $i < count($web); $i++)
		{
			//For as many $pageurl arrays you have, this loops and makes a pagename.php
			$linkArray[$i] = '<a href="' . $web[$i]['URL'] . '.php">' . $web[$i]['name'] . '</a>'; 
	
	
				//Adds "class=selected" to the a href for the page currently being viewed.
				switch($currentpage){ 					 
					case "/" .$web[$i]['URL']. ".php":
					$linkArray[$i] = '<a href="' . $web[$i]['URL'] . '.php" class="selected">' . $web[$i]['name']. '</a>';
					break;
					}
		
			echo "\n\t\t\t";
			echo $linkArray[$i];
			
		}
		echo "\n";
		
		
	?>
	
	
		</div>
	</div>
	
	<!-- Start of StatCounter Code -->
<script type="text/javascript">
var sc_project=5459949; 
var sc_invisible=1; 
var sc_partition=60; 
var sc_click_stat=1; 
var sc_security="fce09648"; 
</script>

<script type="text/javascript"
src="http://www.statcounter.com/counter/counter_xhtml.js"></script><noscript><div
class="statcounter"><a title="wordpress visitors"
class="statcounter"
href="http://www.statcounter.com/wordpress.org/"><img
class="statcounter"
src="http://c.statcounter.com/5459949/0/fce09648/1/"
alt="wordpress visitors" /></a></div></noscript>
<!-- End of StatCounter Code -->