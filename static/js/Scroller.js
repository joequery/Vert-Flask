/************************************************************/
// Class Scroller
// Purpose: Create a fixed scroller
// Parameters:
//        id: The id of the object that will be scrolling
//     start: What distance from the top (in px) the effect starts
//       end: What distance from the top (in px) the effect ends
//  interval: What scroll distance triggers the callback
//  distance: How far the obj will move
//       res: The default resolution height
/************************************************************/

var gs = new GetSet();
function Scroller(id, options)
{
    //------------------------------------------------------------
    // Set default property values
    //------------------------------------------------------------
    
    //Screen height
    var resolution = screen.height;
        
    //Initialize default values
    var defaults = {
    obj: $(id),
    start: 0,
    end: 1000,
    interval: 400,
    distance: 400,
    res: 800
    },	settings = jQuery.extend(defaults,options);   
    
    //------------------------------------------------------------//
    //                      Callback Functions                    //
    //------------------------------------------------------------//
    var Callback = {};
    
    Callback.newIndex = function(){};  //When the index changes
    Callback.limbo = function(){};     //When scroller not in range
    Callback.scroll = function(){};    //On window scroll
    
    //Get setters for Callback functions
    gs.setters({scope: this, prefix: "on", obj: Callback}); 
    
    //Keep track of how far the user has scrolled relative to the interval
    var scroll = 0;
    var oldScroll = 0;
    var newPos = 0;
    var oldPos = 0;
    var index = 0;
    var oldIndex = 0;
    var tempIndex = 0;
    var oldInterval = settings.interval;
    
    //Adjust interval based on specified resolution
    if(settings.res < resolution)
    {
        settings.interval *= 1 - .4 * Math.abs((settings.res - resolution) / resolution);
    }
    
    //=========================================================//
    //Private getIndex
    //Purpose: Retrieve the current index
    //Postcondition: index is altered
    //=========================================================//
    var getIndex = function()
    {
        var tempIndex; //Possible new index.
        
        //Check if scroll is beyond start and end bounds
        if(scroll > settings.start && scroll < settings.end)
        {        
            if(scrollingDown())
            {
                //Possible new index
                tempIndex = Math.floor(scroll/settings.interval);
                
                //Make sure the index can only get bigger as we scroll down
                index = (tempIndex > index) ? tempIndex : index;
            }
            else if(scrollingUp())
            {
                //Possible new index
                tempIndex = Math.floor( (scroll+.75*settings.interval) / settings.interval );
                
                //Make sure the index can only get smaller as we scroll up
                index = (tempIndex < index) ? tempIndex : index;       
            }
        }
        else if(scroll <= settings.start)
        {
            index = 0;
        }
        else
        {
            index = Math.floor(settings.end/oldInterval);
        }
    };
    
    //=========================================================//
    //Private getNewPos
    //Purpose: Get the new position of the scroller
    //Postcondition: newPos is altered
    //=========================================================//
    var getNewPos = function()
    {
        //If newPos is beyond the bounds, set them at the bounds
        newPos = index * settings.distance;
        
        if(newPos < settings.start)
        {
            newPos = settings.start
        }
        else if(newPos > settings.end)
        {
            newPos = settings.end;
        }        
    };
    
    //=========================================================//
    //Private Method scrollingDown
    //Purpose: Returns true if the user is scrolling down
    //=========================================================//
    var scrollingDown = function()
    {
        //If the scroll position from top is larger now, then
        //the user has scrolled down
        if(scroll > oldScroll)
        {
            return true;
        }
        else
        {
            return false;
        }
    };
    
    //=========================================================//
    //Private Method scrollingUp
    //Purpose: Returns true if the user is scrolling Up
    //=========================================================//
    var scrollingUp = function()
    {
        //If the scroll position from top is less now, then
        //the user has scrolled up
        if(scroll < oldScroll)
        {
            return true;
        }
        else
        {
            return false;
        }
    };    
           
    //On browser scroll
    $(window).scroll(function()
    {    
        //Store scroll to variable for convenience
        scroll = $(this).scrollTop();
        
        //Calculate new index and position
        getIndex();
        getNewPos();       
        
        //Do scroll callback regardless of what happens
        Callback.scroll(newPos, index);        
        
        //If indexes are different, do newIndex callback. If not,
        //do Limbo callback
        if(index !== oldIndex)
        {
            Callback.newIndex(newPos, index);
        }
        else
        {
            Callback.limbo(newPos, index);
        }
               
        //Store values for future comparison
        oldScroll = scroll;
        oldIndex = index;
    
    });
    
}
