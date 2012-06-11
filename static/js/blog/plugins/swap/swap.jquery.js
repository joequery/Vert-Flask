(function(jQuery) {

jQuery.fn.swap = function(index1, index2)
{
	//Copy all matched elements of the jQuery object to an array
	var tempArr = jQuery.makeArray(jQuery(this));
	
	//Copy the value of index1 to a temporary variable
	var tempValue = tempArr[index1];
	
	//Assign the value of index1 to the value of index2
	tempArr[index1] = tempArr[index2];
	
	//Assign the value of index2 to the value of index1 via the tempValue variable
	tempArr[index2] = tempValue;
	
	return jQuery(tempArr);
}

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