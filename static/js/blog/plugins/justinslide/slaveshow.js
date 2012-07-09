//--------------------------------------------------------------------
//File: slaveshow.js
//Author: Joseph McCullough. 
//		  http://vertstudios.com/
//		  @Joe_query
//Purpose: Executes a slideshow with optional slaves that follow suit.
//         Other features include next, previous, and navigation.
//--------------------------------------------------------------------

function isset(obj)
{
	if((typeof obj == 'undefined') || (obj == null)  || (obj == ""))
	{
		return false;
	}
	else
	{
		return true;
	}
}


(function(jQuery) {

jQuery.fn.slaveshow = function(options)
{
	/**
	---------------------------------------- User defined variables ---------------------------------------------
	    slides: jQuery object that represents the elements that will serve as slides.
	  duration: How long each slide will remain visible assuming no interruption.
	transition: The time between the previous slide's exit and the next slide's entrance.
	    cycles: How many times the slideshow will cycle through assuming no interruption. 
	     delay: How long to offset a slave slideshow from the main slideshow.
	    slaves: An array of slave slideshows that will mimic the main slideshow.
	       nav: jQuery object that represents the elements that will serve as the slide navigation.
	      left: jQuery object that represents the element(s) that will cause the slideshow to carousel left.
	     right: jQuery object that represents the element(s) that will cause the slideshow to carousel right.
	-------------------------------------------------------------------------------------------------------------		 
	**/	
	
	//Initialize default values
	var defaults = {
	 container: jQuery(this),
 	    slides: jQuery(this).children(),		
	  duration: 3000,   			
	transition: 500, 
	    slaves: [],
	     delay: 0,          			
	    cycles: 10          		    
	};	defaultSettings = jQuery.extend(defaults, jQuery.fn.slaveshow.defaults, options);  
	
	/**
	---------------------------------Global variable object---------------------------------
	     animating: Boolean flag that describes the animating state of the slideshow.
	   navSelected: Boolean flag that describes if a navigational element has been selected.
	  navAnimating: Counter that tracks the number of slideshows animating when a
    			    navigational element is clicked.
   	 relativeIndex: The relative index of a slide within the jQuery object
	   activeIndex: The absolute index of the slide being displayed.
	slidesTemplate: Serves as a template for searching for slides
	 numSlideShows: The number of slideshows: main + all slaves
	     numSlides: The number of slides each slideshow contains. 
	----------------------------------------------------------------------------------------
	**/
	var global = {
	animating: false,
	navSelected: false,
	numAnimating: 0,
	relativeIndex: 0,
	activeIndex: 0,
	slidesTemplate: jQuery(defaultSettings.slides),
	numSlideShows: 0,
	numSlides: jQuery(defaultSettings.slides).length
	};
	
	//Object that will hold the slideshows to be iterated over. Psuedo array.
	//Initialize the main slideshow.
	var slideshowArray = {main: new slideshow(defaultSettings)};		
	
	//-------------------------------Class slideshow-------------------------------//
	//Description: Establishes the structure of an individual slideshow.
	//PARAMETERS: 
	//container: A jQuery object that holds the selector for the slideshow container.
	//-----------------------------------------------------------------------------//s
	function slideshow(properties)
	{         		
		//Get most default settings
		for(var i in defaultSettings)
		{
			this[i] = (isset(properties[i])) ? properties[i] : defaultSettings[i];
		}	
		
		//Override default settings that are specific to context
		this.container = jQuery(properties.container);
		this.slides = jQuery(properties.container).children();
		
		//Entrance and exit objects must be declared in this scope since
		//an embedded object will be completely overwritten when the plugin is called.
		this.entrance = {animation: "fadeIn", speed:500, easing: "jswing"};
	    this.exit = {animation: "fadeOut", speed:500, easing: "jswing"};
		
		//Override default animation settings if specified
		for(var i in this.entrance)
		{
			this.entrance[i] = (isset(properties.entrance) && isset(properties.entrance[i])) ? properties.entrance[i] : this.entrance[i];
			this.exit[i] = (isset(properties.exit)  && isset(properties.exit[i])) ? properties.exit[i] : this.exit[i];
		}
						
		//Increment the number of slideshows for each instantiation of the slideshow class.
		global.numSlideShows++;		
	}
	
	//----------------------------Class slideshow prototype: displaySlide----------------------------//
	//Description: Exits one slide and enters another.
	//PARAMETERS:
	//newRelativeIndex: The index of the slide that will enter in relation to its position in the
    //                  jQuery object. (This index is dynamic due to how jQuery treats a jQuery
	//                  object that has been rearranged.)
	//newActiveIndex:   The index of the slide that will enter in relation to its absolute position
	//                  in the sequence of slides.
	//Postcondition:    Visually, a new slide appears if the proper conditions are met. 
	//					global.activeIndex variable is altered                   
	//                  global.animating alternates between true and false
	//                  The following classes are distributed to the nav elements (if defined):
	//						slideNavUnclickable: slideshow is under animation, can't be interrupted
	//						slideNavActive: applied to nav element that correlates with active slide
	//						slideNavActiveUnclickable: Combination of the two above	
	//-----------------------------------------------------------------------------------------------//
	slideshow.prototype.displaySlide = function(newRelativeIndex, newActiveIndex)
	{	
		//Establish scope
		var $this = this;
		
		//Set the new active index.
		global.activeIndex = newActiveIndex;
					
		//Index [0] belongs to the slide currently displayed. We don't want the animation to occur if the 
		//selected slide is currently on display. If numAnimating is less than numSlideshows, then a
		//slideshow can animate.
		if(newRelativeIndex !=0 && (global.numAnimating < global.numSlideShows))
		{				
			//The slideshow is animating. Prevent unnecessary reassignment, since global.animating will
			//remain true until the all slideshows have finished animating.
			if(global.numAnimating == 0)
				global.animating = true;
			
			setTimeout(function()
			{
				//Select first slide and exit it
				$this.firstSlide = jQuery($this.slides[0]);				
				$this.doTransition($this.firstSlide, $this.exit);
														
				//Array shift until the selected slide is at the front of the jQuery object (at index[0]).
				for(var i=0; i<newRelativeIndex; i++)
				{ 
				   $this.slides = jQuery($this.slides).arrayShift("first","last");
				}
				
				if(isset(defaultSettings.nav))
				{
					//Remove active class from any nav elements and show nav elements as unclickable during animation
					jQuery(defaultSettings.nav).removeClass('slideNavActive').addClass('slideNavUnclickable');
									
					//Determine which slide is active, and give the active class to the corresponding nav element
					jQuery(defaultSettings.nav).eq(newActiveIndex).addClass('slideNavActive slideNavActiveUnclickable');
				}				
			}, $this.delay);
			
			setTimeout(function()
			{									
				//Hide the NEW first slide. We do this so the slide will be able to execute
				//its entrance animation. Without the slide hidden, it would just
				//appear without animation
				$this.firstSlide = jQuery($this.slides[0]).hide();
					
				//Rearrange all the slides.
				jQuery($this.slides).fakeFloat();
					
				//Erase the display:none that may be on the previously animated slide
				jQuery($this.slides).slice(1).show(0);					
				
				//Enter the new slide
				$this.doTransition($this.firstSlide, $this.entrance);
					
				setTimeout(function()
				{
					//Increment the number of slideshows animating.
					global.numAnimating++;		
					
					if(global.numAnimating == global.numSlideShows)
					{
						//If the number of slideshows animating equals the number of slideshows total,
						//then the animation for all slideshows has finished. Reset the counter back to 0.
						global.animating = false;
						global.numAnimating = 0;				
						
						jQuery(defaultSettings.nav).removeClass('slideNavUnclickable slideNavActiveUnclickable');
					}
				},$this.entrance.speed);									
				
				//If displaySlide is used for navigational purposes, a transition pause is unnecessary. 
				//However, a negative transition value implies an overlap effect, so that needs to be included during navigation animations.
			}, ($this.delay + $this.entrance.speed + ((global.navSelected == false || (global.navSelected == true && $this.transition < 0)) ? $this.transition : 0)));
			   
		}
	};	

	//------------------------------Class slideshow prototype: animate------------------------------//
	//Description: Cycles through each slide, displaying one after the other
	//PARAMETERS:
	//newRelativeIndex: The index of the slide that will enter in relation to its position in the
    //                  jQuery object. (This index is dynamic due to how jQuery treats a jQuery
	//                  object that has been rearranged.)
	//newActiveIndex:   The index of the slide that will enter in relation to its absolute position
	//                  in the sequence of slides.
	//Postcondition:    The global.activeIndex variable is adjusted. Visually, a new slide appears if
	//                  the proper conditions are met. 
	//----------------------------------------------------------------------------------------------//	
	slideshow.prototype.animate = function()
	{	
		//Establish scope
		var $this = this;
				
			//For as many slides that exist, and for as many cycles specified
			for(var i = 1; i < ($this.slides.length * $this.cycles); i++)
			{				
					setTimeout(function()
					{
						//If a navigational element hasn't been selected.
						if(global.navSelected == false)
						{						
							//Only apply changes to the active and nav indexes for one slide, and let the 
							//other slides use the same indexes.
							if($this == slideshowArray.main)
							{
								/*Example: 5 slides in slideshow array.
								Since arrays start at 0, max index of slideshow array = 4
								=> Can only increment when index < 4 (or we exceed the array bounds)
								=> Can only increment when index < (5 - 1)
								=> Can only increment when index < (number of slides - 1)
								
								If index is not less than (number of slides - 1), reset the index back to 0. 
								*/								
								(global.activeIndex < global.numSlides - 1) ? global.activeIndex++ : global.activeIndex = 0; 
								
								//Find the relative index of the slide in the jQuery object.
								global.relativeIndex = jQuery(global.slidesTemplate[global.activeIndex]).getIndexOf(slideshowArray["main"].slides);
							}								
							$this.displaySlide(global.relativeIndex, global.activeIndex);		
						}
					}, (($this.duration + $this.entrance.speed + $this.exit.speed + $this.transition) * i));				
			}
	};

	//-------------------------Class slideshow prototype: doTransition-------------------------//
	//Description: Exits the active slide
	//PARAMETERS:
	//     slide: The slide that will be animating.
	//transition: An object that holds the following properties:
	//		animation: A string that determines the animation option.
	//		    speed: How fast the animation executes
	//         easing: Easing option
	//-----------------------------------------------------------------------------------------//		
	slideshow.prototype.doTransition = function(slide, transition)
	{		
		//Copy to local variables for convenience. 
	    var animation = transition.animation.toLowerCase();
	     var distance = jQuery(slide).width();
		    var speed = transition.speed
 		     var ease = transition.easing;		
		
		switch(animation)
		{
			//Entrance animations
			case "fromright":			
				jQuery(slide).animate({'left': '+=' + distance + 'px', 'opacity': 'show'}, 0)
							 .animate({'left':'-=' + distance + 'px'}, {duration: speed, easing: ease});
							 break;			
			
			case "fromleft":			
				jQuery(slide).animate({'left': '-=' + distance + 'px', 'opacity': 'show'}, 0)
							 .animate({'left':'+=' + distance + 'px'}, {duration: speed, easing: ease});
							 break;			
			
			case "frombottom":			
				jQuery(slide).animate({'top': '+=' + distance + 'px', 'opacity': 'show'}, 0)
							 .animate({'top':'-=' + distance + 'px'}, {duration: speed, easing: ease});
							 break;			
			
			case "fromtop":			
				jQuery(slide).animate({'top': '-=' + distance + 'px', 'opacity': 'show'}, 0)
							 .animate({'top':'+=' + distance + 'px'}, {duration: speed, easing: ease});
							 break;
			
			case "fadein":
				jQuery(slide).fadeIn(speed);
							 break;
		
			//Exit animations
			case "toleft":			
				jQuery(slide).animate({'left': '-=' + distance + 'px'}, {duration: speed, easing: ease})
						     .animate({'opacity':'hide', 'left':'+=' + distance + 'px'}, 0);
							 break;			
			
			case "toright":			
				jQuery(slide).animate({'left': '+=' + distance + 'px'}, {duration: speed, easing: ease})
							 .animate({'opacity':'hide', 'left':'-=' + distance + 'px'}, 0);
							 break;
						
			case "totop":			
				jQuery(slide).animate({'top': '-=' + distance + 'px'}, {duration: speed, easing: ease})
							 .animate({'opacity':'hide', 'top':'+=' + distance + 'px'}, 0);
							 break;			
			
			case "tobottom":			
				jQuery(slide).animate({'top': '+=' + distance + 'px'}, {duration: speed, easing: ease})
							 .animate({'opacity':'hide', 'top':'-=' + distance + 'px'}, 0);
							 break;			
			default:
				jQuery(slide).fadeOut(speed);		
		}
	};		
				
	//---------------------------------------------------------------------------------//
	//----------------------------Begin Slave Array Parsing----------------------------//
	//---------------------------------------------------------------------------------//		
	
	//If a slave slideshow was specified
	if(defaultSettings.slaves.length)
	{					
		//For each slave declared
		for(i=0; i<defaultSettings.slaves.length; i++)
		{	
			//Create a new slideshow for this slave
			slideshowArray["slave" + i] = new slideshow(defaultSettings.slaves[i]);
		}	
	}
	
	//---------------------------------------------------------------------------------//
	//-----------------------------Begin Slide Navigations-----------------------------//
	//---------------------------------------------------------------------------------//		
	
	//If slideshow navigation was specified.
	if(isset(defaultSettings.nav) || isset(defaultSettings.left))
	{			
		
		jQuery(defaultSettings.nav).click(function()
		{
			//If the slideshow is not animating and current displaySlide is finished
			if(global.animating == false && global.numAnimating == 0)
			{
				//Indicates that a navigational element has beens selected.
				//The slideshow will stop its cycle.
				global.navSelected = true;
				
				//Find the relative index of the slide in the jQuery object.
				global.relativeIndex = jQuery(global.slidesTemplate[jQuery(this).index()]).getIndexOf(slideshowArray["main"].slides);

				//For each slideshow in the slideshow array, display the slide
				for (var i in slideshowArray)
				{
					slideshowArray[i].displaySlide(global.relativeIndex, jQuery(this).index());					
				}
			}
		});
	}
	
	//---------------------------------------------------------------------------------//
	//----------------------------Left and Right Slide Shift---------------------------//
	//---------------------------------------------------------------------------------//		
	
	if(isset(defaultSettings.left) && isset(defaultSettings.right))
	{
		//If left or right scroller is clicked
		defaultSettings.right.add(defaultSettings.left).click(function()
		{
			//If the slideshow is not animating and current displaySlide is finished
			if(global.animating == false && global.numAnimating == 0)
			{				
				//Indicates that a navigational element has beens selected.
				//The slideshow will stop its cycle.
				global.navSelected = true;			
			
				//If left scroller clicked
				if(jQuery(this).equalTo(defaultSettings.left))
				{					
						//If moving left, decrement the activeIndex unless the activeIndex is zero. At that point, reset
						//The active index to the index of the last slide (global.numSlides-1)
						global.activeIndex > 0? global.activeIndex--: global.activeIndex = global.numSlides-1;
	
				}
				else
				{			
						//If moving right, increment the activeIndex unless the activeIndex is the last index. At that point, reset
						//The active index to the index of the first slide (0).
						global.activeIndex < global.numSlides-1? global.activeIndex++: global.activeIndex = 0;
				}
				
				
				global.relativeIndex = jQuery(global.slidesTemplate[global.activeIndex]).getIndexOf(slideshowArray["main"].slides);
			

				//For each slideshow in the slideshow array, display the slide
				for (var i in slideshowArray)
				{
					slideshowArray[i].displaySlide(global.relativeIndex, global.activeIndex);					
				}
			}
		});
	}
	
	//For each slideshow in the slideshowArray, run the slideshow Animation
	//And count how many slideshows there are
	for (var i in slideshowArray)
	{
		jQuery(slideshowArray[i].slides).fakeFloat();
		slideshowArray[i].animate();
	}			
};

/******************plugin arrayShift**************
Description: Takes an index of an array, places it at
another index, and shifts the rest of the array into place

PARAMETERS:
index;       //The index being moved
newLocation; //The new index of index

Postcondition: jQuery object has been altered ****/

jQuery.fn.arrayShift = function(index, newLocation, callback)
{
	//Copy all matched elements of the jQuery object to an array
	var tempArr = jQuery.makeArray(jQuery(this));	
	
	//Loop through arguments and convert strings into integers.
	for(var i=0; i<arguments.length; i++)
	{
		if(isNaN(arguments[i]))
		{
			if(arguments[i] == "first")
			{
				//The first index of the array
				arguments[i] = 0;
			}
			else if (arguments[i] == "last")
			{
				//The last index of the array
				arguments[i] = tempArr.length-1;
			}
		}
		else
		{
			arguments[i] = parseInt(arguments[i], 10);
		}
	}
	
	
	//Create a temporary copy of array[index]
	var tempVal = tempArr[index];
	
	if(index > newLocation)
	{
		
		//For every index starting from [index] until (but not including)
		//the index newLocation, Copy the value of the previous index to the 
		//current index
		for(i=index; i>newLocation; i--)
		{
			tempArr[i] = tempArr[i-1];
		}
		
		//Copy the stored value to the newLocation index
		tempArr[newLocation] = tempVal;
		
	}
	else if(index < newLocation)
	{
		//For every index starting from [index] up until (but not including)
		//[newLocation], copy the value of the next index into the current index.
		for(i=index; i<newLocation; i++)
		{
			tempArr[i] = tempArr[i+1];
		}
		
		//Copy the stored value to the newLocation index
		tempArr[newLocation] = tempVal;		
	}
	
	if(typeof callback == 'function')
	{
		callback.call(this);
	}
	
	return jQuery(tempArr);
};

jQuery.fn.atIndex = function(index)
{
	var tempArr = jQuery.makeArray(jQuery(this));	
	return tempArr[index];
};

jQuery.fn.getIndexOf = function(array)
{
	//Assume value isn't found
	var index = false;
	
	//Define scope
	var value = jQuery(this);
	
	//Initiate index counter
	var i=0;
	jQuery(array).each(function()
	{
		if(jQuery(this).equalTo(jQuery(value)))
		{
			index = i;
		}
		
		//Increment index counter
		i++;
	});
	
	return index;
};

jQuery.fn.equalTo = function(object)
{
	isEqual = !jQuery(this).not( jQuery(object) ).length;
	return isEqual;
};

jQuery.fn.fakeFloat = function(options, callback)
{
	
	var defaults = {
	direction: "left",
	margin: 0,
	offset: 0,
	speed: 0
	},
	settings = jQuery.extend(defaults, jQuery.fn.fakeFloat.defaults, options);  
		
	//Initialize counter
	var i=0;
	
	//Initialize element width
	var elemWidth = 0;
	
	jQuery(this).each(function()
	{
		elemWidth = jQuery(this).width();
		if(settings.direction == "left")
		{
			jQuery(this).animate({"left": ((settings.margin) + elemWidth)*i + (settings.offset) + 'px'}, settings.speed);
		}
		else
		{
				jQuery(this).animate({"right": ((settings.margin) + elemWidth)*i + (settings.offset) + 'px'}, settings.speed);
		}
		i++;
	});
	
	if(typeof callback == 'function')
	{
		setTimeout(function(){callback.call(this);}, settings.speed);
	}
	
	return this;
	
};



jQuery.fn.frontpush = function(array)
{
	//Number of elements in the jQuery object
	var numElements = jQuery(this).length;
	
	//Convert matched elements to an array for processing.
	var thisArray = jQuery.makeArray(jQuery(this));
	
	//For the number of elements in the jQuery object
	for(var i=0; i<numElements; i++)
	{
		//Prime an array at the end
		array.push("");
	}
		
	//For each original element of the array, go backwards and copy	
	for(i=(array.length); i>numElements; i--)
	{	
		var j=i-1; //Account for array.length and array[index] discrepancy
		array[j] = array[j-numElements];
	}
	
	//Plug in the new values into the front of the array
	for(i=0; i<numElements; i++)
	{	
		array[i] = thisArray[i];
	}
	
	return jQuery(array);
};

})(jQuery); //End document