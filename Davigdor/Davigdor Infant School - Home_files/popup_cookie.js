		jQuery(document).ready(function(){
			jQuery("<div id='cookies-policy-box'><div id='cookies-policy-icon'></div><div id='cookies-policy-icon-hide' style='display: none;'></div></div><div id='cookies-policy-info' style='display: none;'><div id='cookies-policy-info-close'></div><p>This website uses 'cookies' to track visitor numbers. We don't collect any personal information from you using these cookies. To find out more about how we use cookies on the site <a rel='nofollow' href='http://www.webanywhere.co.uk/privacy-policy'>click here</a>.</p><p></p></div>").appendTo('body');
			jQuery('#cookies-policy-icon').css({
					'width': '111px',
					'height': '111px',
					'position': 'fixed',
					'left': '0',
					'bottom': '0',
					'cursor': 'pointer',
					'background': 'transparent url("/popup/cookies-policy-icon.png") no-repeat 0 0',
					'z-index': '300'
			}).data('hidden', false);

			jQuery('#cookies-policy-icon-hide').css({
					'width': '50px',
					'height': '50px',
					'position': 'fixed',
					'left': '60px',
					'bottom': '60px',
					'cursor': 'pointer',
					'background': 'transparent url("/popup/arrow-to-hide.png") no-repeat 0 0',
					'z-index': '300'
			});
			jQuery('#cookies-policy-info').css({
					'display': 'none',
					'position': 'fixed',
					'left': '100px',
					'bottom': '100px',
					'padding': '20px 10px 10px 10px',
					'background': 'transparent url("/popup/cookies-policy-transparent07.png") repeat 0 0',
					'border-radius': '5px',
					'color': '#fff',
					'width': '200px',
					'z-index': '310'
			});
			jQuery('#cookies-policy-info-close').css({
					'width': '16px',
					'height': '16px',
					'background': 'transparent url("/popup/cookies-policy-close-icon.png") no-repeat 0 0',
					'position': 'absolute',
					'right': '10px',
					'top': '10px'
			});
			jQuery('#cookies-policy-info a').css({
					'color': '#8DC63F',
					'text-decoration': 'none'
			});	

			try{
				// Under IE8 Compabilty view doeasn't work
				jQuery('#cookies-policy-info a:hover').css({'text-decoration': 'underline' });	
			}catch(e){
				// Nothing special ;)
			}
			jQuery('#cookies-policy-box').hover(function(){
					if(jQuery('#cookies-policy-icon').data('hidden')){
						var back_img = "arrow-to-show.png";
					}else{
						var back_img = "arrow-to-hide.png";
					}

					jQuery('#cookies-policy-icon-hide').css({
						'background': 'transparent url("/popup/'+back_img+'") no-repeat 0 0'
					});
					jQuery('#cookies-policy-icon-hide').fadeIn();
			}, function(){
				jQuery('#cookies-policy-icon-hide').fadeOut();
			});

			jQuery('#cookies-policy-icon-hide').click(function(){
				if(jQuery('#cookies-policy-icon').data('hidden') == false){
					jQuery('#cookies-policy-icon').data('hidden', true);
			  		jQuery('#cookies-policy-icon').animate({left: '-=45', bottom: '-=45'},2000);
				}else{
					jQuery('#cookies-policy-icon').data('hidden', false);
			  		jQuery('#cookies-policy-icon').animate({left: '+=45', bottom: '+=45'},2000);
				}
			});


			jQuery('#cookies-policy-icon').click(function(){
					jQuery('#cookies-policy-info').fadeIn();
				if(jQuery('#cookies-policy-icon').data('hidden')){
					jQuery('#cookies-policy-icon').data('hidden', false);
					jQuery('#cookies-policy-icon').animate({left: '+=45', bottom: '+=45'},2000);
				}
				
			  
			});
				
			jQuery('#cookies-policy-info-close').click(function(){
			  jQuery('#cookies-policy-info').fadeOut();
			});

			
		});

