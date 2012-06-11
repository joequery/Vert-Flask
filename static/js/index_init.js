//------------------------------------------------------------
// File: index_init.js
// Purpose: Initiate the slave slideshow for the home page
// Author: Joseph McCullough (@joe_query) 
// Last Updated: Dec 16, 2010
//------------------------------------------------------------
$(window).load(function()
{
	$('#featured_work').append('<div id="slideshow_nav"><ul><li class="slideNavActive">1</li><li>2</li><li>3</li></ul></div>');
	var summary = 
	{
		container: $("#summaries"),
		entrance: {animation: "fromRight", easing: "easeInOutQuint"},
		exit: {animation: "toLeft", easing: "easeInOutQuint"}
	};
	
	$("#screenshots").slaveshow(
	{
		slaves: [summary],
		entrance: {speed: 1000},
		exit: {speed: 1000},
		transition: "fade",
		duration: 13000,
		nav: $("#slideshow_nav ul li")
	});
});
