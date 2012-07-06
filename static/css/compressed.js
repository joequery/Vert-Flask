$(function()
{
    $("#main_nav li").click(function()
    {
        window.location=$(this).find("a").attr("href");
        return false;
	});
    
    //------------------------------------------------------------//
    //               Footer Adjustment for Justin                 //
    //------------------------------------------------------------//
    
    var resolution = $(window).height();
    
    var footer = $("#footer");
    var footerMargin = parseInt($(footer).css('marginTop'),10);
    var contentHeight= $("#content").outerHeight() +
                       $("#header").outerHeight() +
                       $(footer).outerHeight()+
                       parseInt($("#content").css('marginTop'),10);                           
    
    if( contentHeight < resolution )
    {
        footerMargin += (resolution - contentHeight);
        footerMargin = parseInt(footerMargin, 10);        
        $(footer).css('marginTop', footerMargin + "px");        
    }
	
});//------------------------------------------------------------
// File: index_init.js
// Purpose: Initiate the slave slideshow for the home page
// Author: Joseph McCullough (@joe_query) 
// Last Updated: Dec 16, 2010
//------------------------------------------------------------
$(window).load(function()
{
	$('#featured_work').append('<div id="slideshow_nav"><ul><li class="slideNavActive">1</li><li>2</li><li>3</li></ul></div>');
	var summary = 
	{
		container: $("#summaries"),
		entrance: {animation: "fromRight", easing: "easeInOutQuint"},
		exit: {animation: "toLeft", easing: "easeInOutQuint"}
	};
	
	$("#screenshots").slaveshow(
	{
		slaves: [summary],
		entrance: {speed: 1000},
		exit: {speed: 1000},
		transition: "fade",
		duration: 13000,
		nav: $("#slideshow_nav ul li")
	});
});
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 *///--------------------------------------------------------------------
//File: slaveshow.min.js
//Author: Joseph McCullough. 
//		  http://vertstudios.com/
//		  @Joe_query
//Purpose: Executes a slideshow with optional slaves that follow suit.
//         Features include next, previous, and navigation.
//Last Updated: November 13, 2010
//--------------------------------------------------------------------

function c(d){if((typeof d=='undefined')||(d==null)||(d=="")){return false;}else{return true;}}

