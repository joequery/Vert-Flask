//-----------------------------------------------------------------------------
// Vert Studios Function Library
// Date: December 22, 2010
// File: vertlib.min.js
// Author: Joseph McCullough 
//		   @Joe_Query
//         http://www.vertstudios.com
// Purpose: Contains all the small plugins/functions used throughout our
//          larger plugins.
// Feel free to use this library for commercial purposes!
// WARNING: Do NOT obfuscate defined global variables
//-----------------------------------------------------------------------------

//Let the browser know that this has been loaded!
window.vertstudios = true;

//-------------------------------Function isset-------------------------------//
// Purpose: Determines if a variable has been set/initialized
// PARAMETERS:
// 		Var: A variable of any type.
// Postcondition: Returns boolean true if the variable is set. False otherwise.
//----------------------------------------------------------------------------//
function isset(Var)
{
	return !(typeof Var == 'undefined' || Var === null  || Var === "");
}

/************************************************************/
//Class Regex
//Purpose: Easily evaluate common Regular Expression patterns
/************************************************************/
var Regex = {}; //Object instead of function for static effect

//Define regex patterns.
Regex.pattern = function(){
    return {
    int: "\\d+",
    float: "\\d*\\.\\d+",
    mailstrings: "(content\\-type|mime\\-version|multipart\\/mixed|Content\\-Transfer\\-Encoding|bcc|cc|to|headers):",
    email: "[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,4}",
    html: "<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>.*?<\\/\\1>",
    url: "([-a-z0-9+.]*(:|:\\/\\/))?([\\w_-]+\\.)+[a-zA-Z]{2,}[-%\\$_.+!*'(),;\\/?:@=&\\w#]*",
    zip: "^((\\d{5}-\\d{4})|(\\d{5})|([A-Z]\\d[A-Z]\\s\\d[A-Z]\\d))",
    alpha: "[a-zA-Z]+",
    num: "\\d+",
    bbcode: "\\[([a-zA-Z][a-zA-Z0-9]*)\\b[^\\]]*\\].*?\\[\\/\\1\\]",
    phone: "(1\\s*[-\\/\\.]?)?(\\((\\d{3})\\)|(\\d{3}))\\s*[-\\/\\.]?\\s*(\\d{3})\\s*[-\\/\\.]?\\s*(\\d{4})\\s*(([xX]|[eE][xX][tT])[-.:]?\\s*(\\d+))*",
    usaddress: "\\d+\\s[-\\w.,\\s#:]+",
    fullname: "[a-zA-Z]+\\s+([-a-zA-Z.'\\s]|[0-9](nd|rd|th))+",
    name: "[-a-zA-Z0-9.'\\s]+",
    lastname: "([-a-zA-Z.'\\s]|[0-9](nd|rd|th))+",
	alphanum: "[a-zA-Z0-9]+"
    };
};

//Define default mods
Regex.mods = "";

//Transforms a comma delimited string into an array
Regex.getArray = function(str){
    //Get rid of blank spaces
    var str = str.replace(" ", "");
    
    return str.split(",");		
};
        
//Get the type from a string that may contain integers, or may not be
//lowercase.
Regex.getType = function(str){
    return str.toLowerCase().replace(/[^a-z]+/,"");    
};

//Returns the match result for an exact match
Regex.is = function(type, val, mods){
	//Check for mods
	mods = mods || Regex.mods

    //Make sure the type is formatted properly
    var pattern = Regex.pattern()[Regex.getType(type)];
    
    //Create regular expression object
    var re = new RegExp("^" + pattern + "$", mods);
    
    return re.test(val);
        
};

    //Returns the logical negation of Regex.is
    Regex.isNot = function(type,val, mods){
		//Check for mods
		mods = mods || Regex.mods

        return !Regex.is(type,val, mods);
    };

//Returns the match result for a match contained anywhere in the string
Regex.has = function(type, val, mods){
	//Check for mods
	mods = mods || Regex.mods

    //Make sure the type is formatted properly
    var pattern = Regex.pattern()[Regex.getType(type)];
    
    //Create regular expression object
    var re = new RegExp(pattern, mods);
    
    return re.test(val);        
};

    //Returns the logical negation of Regex.has
    Regex.hasNot = function(type,val, mods){
		//Check for mods
		mods = mods || Regex.mods

        return !Regex.has(type,val, mods);
    };

