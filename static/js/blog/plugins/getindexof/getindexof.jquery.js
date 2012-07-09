(function(jQuery) {

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

//Tests if two jQuery objects are equal to eachother.
jQuery.fn.equalTo = function(object)
{
	isEqual = !jQuery(this).not( jQuery(object) ).length
	return isEqual;
};

})(jQuery); //End document