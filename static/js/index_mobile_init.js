    $(document).ready(function() {
		
		(function($) {
			$.fn.customFadeIn = function(speed, callback) {
			$(this).fadeIn(speed, function() {
				if(jQuery.browser.msie)
					$(this).get(0).style.removeAttribute('filter');
				if(callback != undefined)
					callback();
			});
			};
			$.fn.customFadeOut = function(speed, callback) {
			$(this).fadeOut(speed, function() {
				if(jQuery.browser.msie)
					$(this).get(0).style.removeAttribute('filter');
				if(callback != undefined)
					callback();
			});
			};
		})(jQuery);
		
		//$('#summaries').append('<div>\<h2 class="museo" >We helped an east Texas artist show (and sell) his work to the world.</h2><div class="case_summary"><p>Derrick White is a nationally recognized artist, and an art profesor at Tyler Junior College in Tyler, Texas.</p><p>We worked with Derrick to create a website that would fit his aesthetic, be easy to update and manage himself, and allow him to reach a much wider audience.</p></div></div><div><h2 class="museo" >We helped a charity poker tournament raise over <sup>$</sup>10,000 to fund cancer research.</h2><div class="case_summary"><p>Each spring poker players travel to Kilgore, Tx in order to try their luck in a poker tournament benefiting the American Cancer Society\'s Relay for Life.</p><p>We built them a website that helped them promote their event, manage their player registrations, and ulitmately take another step towards a cure for cancer.</p></div></div>');
		$('#screenshots').append('<li><img src="images/fffk_mobile_ss1.jpg" alt="www.feetfirst4kids.org screenshot" /></li><li><img src="images/canvashead_mobile_ss1.jpg" alt="www.canvashead.net screenshot" /></li>');
		//$('#featured_work').append('<div id="slideshow_nav"></div>');
		$('#summaries').cycle({
			
			fx: 'scrollLeft', 
			sync: 0,
			speed:    250, 
			timeout:  0
			
		});
		
		var i = 0;
		
		function onAfter() {
			
			if( i == 3) {
				i=0;
			}
			
			$('#summaries').cycle(i);
			i++;
		   
			return false;  
			
		}
		
		/* $('#screenshots').cycle({
			
			fx: 'fade', 
			randomizeEffects: false,
			sync: 0,
			speed: 600, 
			timeout: 11000,
			before: onAfter,
			pager: '#slideshow_nav'
			
		});
		
		*/
		
		$('#screenshots').before('<div id="slideshow_nav">').cycle({ 
			fx:	'fade', 
			speed:  400, 
			timeout: 8000, 
			pager:  '#slideshow_nav',
			after: onAfter,
		});
		
    });