//Returns the match result for match options contained anywhere in the string
Regex.hasAny = function(types, val, mods){
	
	//Check for mods
	mods = mods || Regex.mods
	
    //Parse the string passed in for types
    var types = Regex.getArray(types);
    
    //Assume none are found
    var flag = false; 
    
    for(var i=0; i<types.length; i++){		
		//Make sure the type is formatted properly
		var type = Regex.getType(types[i]);
		
		if(Regex.has(type,val, mods)){
				flag = true;
		}		
    }
    
    return flag;
};

    //Returns the logical negation of Regex.hasAny
    Regex.hasNone = function(types, val, mods){
        return !Regex.hasAny(types,val, mods);
    };

Regex.nosubstr = function(flagArr, val){
	var flags = Regex.getArray(flagArr);
	
	// Flag: If none of the substrings are in the value.
	var nosubstr = true;

	for(var i=0; i<flags.length; i++){
		if(val.toLowerCase().search(flags[i].toLowerCase()) !== -1){
			nosubstr = false;
			break;
		}
	}

	return nosubstr;
};

//Export to node for local testing
if (typeof(window) === "undefined"){
	exports.Regex = Regex;
}


/************************************************************/
//Class this
//Purpose: Creates dynamic getters and setters
/************************************************************/

function GetSet(){

//=========================================================//
//Public Method override
//Purpose: Override default values through iteration
//Parameters:
//  obj: The object whose default values will be overridden
//Postcondition: options Object is altered
//=========================================================//
this.override = function(options, defaults)
{
    //Store this scope
    var $this = options;
    
    
    for (var i in defaults)
    {
        if(!($this[i]))
        {
            $this[i] = defaults[i];
        }        
    }
};

//=========================================================//
//Public Method gettters
//Purpose: Dynamically creates accessor methods(getters)
//Parameters: 
//  scope: The scope in which the accessor methods will be
//         applied
//  prefix: Goes before the property. i.e. (get)Name
//  camel: whether to induce camel case
//  obj: Accessors
//Postcondition: scope has been altered to include
//accessor methods
//=========================================================//
this.getters = function(options)
{   
    //Over-ride default values
    var defaults =
    {
        prefix: "get",
        camel: true
    };
    
    //Override defaults values
    this.override(options, defaults);
    
    //If prefix is set to 'none', force blank. A blank string as a parameter
    //evaluates to null for some reason.
    options.prefix = (options.prefix === "none") ? "" : options.prefix;
    
    //Iterate through the properties of the object
    var str;
    for ( var i in options.obj )
    {
        //If camel case is enabled and no blank prefix
        if(options.camel && options.prefix !== "")
        {
            str = i.charAt(0).toUpperCase() + i.substr(1);
        }
        else
        {
            str = i;
        }
        (function(i)
        {
                // Dynamically create an accessor method
                options.scope[ options.prefix + str ] = function()
                {
                        return options.obj[i];
                };  
            })(i);
    }
};

//=========================================================//
//Public Method setters
//Purpose: Dynamically creates muator methods(setters)
//Parameters: 
//  scope: The scope in which the mutator methods will be
//         applied
//  prefix: Goes before the property. i.e. (set)Name
//  camel: whether to induce camel case
//  obj: The object that will have mutators
//Postcondition: scope has been altered to include mutator
//methods
//=========================================================//
this.setters = function(options)
{
    //Over-ride default values
    var defaults =
    {
        prefix: "set",
        camel: true
    };
    
    //Override defaults values
    this.override(options, defaults);
    
    //If prefix is set to 'none', force blank. A blank string as a parameter
    //evaluates to null for some reason.
    options.prefix = (options.prefix === "none") ? "" : options.prefix;    
    
    //Iterate through the properties of the object
    var str;
    for ( var i in options.obj )
    {
        //If camel case is enabled and no blank prefix
        if(options.camel && options.prefix !== "")
        {
            str = i.charAt(0).toUpperCase() + i.substr(1);
        }
        else
        {
            str = i;
        }
        (function(i)
        {
                // Dynamically create an accessor method
                options.scope[ options.prefix + str ] = function(val)
                {
                       options.obj[i] = val;
                };  
            })(i);
    }
};

}

