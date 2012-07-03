//------------------------------------------------------------
// File: work_init.js
// Purpose: Initiate the bubble scroller and form for work page
// Author: Joseph McCullough (@joe_query) 
// Last Updated: Jan 02, 2011
//------------------------------------------------------------
$(window).load(function()
{
    //------------------------Variable Declarations---------------------------//
    //     opacity: The opacity "Non-Active" elements will have
    //    fadeTime: How long new active items take to fade in
    //     current: Stores the JQ object of the item at the current index
    //    featured: Featured work divs
    //      bubble: The scrolling text bubble
    //        copy: The HTML associated with each featured work class
    //  bubbleText: Where the text for each featured work class will be displayed
    //   firstCopy: Cache first text since it's being replaced
    //   lastIndex: Snag the last of the copy class for convenience
    //    lastCopy: Cache the last text since it's being replaced
    //        sent: Indicates if the form on the page has been sent
    //  formActive: Flag if the form is active
    //videoTrigger: Anchors that trigger the video
    //videoPlaying: Flag if the youtube video is up
    //   videoCopy: Message that displays when youtube video is up
    //       embed: Embed object code for the youtube video
    //------------------------------------------------------------------------//
    
    //--------------------Customize These-------------------------//
    var opacity = 0.50,
    fadeTime = 300,
    featured = $("#work .featured_work img"),
    bubble = $("#work #sub_page_intro"),
    copy = $("#work .copy"),
    
    //Calculations
    bubbleText = $(copy).eq(0),
    firstCopy = $(bubbleText).html(),
    lastIndex = $(copy).length-1,
    lastCopy = $(copy).eq(lastIndex).html(),
    
    //Boolean blags and empty initializations
    current,
    embed = "";
        
    
    //------------------------------------------------------------//
    //                    Class instantiations                    //
    //------------------------------------------------------------//
    
    //Make the bubble scroll down with page
    var scroller = new Scroller(bubble,
    {
        start: 0,
        end: 500 * featured.size() - 170,
        interval: 540,
        distance: 610,
        res: 800
    });

    //Apply opacity to all but first item on window load.
    $(featured).slice(1).css('opacity', opacity);    
    
    //On index change
    scroller.onNewIndex(function(distance, index)
    {
        //Fade current element to full opacity. Other elements to specified opacity
        current = $(featured).eq(index).fadeTo(fadeTime, 1);
        $(featured).not(current).fadeTo(0, opacity);
        
        //Move the bubble
        $(bubble)
        .stop(true)
        .animate({'top':distance}, {duration: 800, easing: 'easeOutBack'});
        
        //If first, add the cached first html.  
        if(index === 0)
        {
            $(bubbleText).html(firstCopy);
        }
        
        //Add the html associated with the index
        else
        {
            $(bubbleText).html( $(copy).eq(index).html() );
        }
    });
});