(function(d){d.fn.slaveshow=function(e){var f={container:d(this),slides:d(this).children(),duration:3000,transition:500,slaves:[],delay:0,cycles:10};defaultSettings=d.extend(f,d.fn.slaveshow.defaults,e);var g={animating:false,navSelected:false,numAnimating:0,relativeIndex:0,activeIndex:0,slidesTemplate:d(defaultSettings.slides),numSlideShows:0,numSlides:d(defaultSettings.slides).length,totalDelay:0,defaultEntrance:{animation:"fadeIn",speed:500,easing:"jswing"},defaultExit:{animation:"fadeOut",speed:500,easing:"jswing"}};function h(k){for(var i in defaultSettings){this[i]=(c(k[i]))?k[i]:defaultSettings[i];}this.container=d(k.container);this.slides=d(k.container).children();if(g.numSlideShows==0){this.entrance=g.defaultEntrance;this.exit=g.defaultExit;}else{this.entrance=d.extend(true,{},slideshowArray.main.entrance);this.exit=d.extend(true,{},slideshowArray.main.exit);}if(c(k.entrance)){for(var i in this.entrance){this.entrance[i]=k.entrance[i]||this.entrance[i];}}if(c(k.exit)){for(var i in this.exit){this.exit[i]=k.exit[i]||this.exit[i];}}this.cycles=Math.abs(this.cycles);this.delay=Math.abs(this.delay);this.duration=Math.abs(this.duration);if(this.transition.constructor==String){switch(this.transition){case "fade":this.transition=-1*(this.entrance.speed+this.exit.speed);break;case "none":this.transition=0;break;default:this.transition=250;}}g.numSlideShows++;g.totalDelay+=this.delay;}h.prototype.displaySlide=function(k,l){var m=this;g.activeIndex=l;if(k!=0&&(g.numAnimating<g.numSlideShows)){if(g.numAnimating==0)g.animating=true;setTimeout(function(){m.firstSlide=d(m.slides[0]);m.doTransition(m.firstSlide,m.exit);for(var i=0;i<k;i++){m.slides=d(m.slides).arrayShift("first","last");}if(c(defaultSettings.nav)){d(defaultSettings.nav).removeClass('slideNavActive').addClass('slideNavUnclickable');d(defaultSettings.nav).eq(l).addClass('slideNavActive slideNavActiveUnclickable');}},m.delay);setTimeout(function(){m.firstSlide=d(m.slides[0]).hide();d(m.slides).fakeFloat();d(m.slides).slice(1).show(0);m.doTransition(m.firstSlide,m.entrance);setTimeout(function(){g.numAnimating++;if(g.numAnimating==g.numSlideShows){g.animating=false;g.numAnimating=0;d(defaultSettings.nav).removeClass('slideNavUnclickable slideNavActiveUnclickable');}},m.entrance.speed);},(m.delay+m.exit.speed+m.entrance.speed+((g.navSelected==false||(g.navSelected==true&&m.transition<0))?m.transition:0)));}};h.prototype.animate=function(){var k=this;for(var i=1;i<(k.slides.length*k.cycles);i++){setTimeout(function(){if(g.navSelected==false){if(k==slideshowArray.main){(g.activeIndex<g.numSlides-1)?g.activeIndex++:g.activeIndex=0;g.relativeIndex=d(g.slidesTemplate[g.activeIndex]).getIndexOf(slideshowArray["main"].slides);}k.displaySlide(g.relativeIndex,g.activeIndex);}},((k.duration+k.entrance.speed+k.exit.speed+k.transition+g.totalDelay)*i));}};h.prototype.doTransition=function(k,l){var m=l.animation.toLowerCase();var n=d(k).width();var o=l.speed;var p=l.easing;switch(m){case "fromright":d(k).animate({'left':'+='+n+'px','opacity':'show'},0).animate({'left':'-='+n+'px'},{duration:o,easing:p});break;case "fromleft":d(k).animate({'left':'-='+n+'px','opacity':'show'},0).animate({'left':'+='+n+'px'},{duration:o,easing:p});break;case "frombottom":d(k).animate({'top':'+='+n+'px','opacity':'show'},0).animate({'top':'-='+n+'px'},{duration:o,easing:p});break;case "fromtop":d(k).animate({'top':'-='+n+'px','opacity':'show'},0).animate({'top':'+='+n+'px'},{duration:o,easing:p});break;case "fadein":d(k).fadeIn(o);break;case "toleft":d(k).animate({'left':'-='+n+'px'},{duration:o,easing:p}).animate({'opacity':'hide','left':'+='+n+'px'},0);break;case "toright":d(k).animate({'left':'+='+n+'px'},{duration:o,easing:p}).animate({'opacity':'hide','left':'-='+n+'px'},0);break;case "totop":d(k).animate({'top':'-='+n+'px'},{duration:o,easing:p}).animate({'opacity':'hide','top':'+='+n+'px'},0);break;case "tobottom":d(k).animate({'top':'+='+n+'px'},{duration:o,easing:p}).animate({'opacity':'hide','top':'-='+n+'px'},0);break;default:d(k).fadeOut(o);}};var slideshowArray={main:new h(defaultSettings)};if(defaultSettings.slaves.length){for(i=0;i<defaultSettings.slaves.length;i++){slideshowArray["slave"+i]=new h(defaultSettings.slaves[i]);}}if(c(defaultSettings.nav)||c(defaultSettings.left)){d(defaultSettings.nav).click(function(){if(g.animating==false&&g.numAnimating==0){g.navSelected=true;g.relativeIndex=d(g.slidesTemplate[d(this).index()]).getIndexOf(slideshowArray["main"].slides);for(var i in slideshowArray){slideshowArray[i].displaySlide(g.relativeIndex,d(this).index());}}});}if(c(defaultSettings.left)&&c(defaultSettings.right)){defaultSettings.right.add(defaultSettings.left).click(function(){if(g.animating==false&&g.numAnimating==0){g.navSelected=true;if(d(this).equalTo(defaultSettings.left)){g.activeIndex>0?g.activeIndex--:g.activeIndex=g.numSlides-1;}else{g.activeIndex<g.numSlides-1?g.activeIndex++:g.activeIndex=0;}g.relativeIndex=d(g.slidesTemplate[g.activeIndex]).getIndexOf(slideshowArray["main"].slides);for(var i in slideshowArray){slideshowArray[i].displaySlide(g.relativeIndex,g.activeIndex);}}});}for(var i in slideshowArray){d(slideshowArray[i].slides).fakeFloat();slideshowArray[i].animate();}};d.fn.arrayShift=function(e,f,g){var h=d.makeArray(d(this));for(var i=0;i<arguments.length;i++){if(isNaN(arguments[i])){if(arguments[i]=="first"){arguments[i]=0;}else if(arguments[i]=="last"){arguments[i]=h.length-1;}}else{arguments[i]=parseInt(arguments[i],10);}}var k=h[e];if(e>f){for(i=e;i>f;i--){h[i]=h[i-1];}h[f]=k;}else if(e<f){for(i=e;i<f;i++){h[i]=h[i+1];}h[f]=k;}if(typeof g=='function'){g.call(this);}return d(h);};d.fn.atIndex=function(e){var f=d.makeArray(d(this));return f[e];};d.fn.getIndexOf=function(e){var f=false;var g=d(this);var i=0;d(e).each(function(){if(d(this).equalTo(d(g))){f=i;}i++;});return f;};d.fn.equalTo=function(e){isEqual=!d(this).not(d(e)).length;return isEqual;};d.fn.fakeFloat=function(e,f){var g={direction:"left",margin:0,offset:0,speed:0},h=d.extend(g,d.fn.fakeFloat.defaults,e);var i=0;var k=0;d(this).each(function(){k=d(this).width();if(h.direction=="left"){d(this).animate({"left":((h.margin)+k)*i+(h.offset)+'px'},h.speed);}else{d(this).animate({"right":((h.margin)+k)*i+(h.offset)+'px'},h.speed);}i++;});if(typeof f=='function'){setTimeout(function(){f.call(this);},h.speed);}return this;};d.fn.frontpush=function(e){var f=d(this).length;var g=d.makeArray(d(this));for(var i=0;i<f;i++){e.push("");}for(i=(e.length);i>f;i--){var j=i-1;e[j]=e[j-f];}for(i=0;i<f;i++){e[i]=g[i];}return d(e);};})(jQuery);//---------------------------------------------------------------------
//Carousel
//Date: December 16, 2010
//File: click-carousel.min.js
//Author: Joseph McCullough - @Joe_Query - http://www.vertstudios.com/
//---------------------------------------------------------------------