/************************************************************/
//Class POST
//Purpose: Easily communicate with server via POST. Yes, 
//         I realize it's a wrapper for a wrapper, but I like it.
//Parameters:
//  url: The URL of the PHP file that will send a response
//  callback: The callback function.
/************************************************************/
function POST(url, callback)
{            
    //Initialize empty string for field/value pairs
    var str = "";
        
    //=========================================================//
    //Public Method set
    //Purpose: Set's the value of a field
    //Parameters: 
    //  field: The field corresponding to the value. (Name, phone)
    //  val: The new value associated with the field
    //Postcondition: str is altered
    //=========================================================//
    this.set = function(field, val)
    {        
        //Check to see if this field already exists.
		//Legal URL characters. See http://www.ietf.org/rfc/rfc1738.txt
        var re = new RegExp(field + "=[a-zA-Z0-9%+.!$()_+*'-]*");        
        var match = re.exec(str);
        
        //If this field is set, overwrite the value
        if(match)
        {            
            str = str.replace(match, field + "=" + val);
        }
        
        //If not, append the string with the value
        else
        {
            //Check if an & is at the end of str.
            //If not, add one if this isn't the beginning of the string.            
            if( (str.length > 0) && (str.substr(-1) != "&") )
            {
                str += "&";
            }
            
            str += (field + "=" + val);
        }
    };
    
    //=========================================================//
    //Public callback
    //Purpose: Set callback function
    //Parameters:
    //  func: The new callback function
    //Postcondition: callback is altered
    //=========================================================//
    this.callback = function(func)
    {
        callback = func;
    };
    
    //=========================================================//
    //Public serialize
    //Purpose: Serves as a wrapper for jQuery serialize. 
    //Parameters:
    //  form: jQuery selector of the form to be serialized.
    //Postcondition: str is appended with seralized form sring
    //=========================================================//
    this.serialize = function(form)
    {
        str += ($(form).serialize());
    };
    
    //=========================================================//
    //Method getResponse
    //Purpose: Get a string response from the server
    //Postcondition: Returns a string
    //=========================================================//
    this.getResponse = function()
    {                  
        //Make sure appropriate values are set
        if( isset(url) && isset(str) && isset(callback) )
        {
            jQuery.ajax(
            {
                type: "POST",
                url: url,
                data: str,
                success: function(msg)
                {
                    callback(msg);
                },
                error: function(msg)
                {
                    callback(msg);
                }
            });            
        }
    };
}


