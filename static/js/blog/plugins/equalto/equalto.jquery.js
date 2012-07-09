(function(jQuery) {

jQuery.fn.equalTo = function(object)
{
	isEqual = !jQuery(this).not( jQuery(object) ).length;
	return isEqual;
};

})(jQuery); //End document