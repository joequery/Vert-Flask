//------------------------------------------------------------
// File: blog.js
// Purpose: Handles events throughout blog pages
// Author: Joseph McCullough (@joe_query) 
// Last Updated: Jan 03, 2011
//------------------------------------------------------------
$(document).ready(function()
{
    var codeToggle = $(".codeToggle");
    var codeDisplay = $(".codeDisplay");
    var trigger = $(".codeToggle a.codeTrigger");

	$(trigger).click(function()
	{
		$(this).parent(codeToggle).children().not(this).slideToggle("fast");
        return false;
	});
});