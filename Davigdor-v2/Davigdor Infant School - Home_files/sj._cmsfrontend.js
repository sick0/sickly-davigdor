var SJ = SJ || {};
var __ = __ || function(str) { return str; }

SJ.CMSFrontend = SJ.CMSFrontend || {

    init: function() {
        var self = SJ.CMSFrontend;

        // Disable hidden overflow - Menu dropdown
        $("#nav").css("overflow", "visible");


        // Check if site is in iframe
        self.disable_click();

        self.cookie_warning();



        self.Elements.blogpost_event();
        self.Elements.coursework_event();
        self.Elements.forum_event();
        self.Elements.quiz_event();
        self.Elements.wiki_event();
        self.Elements.marquee_event();
        //init for pane
        if(typeof SJ.Pane !== 'undefined') {
            SJ.Pane.Load.add(SJ.CMSFrontend.Elements.init);
        }
        self.Elements.init();

    },

    // Get parameters from url
    url_get_param : function(name) {
        return decodeURI( (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1] );
    }, 

    // Disable click when preview page in iframe        
    disable_click : function() {

        if( typeof this.url_get_param('disable_click') !== 'undefined' &&  parseInt(this.url_get_param('disable_click'),10) === 1) {

            $('body').css('position', 'relative');
            $('body div').first().before("<div class='cms-disable-click-on-page'/>");
        }
    }, 

    // Function to loading images
    image_loading: function(id, run_function, msg, counter) {
        
        if(typeof msg === 'undefined' || msg.length <= 0) {
            msg = 'Loading image...';
        }

        if(typeof counter === 'undefined') {
            counter = false;
        }

        var $img_in_element = $('#' + id + ' img'), 
            $element = $('#' + id),
            info = msg;
        
        $element.data('count', 0);
        $element.data('all_img_count', $img_in_element.size());
        $element.data('already_work', false);

        if (counter) {
            info = msg + '(0/' + $element.data('all_img_count') + ')';
        }

        $element.wrap("<div class='sj_img_loading'></div>");
        $element.hide();
        $element.before("<span class='sj_img_loading_msg'>" + info + "</span>");
        
        $img_in_element.load(function() {

            // Don't load when error (503) instead of image
            if(this.naturalWidth == 0){
                return;
            }

            // Fast check does img already pass load function (Opera issue)
            if(true === $(this).data('loaded_wa')) {
                return;
            }
            $(this).data('loaded_wa', true);
            // Update loading information
            var $msg = $(this).parents(".sj_img_loading").find("span.sj_img_loading_msg");

            if (counter) {
                $msg.html( msg + '(' + $element.data("count") + '/' + $element.data('all_img_count') + ')' );
            } else {
                $msg.html( msg );
            }

            $element.data().count++;
            if($element.data().count >= $element.data("all_img_count")) {
                $element.data('already_work', true);
                $element.parents(".sj_img_loading").find("span.sj_img_loading_msg").remove();
                $element.unwrap();
                $element.show();
                run_function();
            }
        });

        $img_in_element.error(function() {
            var $self = $(this);
            setTimeout(function(){
                var src = $self.attr('src').replace(/[?&]ref=[\d]+/g,'');
                $self.removeAttr('src').attr('src',src+'?ref='+( new Date() ).getTime());
            },10000);
        });

        setTimeout(function() {
            // Check if image already loaded (Opera issue)
            $img_in_element.each(function() {
                if (this.complete && this.naturalWidth != 0) { 
                    $(this).trigger("load");
                }
            });

            // Ie issue with handle onload and error
            if ( $.browser.msie && $.browser.version < 9 ) {
                $img_in_element.each(function() {
                     $(this).attr('src', $(this).attr('src'));
                });
            }    
        }, 500);

        setTimeout(function() {
            if($element.data('already_work') === false) {
                $element.parents(".sj_img_loading").find("span.sj_img_loading_msg").html(__('Please wait. It may take a little longer to load images...'));
            }
        }, 10000);
       
    },  

    cookie_warning : function() {
        // If user din't close window before - show it
        if($.cookie('cookie_warning') === undefined) {
            // Handle to cookie warning window
            var $box = $('#cookie_warning_window');
            if($box.closest('.version1').length > 0) {
                var height = $box.css('height');
                $box
                    .css('height', 0)
                    .show()
                    .animate({height: height}, 'slow');
            } else {
                $box.show('slow');
            }
            
            $('#cookie_warning_close_window_btn').click(function() {
                $.cookie('cookie_warning', true, { path:'/', expires:3650 });
                
                if($box.closest('.version1').length > 0) {
                    $box.animate({ height: 0 }, 'slow', function() {
                        $box.hide();
                    });
                } else {
                    $box.hide('slow');
                }
                return false;
            });
        }
    },

    Elements : {
        init : function() {
            // For render
            var place = '',
                self = SJ.CMSFrontend.Elements;

            if($('.pane').length > 0){
                place = '.pane ';
            } 

            if($(place + '.element-resourceblogpost').length > 0 ) {
                self.blogpost(place);
            } 
            if($(place + '.element-resourcecoursework').length > 0 ) {
                self.coursework(place);
            }
            if($(place + '.element-resourceforum').length > 0 ) {
                self.forum(place);
            } 
            if($(place + '.element-resourcequiz').length > 0 ) {
                self.quiz(place);
            } 
            if($(place + '.element-resourcewiki').length > 0 ) {
                self.wiki(place);
            } 
            if($(place + '.element-marquee').length > 0 ) {
                self.marquee(place);
            } 
             
        },
        image : function(id) {
                var run_function = function () {};
                SJ.CMSFrontend.image_loading(id,run_function);
        },
        image_open : function(id) {
                var run_function = function () {
                        if(typeof $.magnificPopup !== 'undefined') {
                            $('#' + id).magnificPopup({
                              delegate: 'a',
                              type: 'image',
                              gallery:{ enabled:false }
                            });                 
                        }
                    };
                SJ.CMSFrontend.image_loading(id,run_function);
        },
        gallery : function(id) {
                var org_id = id;
                id = 'sj_element_gallery_' + id;

                var run_function = function () {
                        $this = $('#' + id);
                        $this.magnificPopup({
                          delegate: 'a',
                          type: 'image',
                          gallery:{ enabled:true }
                        });

                         if ($('.utility .cms-mode-edit').length) {
                            SJ.Sites.Elements.gallery(org_id);
                         }
                    };
                SJ.CMSFrontend.image_loading(id,run_function, '',true);
        },   
        flash : function(id, width, height) {
                $("#" + id).html("<a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>");

                var url = $("#" + id).data('src'),
                    flashvars = {}, 
                    params = {}, 
                    attributes = {};

                params.wmode = "transparent";
                params.scale = "default";
                swfobject.embedSWF(url, id, width, height, "9.0.0", "/ui/vendor/swfobject/swf/expressInstall.swf", flashvars, params, attributes);
        },    
        cycle : function(id, fx_name, duration) {
                var run_function = function () {
                        $('#' + id).find("img").each( function(){ 
                            $(this).attr("width",$(this).width());  
                            $(this).attr("height",$(this).height());

                        });
                        var w = $('#' + id).width(),
                            h = $('#' + id).height();
                        $('#' + id + " div").css("width", w);
                        $('#' + id + " div").css("height", h);
                        
                        $("#" + id).cycle({ 
                            sync:true, 
                            fx: fx_name, 
                            timeout:  parseInt(duration,10) * 1000
                        });
                    };
                SJ.CMSFrontend.image_loading(id,run_function,'',true);
        },
        map : function(id, title, lat, lng) {
                if (typeof lat === 'undefined' || typeof lng === 'undefined' ) return;

                // Options
                var myLatlng = new google.maps.LatLng(lat, lng),
                    myOptions = {
                        zoom: 14,
                        center: myLatlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    },
                    map = new google.maps.Map( $('#' + id)[0], myOptions),
                    infowindow = new google.maps.InfoWindow( {
                        content: title
                    }),
                    marker = new google.maps.Marker( {
                        position: myLatlng,
                        title: title
                    });
                
                marker.setMap(map);
                
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
                });
               

                $('#' + id + '_fullview').magnificPopup({ 
                    items: {
                        type: 'inline',
                        src: '<div id="' + id + '_fullview_popup" class="sj_element_map_fullview_popup" style="height: '+ ($(window).height() - 100) +'px"></div>'
                    },
                    callbacks: {
                        open: function() {
                            $('#' + id + '_fullview_popup').parents('div').find('script').remove();
                            $('#' + id + '_fullview_popup').after('<script>'+ SJ.CMSFrontend.Elements.map(id + '_fullview_popup', title, lat, lng) +'</script>');
                       
                        }
                    }
                });
  
        },
        roundabout : function(id, type, duration) {
                var run_function = null;
                
                switch(type){
                    case "roundabout":
                        run_function = function() { 
                            $("#" + id).roundabout( { 
                                'autoplay'  : false
                            });
                            $("#" + id).on("click", ".roundabout-in-focus" ,function(){
                                 $("#" + id).roundabout("animateToNextChild");
                            });

                        };
                        break;
                    case "roundabout2":
                        run_function = function() { 
                            $("#" + id).roundabout( { 
                                'autoplay': true, 
                                'autoplayDuration': parseInt(duration,10) * 1000
                            });
                        };
                        break;
                }
                    
                SJ.CMSFrontend.image_loading(id,run_function,'',true);
        },
        blogpost: function(place) {
            var self = SJ.CMSFrontend.Elements,
                short_length = 500;

            SJ.Core.Validation.init_form(place + '.element-resourceblogpost ._form-new-comment');

            $(place + '.element-resourceblogpost ._blogpost-content').each(function(){
                if( $(this).text().length > short_length ) {
                    $(this).data('html', $(this).html());
                    var short_text = $(this).html().substring(0, short_length - 1) + '...(<a href="#" class="prevent-default _blogpost-show-more">' +__('show more')+ '</a>)';
                    $(this).html($(this).html('').append(short_text).html()); // Trick to close open html tags
                }
                    
                $(this).show();
                
            });
        },
        blogpost_event: function() {
            var self = SJ.CMSFrontend.Elements;
            
            $(document).on('click','.element-resourceblogpost ._blogpost-show-more',function(e) {

                var $content = $(this).parents('._blogpost-content').first();
                $content.fadeToggle(function(){
                    $content.html($content.data('html'));
                    $content.fadeToggle();
                });

            });

            $(document).on('click', '.element-resourceblogpost ._add-new-comment', function(e) {
                $(this).find('span').toggle();
                $(this).parent().parent().find('._form-new-comment').fadeToggle();
            });
        },
        coursework: function(place) {
            var self = SJ.CMSFrontend.Elements;
            SJ.Core.Validation.init_form(place + '.element-resourcecoursework ._form-new-comment');
        },
        coursework_event: function() {
            var self = SJ.CMSFrontend.Elements;

            $(document).on('click', '.element-resourcecoursework ._add-new-comment', function(e) {
                $(this).find('span').toggle();
                $(this).parent().parent().find('._form-new-comment').fadeToggle();
            });
        },
        forum: function(place) {
            var self = SJ.CMSFrontend.Elements;

            SJ.Core.Validation.init_form(place + '.element-resourceforum ._form-new-thread');
        },
        forum_event: function() {
            var self = SJ.CMSFrontend.Elements;

            $(document).on('click', '.element-resourceforum ._add-new-thread', function(e) {
                $(this).find('span').toggle();
                $(this).parent().parent().find('._form-new-thread').fadeToggle();
            });
        },
        quiz: function(place) {
            var self = SJ.CMSFrontend.Elements;
            
            SJ.Core.Validation.init_form(place + '.element-resourcequiz ._form-new-comment');

            $(place + '.element-resourcequiz ._quiz').each(function(){
                
                if( typeof $(this).data('current-question') === 'undefined') {
                    $(this).data('current-question', 1);
                }

                var current_question = parseInt($(this).data('current-question'),10),
                    all_questions = $(this).find('._question').length;

                $(this).find('._question-' + current_question).show();

                if(current_question === all_questions) {
                    $(this).find('._submit-quiz').removeAttr('disabled');
                    $(this).find('._next-quiz').attr('disabled','disabled');
                } else if(current_question < all_questions) {
                    $(this).find('._submit-quiz').attr('disabled','disabled');
                    $(this).find('._next-quiz').removeAttr('disabled');
                }

                if(current_question === 1) {
                    $(this).find('._prev-quiz').attr('disabled','disabled');
                } else {
                    $(this).find('._prev-quiz').removeAttr('disabled');
                }

            });
        },
        quiz_event: function() {
            var self = SJ.CMSFrontend.Elements;

            $(document).on('click', '.element-resourcequiz ._add-new-comment', function(e) {
                $(this).find('span').toggle();
                $(this).parent().parent().find('._form-new-comment').fadeToggle();
            });

            $(document).on('click','.element-resourcequiz ._quiz ._prev-quiz, .element-resourcequiz ._quiz ._next-quiz', function(e){
                e.preventDefault();
                var $quiz = $(this).parents('._quiz').first(),
                    current_question = parseInt($quiz.data('current-question'),10),
                    all_questions = $quiz.find('._question').length;

                if(current_question >= 1 && current_question <= all_questions) {
                    $quiz.find('._question-' + current_question).hide();
                    
                    if($(this).hasClass('_next-quiz') && (current_question < all_questions)) {
                        current_question++;
                    }

                    if($(this).hasClass('_prev-quiz') && (current_question > 1)) {
                        current_question--;
                    }


                    $quiz.data('current-question',current_question);
                    $quiz.find('._question-' + current_question).show();

                
                    if(current_question === all_questions) {
                        $quiz.find('._submit-quiz').removeAttr('disabled');
                        $quiz.find('._next-quiz').attr('disabled','disabled');
                    } else if(current_question < all_questions) {
                        $quiz.find('._submit-quiz').attr('disabled','disabled');
                        $quiz.find('._next-quiz').removeAttr('disabled');
                    }

                    if(current_question === 1) {
                        $quiz.find('._prev-quiz').attr('disabled','disabled');
                    } else {
                        $quiz.find('._prev-quiz').removeAttr('disabled');
                    }

                }

            });
        },
        wiki: function(place) {
            var self = SJ.CMSFrontend.Elements;
            
            SJ.Core.Validation.init_form(place + '.element-resourcewiki ._form-new-article');

            if($('._diff-2-content').length) {

                $(place + '.element-resourcewiki ._diff-2-content').each(function(){
            
                    var dmp = new diff_match_patch(),
                        text1 = $(this).find('._diff-2-content-text1').first().html(),
                        text2 = $(this).find('._diff-2-content-text2').first().html(),
                        d = dmp.diff_main(text1, text2);
                        
                    dmp.diff_cleanupSemantic(d);
                    dmp.diff_cleanupEfficiency(d);

                    var ds = dmp.diff_prettyHtml(d);
                    $(this).parent().find('._diff-2-content-wiki-diff').first().html(ds);
                });
            }
        },
        wiki_event: function() {
            var self = SJ.CMSFrontend.Elements;
        },
        marquee : function() {
            var self = SJ.CMSFrontend.Elements,
                $el = $('.sj_element_marquee');

            if($el.length) {
                $.each($el, function(key, value){

                        var $obj = $(this).find('.marquee'),
                            height = $obj.find('.scrollingtext').height(),
                            speed = parseInt($obj.data('speed'),10);

                        $obj.css('min-height', height + 'px');
                        //speed = (typeof speed !== 'undefined') ? speed : ( width * parseInt(Math.sqrt(width),10));

                        if (speed > 10000 && speed < 30000) {
                            speed = 30;
                        } else if ( speed >= 30000) {
                            speed = 10;
                        } else if ( speed <= 10000) {
                            speed = 60;
                        }

                        $obj.SetScroller({  
                            velocity:    speed,
                            direction:   'horizontal',
                            startfrom:   'right',
                            loop:        'infinite',
                            movetype:    'linear',
                            onmouseover: 'play',
                            onmouseout:  'play',
                            onstartup:   'play',
                            cursor:      'none'
                        });


                });
            }
        },
        marquee_event : function() {
            var self = SJ.CMSFrontend.Elements;
        }
    }

};

// Init all needed references
$(document).ready(function() {
    SJ.CMSFrontend.init();
});