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
    featured = $(".featured_work img"),
    bubble = $("#sub_page_intro"),
    copy = $(".copy"),
    videoTrigger = $(".videoTrigger"),
    videoCopy = '<div id="videoCopy"><h2>Things We Will Never Do:</h2><ol><li>Give you up</li><li>Let you down</li><li>Run around / desert you</li><li>Make you cry</li><li>Say goodbye</li><li>Tell a lie / hurt you</li></ol><p><a class="videoTrigger" style="cursor: pointer;">Stop the Madness</a></div>',
    videoURL = "http://www.youtube.com/watch?v=oHg5SJYRHA0",
    //------------------------------------------------------------//
    
    //Calculations
    bubbleText = $(copy).eq(0),
    firstCopy = $(bubbleText).html(),
    lastIndex = $(copy).length-1,
    lastCopy = $(copy).eq(lastIndex).html(),
    
    //Boolean blags and empty initializations
    current,
    sent = false,
    formActive = false,    
    videoPlaying = false,
    embed = "";
    
    //Function for getting the proper video URL format for embedded playing
    var getVideoURL = function()
    {
        //Extract the video ID and build an autoplayer
        var re = /watch\?v=([a-zA-Z0-9]+)&?/;
        videoURL = "http://www.youtube.com/v/" + re.exec(videoURL)[1] +
                   "?rel=0&amp;autoplay=1&amp;showsearch=0&amp;showinfo=0";
                   
        //Construct object to embed video
         embed =
         '<object id="thevideo" type="application/x-shockwave-flash" '+
         'style="width:630px; height:421px; position: absolute; left: 0px; top: 0px; z-index: 0;" '+
         'data="' + videoURL + '" wmode="opaque"><param name="movie" '+
         'value="' + videoURL + '" /><param name="wmode" value="opaque" /></object>';
    };
    getVideoURL();
    
   
        
    
    //------------------------------------------------------------//
    //                    Class instantiations                    //
    //------------------------------------------------------------//
    
    //Make the bubble scroll down with page
    var scroller = new Scroller(bubble,
    {
        start: 0,
        end: 500 * featured.size(),
        interval: 540,
        distance: 600,
        res: 800
    });
    
    //Rickroll indicator
    var rick = new POST("lib/php/rickroll.php", function(){});
	rick.set("rickroll","true");
    var rickOnce = false;
    
	var form = new Form("#mail");

	form.is({
		 name: "name",
		email: "email",
		phone: "phone"
	});

	form.hasNone({
		"message": "html, bbcode, mailstrings, int"
	});
    
	//Check for invalid on focusout
	$(form.inputs()).focusout(function(){
		//If empty and required or invalid, add invalid class
		if( form.invalid($(this)) || (!$(this).val() && $(this).hasClass(form.requiredClass())) ){
			$(this).addClass(form.invalidClass());
		}
		else{
			$(this).removeClass(form.invalidClass());
		}
	});
		
	//If is currently invalid, check for correction each keystroke
	$(form.inputs()).keyup(function(){
		if( $(this).hasClass(form.invalidClass()) ){	
			if(form.valid($(this))){
				$(this).removeClass(form.invalidClass());
			}
		}
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
            $(form.inputs()).attr('disabled','true');
            
            //The form is inactive
            formActive = false;
        }
        
        //If last index, which is for the contact form
        else if(index === lastIndex)
        {           
            //The form is active
            formActive = true;
            
            //If the video is up
            if(videoPlaying)
            {
                $(bubbleText).html(videoCopy);
                $(form.inputs()).attr('disabled','true');
            }
            
            else
            {
                $(form.inputs()).removeAttr('disabled');
                
                //add focus to first empty field
                var focus = false; 
                $(form.inputs()).each(function()
                {
                    if( $(this).val() === '' && focus === false)
                    {
                        $(this).focus();
                        focus = true;
                    }
                });
                
                //If form has already been sent, display an alternate message
                if(!sent)
                {
                    $(bubbleText).html( $(copy).eq(index).html() );
                }
                else
                {
                    var silly =
                    "<h2>You're quite the Chatterbox!</h2>" +
                    "<p>But we don't mind. Have something else to say? " +
                    "Leave us another message and we'll get back with you.</p>";
                    $(bubbleText).html(silly);
                }
            }           
        }
        //Add the html associated with the index
        else
        {
            $(bubbleText).html( $(copy).eq(index).html() );
            $(form.inputs()).attr('disabled','true');
            
            //The form is inactive
            formActive = false;
        }
        
    });
            
    //-----------------Form Variable Declarations-------------------//
    //     invalid: Represents invalid objects
    //        name: Name attribute of invalid object
    //       label: Label corresponding to invalid object
    //     example: Example for regex pattern
    //    required: Flag if the field is required
    //    response: response string that will be sent back to client
    // description: Field description pulled from Regex class
    //--------------------------------------------------------------//
    var invalid, name, label, example, response, required, description;        
    
    //When the  form fails to validate on client side
    form.onClientInvalid(function()
    {            
        //Initialize response
        response = "<h2>Check Yourself!</h2>";
        
        //Clear previous validation attempts
        $(bubbleText).html(response);
        
        //Get invalid items and add the invalid class to them
        invalid = $(form.invalid()).addClass(form.invalidClass());
                    
        //Append an example 
        $(invalid).each(function()
        {
            name = $(this).attr('name');
            label = $("label[for='" + name + "']").text();
            example = exampleArr[name];
            invclass = "invalid" + name;
            required = ($(this).hasClass(form.requiredClass())) ? "<span class='required'>*</span> " : "";
            response += "<p class='" + invclass + "'>" + required + label + example + "</p>";  
        });
        response += "<p class='required'><i>* Required field</i></p>";
        
        $(bubbleText).html(response);         
    });
    
    //When the form fails to validate on server side
    form.onServerInvalid(function()
    {
        response =
        "<h2>Check Yourself!</h2>" + 
        "<p>Our robots on the server think there's something wrong with your data. " +
        "Would you mind checking it for them?</p>" +
        "<p>[o_0]</p>" +
        "Thanks, <br /> -- The Robots." +
        $(bubbleText).html(response);
    });
    
    //When there's an error sending the form
    form.onError(function(e)
    {
        response = "<h2>Server Error</h2>" + 
        "<p>Please try again.</p>";
        $(bubbleText).html(response);
    });
    
    //When the form is sending and we're waiting for server response
    form.onSubmit(function()
    {
        $(bubbleText).html("<h2>Sending...</h2>");
    });
    
    //When the form is sent and mailed successfully
    form.onSuccess(function()
    {
        response = "<h2>Message Sent!</h2>" + 
            "<p>Congrats! You're one step closer to working with the most " +
            "kick-ass web design company in Tyler. Excited? So are we!</p>" +
            "<p>You'll be hearing from us soon. In the meantime, " +
            "check out our <a href='http://www.vertstudios.com/blog/client-resources/'>client resources</a> " +
            "to learn more about our industry and our process.</p>";
        
        //Delay a little bit so the sending animation doesn't look so lame.
        setTimeout(function(){
            $(bubbleText).html(response);
            form.clear();
            sent = true;
        }, 500);
    });

   function toTitleCase(str){
		     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	 }

		exampleArr = {"name": "John Smith", "phone": "903 555-555",
								  "email": "myemail@gmail.com", "message": "No HTML or BB Code"}

    //When a form gives focus, display an example.
    $(form.inputs()).each(function()
    {
        $(this).bind('focusin keypress', function()
        {                
            if(formActive)
            {
                name = $(this).attr('name');
                label = $("label[for="+name+"]").text();
                example = exampleArr[name];
                description = toTitleCase(name);
                required = ($(this).hasClass(form.requiredClass())) ? "<span class='required'>*</span> " : "";
                response =
                "<h2>Your " + description + "</h2>" +
                "<p>To ensure we get the most accurate information, please format your " +
                description.toLowerCase() + " like so:</p><p>" + required + label + example + "</p>";
                
                if(required !== "")
                {
                    response += "<p><span class='required'>* Required field</span></p>";
                }
                
                $(bubbleText).html(response);
            }
        });
    });
        
    //------------------------------------------------------------//
    //                        Video here!!!                       //
    //------------------------------------------------------------//
    $(videoTrigger).live('click', function()
    {
        //Toggle Video
        if(videoPlaying)
        {
            $("#thevideo").remove();
            $("#videoCopy").remove();
            $(form.inputs()).removeAttr('disabled');
            $(bubbleText).html(lastCopy);
            videoPlaying = false;
        }
        else
        {
            $(form.id()).append(embed);
            $(bubbleText).html(videoCopy);
            $(form.inputs()).attr('disabled','true');
            videoPlaying = true;
            if(!rickOnce)
            {
                rick.getResponse();
                rickOnce = true;
            }
        }
        return false;        
    });        
});
