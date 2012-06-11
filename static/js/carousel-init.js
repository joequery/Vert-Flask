//------------------------------------------------------------
// File: carousel-init.js
// Purpose: Initiate the "from the blog" carousel
// Author: Joseph McCullough (@joe_query) 
// Last Updated: Dec 16, 2010
//------------------------------------------------------------
$(function(){
	// if they are on iphone or iPod, no carousel
	if(!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))))
	{
					
		$('#from_the_blog').append('<img id="prev" src="http://assets.vertstudios.com/images/prev.png" alt="previous"/><img id="next" src="http://assets.vertstudios.com/images/next.png" alt="previous"/>');
							
		$(".post_snippet").css('paddingLeft', 0).carousel({
			margin: 15,
			speed: 500,
			left: $("#prev"),
			right: $("#next")
		});		
	}		
});
