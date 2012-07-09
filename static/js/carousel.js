//---------------------------------------------------------------------
//Carousel
//Date: December 16, 2010
//File: click-carousel.min.js
//Author: Joseph McCullough - @Joe_Query - http://www.vertstudios.com/
//---------------------------------------------------------------------

(function($) {
/******************Plug-in clickCarousel *****************
Description: Sets up a click-based slider that moves the
clicked element to the end of a row of elements. 

PARAMETERS:
margin       //The space between the shifting elements of the carousel
speed        //How long the elements take to shift
left         //The element that shifts the carousel left
right        //The element that shifts the carousel right
easing       //Animation easing option
*********************************************************/

$.fn.carousel = function(options)
{
	//Define scope
	var shifting = jQuery(this);
    
    //Width of the shifting elements
    var width = $(shifting).width();
    
    //Number of shifting elements
    var numElements = $(shifting).length;
    
    //Animation flag
    var animating = false;
		
	//List default values
	var defaults = {
	margin: 0,
	speed: 500,
	left: $("#left"),
	right: $("#right"),
    easing: "jswing"
	},
	settings = jQuery.extend(defaults, options); 
	
	//Line up elements from left to right, taking into account their margin.
    $(shifting).fakeFloat({margin: settings.margin});
    
    //If left trigger is clicked
    $(settings.left).click(function()
    {
        //Make sure we aren't currently animating.
        if(!animating)
        {
            animating = true;
          
            //Shift eltements left
            $(shifting).stop(true)
                       .animate({'left': '-=' + (width + settings.margin)},
                       {duration: settings.speed, easing: settings.easing});
            
            //Wait until animation is over 
            setTimeout(function()
            {
                //Take the first element and add it to the end
                $(shifting).first().animate({'left':'+=' + (width + settings.margin) * numElements},0);
                
                //Get new first/last element
                shifting = $(shifting).arrayShift("first", "last");
                    
                //No longer animating
                animating = false;
                       
            }, settings.speed);
        }                   
		return false;
    });
    
    //If right trigger is clicked
    $(settings.right).click(function()
    {
        //Make sure we aren't currently animating.
        if(!animating)
        {
            animating = true;
            
            //Put the last element at the front
            $(shifting).last().css('left', -(width + settings.margin));
            
            //Shift elements right
            $(shifting).stop(true,true)
                       .animate({'left': '+=' + (width + settings.margin)},
                       {duration: settings.speed, easing: settings.easing});
            
            //Wait until animation is over 
            setTimeout(function()
            {
                //Get new first/last element
                shifting = $(shifting).arrayShift("last", "first");
                
                //No longer animating
                animating = false;
                
            }, settings.speed);                   
        }      
		return false;
    });
    
		
	
};
})(jQuery); //End document
