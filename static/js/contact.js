//------------------------------------------------------------
// File: work_init.js
// Purpose: Initiate the bubble scroller and form for work page
// Author: Joseph McCullough (@joe_query) 
// Last Updated: Aug 8, 2011
//------------------------------------------------------------
$(window).load(function()
{
	var frames = $(".frame");
	var bubbleText = $("#sub_page_intro .copy");
	//Show now to avoid initial jumble

	frames.show();
	var next = frames.children(".next");
	var prev = frames.children(".prev");

	var checks = $(":checkbox");
	var currentPriceDisplay = $("#current_price");
	var currentPrice = currentPriceDisplay.text();



	//==============================================================//
	//                       Form area                              //
	//==============================================================//

	var form = new Form("#mail");

	form.is({
		 name: "name",
		email: "email",
		phone: "phone"
	});

	form.hasNone({
		"message": "html, bbcode, mailstrings"
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
        response = "<h2>Check Yourself!</h2>" + 
        "<p>Sorry, we're having issues processing your data. Please verify your " + 
        "information and try again.";
        $(bubbleText).html(response);
    });
    
    //When there's an error sending the form
    form.onError(function(e)
    {
        response = "<h2>Server Error</h2>" + 
        "<p>We're sorry, there was an issue sending your message. " +
        "Please try again.</p>";
        $(bubbleText).html(response);
    });
    
    //When the form is sending and we're waiting for server response
    form.onSubmit(function()
    {
			response = "<h2>Sending...</h2>";
			$(bubbleText).html(response);
    });
    
    //When the form is sent and mailed successfully
    form.onSuccess(function()
    {
        response = "<h2>Message Sent!</h2>" + 
            "<p>Thanks! Your message has been sent. " + 
            "We'll be in contact soon.</p>";
        
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

		exampleArr = {"name": "John Smith", "phone": "903 555-5555",
								  "email": "myemail@gmail.com", "message": "No HTML or BB Code"}

    //When a form gives focus, display an example.
    $(form.inputs()).each(function()
    {
        $(this).bind('focusin keypress', function()
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
        });
    });

});
