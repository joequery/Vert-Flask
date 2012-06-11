<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head>
<title>JQuery</title>
<style type="text/css">
#slideShowFrame{
display: none;
margin: 0px auto;}

#slideshow{
margin: 0px auto;
background-color: #000000;
}

.slide{
width: 200px;
height: 200px;}


#box{
background-color: #000099;
}
#box2{
background-color: #FF0000;
}
#box3{
background-color: #FFFF00;
}
#box4{
background-color: #CCCCCC;}

p {margin: 0px auto; clear: both; font-size: 2em;}
</style>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="slideshow.js"></script>

</head>
<body>
<div id="slideShowFrame">
	<div id="slideshow">
		<div id="box" class="slide"><p>Slide1!</p></div>
		<div id="box2" class="slide"><p>Slide2!</p></div>
		<div id="box3" class="slide"><p>Slide3!</p></div>
		<div id="box4" class="slide"><p>Slide4!</p></div>
</div>
</div>
</body>
</html>