(function($) {
/******************Plug-in clickCarousel *****************
Description: Sets up a click-based slider that moves the
clicked element to the end of a row of elements. 

PARAMETERS:
margin       //The space between the shifting elements of the carousel
speed        //How long the elements take to shift
left         //The element that shifts the carousel left
right        //The element that shifts the carousel right
easing       //Animation easing option
*********************************************************/

$.fn.carousel = function(options)
{
	//Define scope
	var shifting = jQuery(this);
    
    //Width of the shifting elements
    var width = $(shifting).width();
    
    //Number of shifting elements
    var numElements = $(shifting).length;
    
    //Animation flag
    var animating = false;
		
	//List default values
	var defaults = {
	margin: 0,
	speed: 500,
	left: $("#left"),
	right: $("#right"),
    easing: "jswing"
	},
	settings = jQuery.extend(defaults, options); 
	
	//Line up elements from left to right, taking into account their margin.
    $(shifting).fakeFloat({margin: settings.margin});
    
    //If left trigger is clicked
    $(settings.left).click(function()
    {
        //Make sure we aren't currently animating.
        if(!animating)
        {
            animating = true;
          
            //Shift eltements left
            $(shifting).stop(true)
                       .animate({'left': '-=' + (width + settings.margin)},
                       {duration: settings.speed, easing: settings.easing});
            
            //Wait until animation is over 
            setTimeout(function()
            {
                //Take the first element and add it to the end
                $(shifting).first().animate({'left':'+=' + (width + settings.margin) * numElements},0);
                
                //Get new first/last element
                shifting = $(shifting).arrayShift("first", "last");
                    
                //No longer animating
                animating = false;
                       
            }, settings.speed);
        }                   
		return false;
    });
    
    //If right trigger is clicked
    $(settings.right).click(function()
    {
        //Make sure we aren't currently animating.
        if(!animating)
        {
            animating = true;
            
            //Put the last element at the front
            $(shifting).last().css('left', -(width + settings.margin));
            
            //Shift elements right
            $(shifting).stop(true,true)
                       .animate({'left': '+=' + (width + settings.margin)},
                       {duration: settings.speed, easing: settings.easing});
            
            //Wait until animation is over 
            setTimeout(function()
            {
                //Get new first/last element
                shifting = $(shifting).arrayShift("last", "first");
                
                //No longer animating
                animating = false;
                
            }, settings.speed);                   
        }      
		return false;
    });
    
		
	
};
})(jQuery); //End document
//------------------------------------------------------------
// File: carousel-init.js
// Purpose: Initiate the "from the blog" carousel
// Author: Joseph McCullough (@joe_query) 
// Last Updated: Dec 16, 2010
//------------------------------------------------------------
$(function(){
	// if they are on iphone or iPod, no carousel
	if(!((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))))
	{
					
		$('#from_the_blog').append('<img id="prev" src="http://assets.vertstudios.com/images/prev.png" alt="previous"/><img id="next" src="http://assets.vertstudios.com/images/next.png" alt="previous"/>');
							
		$(".post_snippet").css('paddingLeft', 0).carousel({
			margin: 15,
			speed: 500,
			left: $("#prev"),
			right: $("#next")
		});		
	}		
});
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 *//************************************************************/
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
var q=null;window.PR_SHOULD_USE_CONTINUATION=!0;
(function(){function L(a){function m(a){var f=a.charCodeAt(0);if(f!==92)return f;var b=a.charAt(1);return(f=r[b])?f:"0"<=b&&b<="7"?parseInt(a.substring(1),8):b==="u"||b==="x"?parseInt(a.substring(2),16):a.charCodeAt(1)}function e(a){if(a<32)return(a<16?"\\x0":"\\x")+a.toString(16);a=String.fromCharCode(a);if(a==="\\"||a==="-"||a==="["||a==="]")a="\\"+a;return a}function h(a){for(var f=a.substring(1,a.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),a=
[],b=[],o=f[0]==="^",c=o?1:0,i=f.length;c<i;++c){var j=f[c];if(/\\[bdsw]/i.test(j))a.push(j);else{var j=m(j),d;c+2<i&&"-"===f[c+1]?(d=m(f[c+2]),c+=2):d=j;b.push([j,d]);d<65||j>122||(d<65||j>90||b.push([Math.max(65,j)|32,Math.min(d,90)|32]),d<97||j>122||b.push([Math.max(97,j)&-33,Math.min(d,122)&-33]))}}b.sort(function(a,f){return a[0]-f[0]||f[1]-a[1]});f=[];j=[NaN,NaN];for(c=0;c<b.length;++c)i=b[c],i[0]<=j[1]+1?j[1]=Math.max(j[1],i[1]):f.push(j=i);b=["["];o&&b.push("^");b.push.apply(b,a);for(c=0;c<
f.length;++c)i=f[c],b.push(e(i[0])),i[1]>i[0]&&(i[1]+1>i[0]&&b.push("-"),b.push(e(i[1])));b.push("]");return b.join("")}function y(a){for(var f=a.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),b=f.length,d=[],c=0,i=0;c<b;++c){var j=f[c];j==="("?++i:"\\"===j.charAt(0)&&(j=+j.substring(1))&&j<=i&&(d[j]=-1)}for(c=1;c<d.length;++c)-1===d[c]&&(d[c]=++t);for(i=c=0;c<b;++c)j=f[c],j==="("?(++i,d[i]===void 0&&(f[c]="(?:")):"\\"===j.charAt(0)&&
(j=+j.substring(1))&&j<=i&&(f[c]="\\"+d[i]);for(i=c=0;c<b;++c)"^"===f[c]&&"^"!==f[c+1]&&(f[c]="");if(a.ignoreCase&&s)for(c=0;c<b;++c)j=f[c],a=j.charAt(0),j.length>=2&&a==="["?f[c]=h(j):a!=="\\"&&(f[c]=j.replace(/[A-Za-z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return f.join("")}for(var t=0,s=!1,l=!1,p=0,d=a.length;p<d;++p){var g=a[p];if(g.ignoreCase)l=!0;else if(/[a-z]/i.test(g.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){s=!0;l=!1;break}}for(var r=
{b:8,t:9,n:10,v:11,f:12,r:13},n=[],p=0,d=a.length;p<d;++p){g=a[p];if(g.global||g.multiline)throw Error(""+g);n.push("(?:"+y(g)+")")}return RegExp(n.join("|"),l?"gi":"g")}function M(a){function m(a){switch(a.nodeType){case 1:if(e.test(a.className))break;for(var g=a.firstChild;g;g=g.nextSibling)m(g);g=a.nodeName;if("BR"===g||"LI"===g)h[s]="\n",t[s<<1]=y++,t[s++<<1|1]=a;break;case 3:case 4:g=a.nodeValue,g.length&&(g=p?g.replace(/\r\n?/g,"\n"):g.replace(/[\t\n\r ]+/g," "),h[s]=g,t[s<<1]=y,y+=g.length,
t[s++<<1|1]=a)}}var e=/(?:^|\s)nocode(?:\s|$)/,h=[],y=0,t=[],s=0,l;a.currentStyle?l=a.currentStyle.whiteSpace:window.getComputedStyle&&(l=document.defaultView.getComputedStyle(a,q).getPropertyValue("white-space"));var p=l&&"pre"===l.substring(0,3);m(a);return{a:h.join("").replace(/\n$/,""),c:t}}function B(a,m,e,h){m&&(a={a:m,d:a},e(a),h.push.apply(h,a.e))}function x(a,m){function e(a){for(var l=a.d,p=[l,"pln"],d=0,g=a.a.match(y)||[],r={},n=0,z=g.length;n<z;++n){var f=g[n],b=r[f],o=void 0,c;if(typeof b===
"string")c=!1;else{var i=h[f.charAt(0)];if(i)o=f.match(i[1]),b=i[0];else{for(c=0;c<t;++c)if(i=m[c],o=f.match(i[1])){b=i[0];break}o||(b="pln")}if((c=b.length>=5&&"lang-"===b.substring(0,5))&&!(o&&typeof o[1]==="string"))c=!1,b="src";c||(r[f]=b)}i=d;d+=f.length;if(c){c=o[1];var j=f.indexOf(c),k=j+c.length;o[2]&&(k=f.length-o[2].length,j=k-c.length);b=b.substring(5);B(l+i,f.substring(0,j),e,p);B(l+i+j,c,C(b,c),p);B(l+i+k,f.substring(k),e,p)}else p.push(l+i,b)}a.e=p}var h={},y;(function(){for(var e=a.concat(m),
l=[],p={},d=0,g=e.length;d<g;++d){var r=e[d],n=r[3];if(n)for(var k=n.length;--k>=0;)h[n.charAt(k)]=r;r=r[1];n=""+r;p.hasOwnProperty(n)||(l.push(r),p[n]=q)}l.push(/[\S\s]/);y=L(l)})();var t=m.length;return e}function u(a){var m=[],e=[];a.tripleQuotedStrings?m.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,q,"'\""]):a.multiLineStrings?m.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
q,"'\"`"]):m.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,q,"\"'"]);a.verbatimStrings&&e.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,q]);var h=a.hashComments;h&&(a.cStyleComments?(h>1?m.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):m.push(["com",/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/,q,"#"]),e.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,q])):m.push(["com",/^#[^\n\r]*/,
q,"#"]));a.cStyleComments&&(e.push(["com",/^\/\/[^\n\r]*/,q]),e.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,q]));a.regexLiterals&&e.push(["lang-regex",/^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);(h=a.types)&&e.push(["typ",h]);a=(""+a.keywords).replace(/^ | $/g,
"");a.length&&e.push(["kwd",RegExp("^(?:"+a.replace(/[\s,]+/g,"|")+")\\b"),q]);m.push(["pln",/^\s+/,q," \r\n\t\xa0"]);e.push(["lit",/^@[$_a-z][\w$@]*/i,q],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,q],["pln",/^[$_a-z][\w$@]*/i,q],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,q,"0123456789"],["pln",/^\\[\S\s]?/,q],["pun",/^.[^\s\w"-$'./@\\`]*/,q]);return x(m,e)}function D(a,m){function e(a){switch(a.nodeType){case 1:if(k.test(a.className))break;if("BR"===a.nodeName)h(a),
a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)e(a);break;case 3:case 4:if(p){var b=a.nodeValue,d=b.match(t);if(d){var c=b.substring(0,d.index);a.nodeValue=c;(b=b.substring(d.index+d[0].length))&&a.parentNode.insertBefore(s.createTextNode(b),a.nextSibling);h(a);c||a.parentNode.removeChild(a)}}}}function h(a){function b(a,d){var e=d?a.cloneNode(!1):a,f=a.parentNode;if(f){var f=b(f,1),g=a.nextSibling;f.appendChild(e);for(var h=g;h;h=g)g=h.nextSibling,f.appendChild(h)}return e}
for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=b(a.nextSibling,0),e;(e=a.parentNode)&&e.nodeType===1;)a=e;d.push(a)}var k=/(?:^|\s)nocode(?:\s|$)/,t=/\r\n?|\n/,s=a.ownerDocument,l;a.currentStyle?l=a.currentStyle.whiteSpace:window.getComputedStyle&&(l=s.defaultView.getComputedStyle(a,q).getPropertyValue("white-space"));var p=l&&"pre"===l.substring(0,3);for(l=s.createElement("LI");a.firstChild;)l.appendChild(a.firstChild);for(var d=[l],g=0;g<d.length;++g)e(d[g]);m===(m|0)&&d[0].setAttribute("value",
m);var r=s.createElement("OL");r.className="linenums";for(var n=Math.max(0,m-1|0)||0,g=0,z=d.length;g<z;++g)l=d[g],l.className="L"+(g+n)%10,l.firstChild||l.appendChild(s.createTextNode("\xa0")),r.appendChild(l);a.appendChild(r)}function k(a,m){for(var e=m.length;--e>=0;){var h=m[e];A.hasOwnProperty(h)?window.console&&console.warn("cannot override language handler %s",h):A[h]=a}}function C(a,m){if(!a||!A.hasOwnProperty(a))a=/^\s*</.test(m)?"default-markup":"default-code";return A[a]}function E(a){var m=
a.g;try{var e=M(a.h),h=e.a;a.a=h;a.c=e.c;a.d=0;C(m,h)(a);var k=/\bMSIE\b/.test(navigator.userAgent),m=/\n/g,t=a.a,s=t.length,e=0,l=a.c,p=l.length,h=0,d=a.e,g=d.length,a=0;d[g]=s;var r,n;for(n=r=0;n<g;)d[n]!==d[n+2]?(d[r++]=d[n++],d[r++]=d[n++]):n+=2;g=r;for(n=r=0;n<g;){for(var z=d[n],f=d[n+1],b=n+2;b+2<=g&&d[b+1]===f;)b+=2;d[r++]=z;d[r++]=f;n=b}for(d.length=r;h<p;){var o=l[h+2]||s,c=d[a+2]||s,b=Math.min(o,c),i=l[h+1],j;if(i.nodeType!==1&&(j=t.substring(e,b))){k&&(j=j.replace(m,"\r"));i.nodeValue=
j;var u=i.ownerDocument,v=u.createElement("SPAN");v.className=d[a+1];var x=i.parentNode;x.replaceChild(v,i);v.appendChild(i);e<o&&(l[h+1]=i=u.createTextNode(t.substring(b,o)),x.insertBefore(i,v.nextSibling))}e=b;e>=o&&(h+=2);e>=c&&(a+=2)}}catch(w){"console"in window&&console.log(w&&w.stack?w.stack:w)}}var v=["break,continue,do,else,for,if,return,while"],w=[[v,"auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],F=[w,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],G=[w,"abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],
H=[G,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],w=[w,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],I=[v,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
J=[v,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],v=[v,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],K=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,N=/\S/,O=u({keywords:[F,H,w,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END"+
I,J,v],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),A={};k(O,["default-code"]);k(x([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),
["default-markup","htm","html","mxml","xhtml","xml","xsl"]);k(x([["pln",/^\s+/,q," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,q,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",
/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);k(x([],[["atv",/^[\S\s]+/]]),["uq.val"]);k(u({keywords:F,hashComments:!0,cStyleComments:!0,types:K}),["c","cc","cpp","cxx","cyc","m"]);k(u({keywords:"null,true,false"}),["json"]);k(u({keywords:H,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:K}),["cs"]);k(u({keywords:G,cStyleComments:!0}),["java"]);k(u({keywords:v,hashComments:!0,multiLineStrings:!0}),["bsh","csh","sh"]);k(u({keywords:I,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),
["cv","py"]);k(u({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["perl","pl","pm"]);k(u({keywords:J,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb"]);k(u({keywords:w,cStyleComments:!0,regexLiterals:!0}),["js"]);k(u({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);k(x([],[["str",/^[\S\s]+/]]),["regex"]);window.prettyPrintOne=function(a,m,e){var h=document.createElement("PRE");h.innerHTML=a;e&&D(h,e);E({g:m,i:e,h:h});return h.innerHTML};window.prettyPrint=function(a){function m(){for(var e=window.PR_SHOULD_USE_CONTINUATION?l.now()+250:Infinity;p<h.length&&l.now()<e;p++){var n=h[p],k=n.className;if(k.indexOf("prettyprint")>=0){var k=k.match(g),f,b;if(b=
!k){b=n;for(var o=void 0,c=b.firstChild;c;c=c.nextSibling)var i=c.nodeType,o=i===1?o?b:c:i===3?N.test(c.nodeValue)?b:o:o;b=(f=o===b?void 0:o)&&"CODE"===f.tagName}b&&(k=f.className.match(g));k&&(k=k[1]);b=!1;for(o=n.parentNode;o;o=o.parentNode)if((o.tagName==="pre"||o.tagName==="code"||o.tagName==="xmp")&&o.className&&o.className.indexOf("prettyprint")>=0){b=!0;break}b||((b=(b=n.className.match(/\blinenums\b(?::(\d+))?/))?b[1]&&b[1].length?+b[1]:!0:!1)&&D(n,b),d={g:k,h:n,i:b},E(d))}}p<h.length?setTimeout(m,
250):a&&a()}for(var e=[document.getElementsByTagName("pre"),document.getElementsByTagName("code"),document.getElementsByTagName("xmp")],h=[],k=0;k<e.length;++k)for(var t=0,s=e[k].length;t<s;++t)h.push(e[k][t]);var e=q,l=Date;l.now||(l={now:function(){return+new Date}});var p=0,d,g=/\blang(?:uage)?-([\w.]+)(?!\S)/;m()};window.PR={createSimpleLexer:x,registerLangHandler:k,sourceDecorator:u,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",
PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ"}})();
