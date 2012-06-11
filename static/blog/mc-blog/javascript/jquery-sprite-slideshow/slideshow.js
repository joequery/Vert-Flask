$(function(){

/***********************function spriteSlideShow********************
Description: Executes a sprite based slideshow.
PARAMETERS:
containerDiv:        The div that acts as the slideshow CONTAINER
animationSpeed:      The speed of the animation effect(in seconds)
slideDuration:       How long(in seconds) a slide will stay in place before animating
delay:               Time(in seconds) between animations
numberOfIterations:  How many times the slideshow will cycle


Precondition: jQuery library must be loaded. 

HTML Structure
<div id="slideShowFrame">
	<div id="slideshow"> !NOTE: This is containerDiv
		<div id="-----" class ="slide"></div>
		<div id="-----" class ="slide"></div>
		<div id="-----" class ="slide"></div>
	</div>
</div>

"slideshow" MUST come immediately after "slideshowFrame" due to the parent() function. 

Necessary CSS Structure (Feel free to customize, but the styles listed MUST be kept): 

#slideShowFrame{
display: none; //This avoids an initial flicker on IE7
}

#slideshow:{
display: none;
}

.slide{
width: SPECIFIED BY USER
height: SPECIFIED BY USER
}

The divs with class "slide" will be positioned by the function.


*/

function spriteSlideShow(containerDiv, animationSpeed, slideDuration, numberOfIterations)
{
	//default value for delay time
	delay = typeof(delay) == 'undefined' ? 0 : delay;
	
	//default value for number of loops
	numberOfIterations = typeof(numberOfIterations) == 'undefined' ? 1 : numberOfIterations;
	
	
	//Get milliseconds from seconds
	animationSpeed *= 1000;
	 slideDuration *= 1000;
	         delay *= 1000;	
	
	var slideHeight = parseInt($('.slide').css('height')); //Height of slide
	var slideWidth = parseInt($('.slide').css('width'));   //Width of slide
	var slide = $('.slide').get();                             //Array of the divs used as slides
	var numberOfSlides = $(slide).size();                      //Total number of slides
	
	//Adjust CSS properties for frame
	$(containerDiv).parent().css(
	{
		   'width' :  slideWidth , 
		'position' : 'relative',
		 'display' : 'block',
		'overflow' : 'hidden'
	});
	
	//Adjust CSS properties for class 'slide'
	$('.slide').css(
	{
		'overflow': 'hidden',
		'position': 'absolute',
		     'top': '0px'	
	});
	
	//Adjust CSS properties for #container
	$(containerDiv).css(
	{
		'width' : slideWidth * numberOfSlides,
		'height': slideHeight,
		'position' : 'relative'	
	});
	
	//Adjust CSS 'left' property for all slides
	for(var i=0; i < numberOfSlides; i++)
	{
		$(slide[i]).css('left', slideWidth * i);
	}
	
	//Display slideshow as many times as specified

	for (var iterationCount = 1; iterationCount <= numberOfIterations; iterationCount++)
	{
		for(var slideIndex = 1; slideIndex <= numberOfSlides; slideIndex++)
		{
			//Fade in Container
			$(containerDiv).animate({opacity: "show"}, animationSpeed);		
			
			//If not the last loop and not the last slide
			if(!((iterationCount == numberOfIterations) && (slideIndex == numberOfSlides )))
			{			
			//Fade out Container after waiting slideDuration number of seconds
			$(containerDiv).delay(slideDuration).animate({opacity: "hide"}, animationSpeed);
	
			//Move the container while it can't be seen
			$(containerDiv).animate({left: -(slideWidth * slideIndex)}, delay);
			}
			
						
		}
		//If not the last loop, reset sprite position
		if (iterationCount != numberOfIterations)
		{
			$(containerDiv).animate({left:0}, delay)
		}
	}
}

spriteSlideShow($('#slideshow'), 1, 1, 1);
});