/************************************************************/
//Class Form
//Purpose: Form validation and AJAX
//Dependencies: POST, Regex
//Parameters:
// id: The jQuery Object representing the form
// URL: The URL of the server file
// invalidClass: The invalid class that will be added to form items
//               That do not pass form validation.
// requiredClass:The class associated with required input fields
/************************************************************/
function Form(id,options){
    //------------------------------------------------------------
    // Set default property values
    //------------------------------------------------------------
    
    //Store a relatively global scope for convenience
    var form = this;
    
    //Initialize default values
    var defaults = {
        id: $(id),
        URL: $(id).attr("action"),
        invalidClass: "invalid",
        requiredClass: "required",
    };	settings = jQuery.extend(defaults,options);
    
	//Prevent default form behavior
	$(settings.id).submit(function(e){
		e.preventDefault();
	});
	
	//HasAny and HasNone: Arrays of fields with multiple criteria
	//for validation
	settings.hasNone = {};
	settings.hasAny = {};

	//Array of fields for exact matches
	settings.is = {};

	//Input fields
	settings.inputs = {};

	//Maps the input names to their type (is, hasAny, hasNone)
	settings.types = {};

    //Get setters and methods for the settings object.
		var gs = new GetSet();
    gs.getters({obj: settings, scope: form, prefix: "none"});
    gs.setters({obj: settings, scope: form});
     
    //------------------------------------------------------------
    //Define variables/functions for adding an AJAX string
    //------------------------------------------------------------
    var addAJAX = false;
    
    //=========================================================//
    //Pulic Method addAjax
    //Purpose: Concatenates a serialized post variable AJAX
    //Postcondition: var addAjax is set to true
    //=========================================================//
    this.addAJAX = function(){
        addAJAX = true;
    };
    
    //Allow user to force the form to invalid
    var forceInvalid = false;
    
    //=========================================================//
    //Public forceInvalid
    //Purpose: Allows user to force the form into an invalid state
    //Postcondition: forceInvalid altered
    //=========================================================//
    this.forceInvalid = function(){
        forceInvalid = true;
    };

    //=========================================================//
    //Private map_input
    //Purpose: maps input and adds to settings object
    //=========================================================//
	var map_input = function(name, type){
		settings.types[name] = type;

		//If inputs is empty, just make it the current field jqobject
		if(jQuery.isEmptyObject(settings.inputs)){
			settings.inputs = $(":input[name='" +name+ "']");
		}
		else{
			settings.inputs = $(settings.inputs).add($(":input[name='" +name+ "']"));
		}
	};

    //=========================================================//
    //Public is
    //Purpose: Allows user to specify exact match rules for fields
    //=========================================================//
	this.is = function(obj){
		settings.is = obj;

		//Add each field key to the types object, of type "is"
		for (var i in obj){
			map_input(i, "is");
		}
	};

    //=========================================================//
    //Public hasAny
    //Purpose: Allows user to specify rules for fields - exact
	// match not required
    //=========================================================//
	this.hasAny = function(obj){
		settings.hasAny = obj;

		//Add each field key to the types object, of type "is"
		for (var i in obj){
			addHas(i,obj[i], settings.hasAny);
			map_input(i, "hasAny");
		}
	};

    //=========================================================//
    //Public hasNone
    //Purpose: Allows user to specify what patterns can NOT match
    //=========================================================//
	this.hasNone = function(obj){
		settings.hasNone = obj;

		//Add each field key to the types object, of type "is"
		for (var i in obj){
			addHas(i,obj[i], settings.hasNone);
			map_input(i, "hasNone");
		}
	};

	
    //=========================================================//
    //Private addHas
    //Purpose: defines template function for addHasAny/addHasNone 
    //Postcondition: obj altered
    //=========================================================//
	var addHas = function(field, arrstr, obj){
		/*
		 * Perpare the array string.
		 *	Step 1: Remove all spaces
		 *	Step 2: string => array, delimited by comma
		 *
		*/
		arrstr = arrstr.replace(/\s/g, "");
		obj[field] = arrstr;
	};

    //=========================================================//
    //Private addHasAny
    //Purpose: Allows user to call a field valid if one pattern
	//		   matches
    //Postcondition: settings.hasAny altered
    //=========================================================//
	var addHasAny = function(field, arrstr){
		addHas(field,arrstr, settings.hasAny);
		map_input(field, "hasAny");
	};

    //=========================================================//
    //Private addHasNone
    //Purpose: Allows user to call a field valid if one pattern
	//		   matches
    //Postcondition: settings.hasAny altered
    //=========================================================//
	var addHasNone = function(field, arrstr){
		addHas(field,arrstr, settings.hasNone);
		map_input(field, "hasNone");
	};
    
    //=========================================================//
    //Public Method valid
    //Purpose: Validate a single item
    //Parameters:
    //  obj: The jQuery object of the item being tested
    //Postcondition: InvalidClass added to input if invalid
    //=========================================================//
    form.valid = function(obj){

        //ZOMG POLYMORPHIC RECURSION
		//If no object is passed to the valid method, the user wants to validate
		//the whole form.
		if(typeof obj === 'undefined'){	    
            //Invalid counter
            var invalidCount = 0;	    
            
			var counter = 0;
            $(settings.inputs).each(function(){
               if(form.invalid($(this)))
               {
                    invalidCount++;
               }
            });
            
            //Returning the negation of invalidCount causes a valid form
            //to return true
            return !invalidCount;
        }

        else {   
			//If the user has requested the form be forced invalid, return false.
			if(forceInvalid)
			{
				forceInvalid = false;
				return false;
			}

			//Get form attributes
			var value = $(obj).val();       
			var name = $(obj).attr('name'); 

			var valid;
			
			//Boolean: If the input is required
			var isRequired = $(obj).hasClass(settings.requiredClass);

            //If blank and required, return false. If blank and not required,
            //return true
            if(!value)
            {
                if(isRequired)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            
            //------------------------------------------------------------
            // If the value is not blank, proceed with these processes
			// Here we actually validate based on types
            //------------------------------------------------------------

			//Get type of validation (is, hasAny, hasNone);
			var type = settings.types[name];

            //Handle specific validation criteria
            if(type === "hasAny")
            {
                valid = Regex.hasAny(settings.hasAny[name], value);
            }
            else if(type === "hasNone")
            {
                valid = Regex.hasNone(settings.hasNone[name], value);
            }
            else
            {
                valid = Regex.is(settings.is[name], value);
            }
            
            return valid;
        }
    };
    
    //Create a copy of .valid for lingistic convenience. Some people may
    //prefer to call form.validate(input) for a specific item since the
    //verb "validate" implies an action.
    form.validate = form.valid;
    
    //Return the logical negation of form.validate. Also returns the jq objects
    //That correlate to it.
    form.invalid = function(obj){
        if(typeof obj === 'undefined'){
            //Will hold the jquery object with the invalid items
            var invalidObj = $();
            $(settings.inputs).each(function(){
                if( form.invalid($(this)) ){
                    invalidObj = $(invalidObj).add($(this));	    
                }
            });	    
            return invalidObj;
        }
        else
        {
            return !form.validate(obj);
        }
    };
    
    //=========================================================//
    //Public Method clear
    //Purpose: Clears the form of all input values
    //Postcondition: Form is cleared
    //=========================================================//
    form.clear = function(){
        jQuery(settings.id).find(':input')
                    .not(':button, :submit, :reset, :hidden')
                    .val('').removeAttr('checked')
                    .removeAttr('selected')
                    .removeClass(settings.invalidClass);
        jQuery(settings.id).find('textarea').val('');                                
		jQuery(settings.invalidClass).removeClass(settings.invalidClass);
    };    

        //------------------------------------------------------------
        //Define the potential messages back from the server
        //------------------------------------------------------------
        var Server = {};
        Server.successResponse = "thanks";
        Server.invalidResponse = "invalid";
        Server.errorResponse = "error";
        
        gs.getters({obj: Server, scope:form});
        gs.setters({obj: Server, scope:form});
	
        //-----------------------------------------------------------
        // Define Callback object to hold private callback methods 
        //-----------------------------------------------------------
        var Callback = {};
	
        Callback.success = function(){
            $("#confirmation").html("<h4>Your message was sent successfully.</h4>");
            form.clear();
        };
        
        Callback.serverInvalid = function(){
            $("#confirmation").html("<h4>Message not sent. Please verify your information.</h4>");            
        };
        
        Callback.clientInvalid = function(invalid){
            $("#confirmation").html("<h4>Please verify your information.</h4>");
            $(invalid).addClass(settings.invalidClass);
        };
        
        Callback.error = function(response){
            $("#confirmation").html("<h4>Server Error. Please try again.</h4>");            
        };
        
        Callback.submit = function(){
           $("#confirmation").html("<h4>Sending...</h4>"); 
        };
        
        //Function that decides which callback to execute based on server response.
        Callback.doCallback = function(response){
            if(response == Server.successResponse)
            {
                Callback.success();
            }
            
            else if(response == Server.invalidResponse)
            {
                Callback.serverInvalid();
            }
            
            else
            {
                Callback.error(response);                
            }            
        };
        
        //Define mutator methods for Callback. onSuccess, onInvalid
        gs.setters({obj: Callback, scope: form, prefix: "on"});
        
    //=========================================================//
    //Public Method mail
    //Purpose: Attempt to send mail and get response from server
    //Postcondition: Calls Callback.doCallback
    //=========================================================//
    form.mail = function(){	
        var post = new POST(settings.URL, function(response){
            Callback.doCallback(response);
        });
        
        //Serialize the form
        post.serialize(settings.id);
        
        //If developer requests to add AJAX value, append it to POST string
        if(addAJAX)
        {
            post.set("AJAX", "true");
        }
        
        post.getResponse();
    };
    
	/* 
	 * When the user submits the form, fire the callbacks. clientInvalid
	 * callback is fired if form does not validate, and the submit callback
	 * is fired if the form does validate. Add a variable named AJAX to the
	 * post array to process on the server, and send the mail!
	 */

	$(settings.id).submit(function(){
		//If the form is valid, mail it. If not, add the
		//invalid class to all invalid items.
		if(form.valid()){
			Callback.submit();
			
			//Add an AJAX post variable
			form.addAJAX();
			
			//Display a sending indicator
			form.mail();
		}

		else{
			Callback.clientInvalid($(form.invalid()));
		}
	});
}



/******************************************************************************/
/*                         Begin jQuery Plugins                               */
/******************************************************************************/
(function(jQuery) {
//------------------------------plugin arrayShift-----------------------------//
// Description: Takes an index of an array, places it at
// another index, and shifts the rest of the array into place
// PARAMETERS:
//		 index;       //The index being moved
//		 newLocation; //The new index of index
// Postcondition: returns an altered jQuery object
//----------------------------------------------------------------------------//
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

//------------------------------plugin getIndexOf-----------------------------//
// Description: Retrieves the relative index of an object within a jQuery 
//              object.
// PARAMETERS:
//		jQobj;     //The jQuery object being searched through
// Postcondition: Returns an integer corresponding to the location of the 
//                object; if nothing is found, returns boolean false.
//----------------------------------------------------------------------------//
jQuery.fn.getIndexOf = function(jQobj)
{
	//Assume value isn't found
	var index = false;
	
	//Define scope
	var value = jQuery(this);
	
	//Initiate index counter
	var i=0;
	jQuery(jQobj).each(function()
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


//--------------------------------plugin equalTo------------------------------//
// Description: Determines the equality of 2 jQuery objects.
// PARAMETERS:
//		obj;     //The jQuery object being compared
// Postcondition: Returns boolean true if objects are equal. False if not.
//----------------------------------------------------------------------------//
jQuery.fn.equalTo = function(obj)
{
	isEqual = !jQuery(this).not( jQuery(obj) ).length;
	return isEqual;
};

//------------------------------plugin fakeFloat------------------------------//
// Description: Aligns elements in a jQuery object based on their index 
// PARAMETERS:
//	options;  //Object that contains settings
//		direction: The way the elements will be floated (similar to CSS float)
//         margin: The margin/blank space between each element in pixels
//         offset: The initial offset in pixels
//          speed: The speed of alignment animation 
// Postcondition: Performs an animation
//----------------------------------------------------------------------------//
jQuery.fn.fakeFloat = function(options)
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
	
	return this;
	
};

//------------------------------plugin frontPush------------------------------//
// Description: Adds a jQuery object to the front of another jQuery object
// PARAMETERS:
// jQobj: the jQuery object that will be altered.
// Postcondition: Returns the altered jQuery object
//----------------------------------------------------------------------------//
jQuery.fn.frontpush = function(jqObj)
{
	//Number of elements in the jQuery object
	var numElements = jQuery(this).length;
	
	//Convert matched elements to an array for processing.
	var thisArray = jQuery.makeArray(jQuery(this));
	
	//For the number of elements in the jQuery object
	for(var i=0; i<numElements; i++)
	{
		//Prime an arbitrary element at the end
		jqObj.push("");
	}
		
	//For each original element of the jQuery object, go backwards and copy	
	//from the front.
	for(i=(jqObj.length), j=0; i>numElements; i--)
	{	
		j=i-1; //Account for jqObj.length and jqObj[index] discrepancy
		jqObj[j] = jqObj[j-numElements];
	}
	
	//Plug in the new values into the front of the new jQuery object array
	for(i=0; i<numElements; i++)
	{	
		jqObj[i] = thisArray[i];
	}
	
	return jQuery(jqObj);
};

//--------------------------------plugin swap---------------------------------//
// Description: Swaps two elements within a jQuery object
// PARAMETERS:
// index1: The index corresponding to one element that will be swapped
// index2: The index corresponding to the other element tha
// Postcondition: Returns the altered jQuery object. NO ANIMATION OCCURS.
//----------------------------------------------------------------------------//
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
};

})(jQuery); //End document

