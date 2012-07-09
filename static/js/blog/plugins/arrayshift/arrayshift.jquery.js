(function(jQuery) {

/******************plugin arrayShift**************
Description: Takes an index of an array, places it at
another index, and shifts the rest of the array into place

PARAMETERS:
index;       //The index being moved
newLocation; //The new index of index

Postcondition: jQuery object has been altered ****/

jQuery.fn.arrayShift = function(index, newLocation)
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
	
	return jQuery(tempArr);
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
	isEqual = !jQuery(this).not( jQuery(object) ).length
	return isEqual;
};

jQuery.fn.selectIndex = function(index)
{
	
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


})(jQuery); //End document