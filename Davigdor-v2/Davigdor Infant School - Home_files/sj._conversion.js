var SJ = SJ || {};
var __ = __ || function(str) { return str; }

SJ.Conversion = SJ.Conversion || { 

        _monitor : function(id, id_file, type) {
                var params = {
                        "file_id" : id_file,
                        "timestamp"  : $.now() // Hook for IE
                    };

                $.get('/status', params, function(data) {

                    if (data > 0 || data == -1) {
                        if($('#resources_render').length === 0) {
                            // Update element
                            var params = { 'has_submenu': ($('body.has-side-menu').length) ? 1 : 0 };
                            // We must get id from element
                            id = $("#sj_element_processing_" + id).parents('.element').first().attr('id').replace('element_','');
                          
                            $.post('/admin/ajax/refresh/' + id, params, function(data) {                     
                                    $('#element_' + data.id).html(data.render);
                                    SJ.CMS.Elements.init(id);
                            }, 'json');
                        } else {
                            $.post('/show/' + type + '/' + id, function(data) {
                                $('#resources_render').html(data);
                            });
                        }

                    } else {
                        setTimeout(function() { 
                            if(type === 'document') { 
                                SJ.Conversion.Document.init(id, id_file);
                            } else { 
                                SJ.Conversion.Media.init(id, id_file); 
                            }
                        }, 5000);
                    }

                });

        },


        Media : {
      
            init: function(id, id_file) { 

                if ( $('#sj_element_processing_' + id).length > 0 ) {
                    SJ.Conversion._monitor(id, id_file, 'media');
                } else {
                    if(typeof MediaElement !== 'undefined') {
                        // Hook on fullscreen - disable <= IE8
                        var fullscreen = ['playpause','progress','current','duration','tracks','volume','fullscreen'],
                            id_long = '#sj_element_media_' + id;

                        if(typeof $.browser.msie !== 'undefined' && parseInt($.browser.version,10) <= 8) {
                            fullscreen = ['playpause','progress','current','duration','tracks','volume'];
                        }

                        $(id_long).mediaelementplayer({
                            pluginVars: 'isvideo=true',
                            enablePseudoStreaming: true,
                            enableAutosize: true,
                            plugins: ['flash'],
                            features: fullscreen,
                            customError: "<div style='text-align:center'><a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a></div>",
                            flashName: 'flashmediaelement-cdn.swf',
                            playpauseText : __('Play/Pause'),
                            muteText : __('Mute'),
                            fullscreenText : __('Fullscreen'),
                            postrollCloseText : __('Close'),
                            tracksText : __('Captions/Subtitles')
                        });
                    }

                }

            }

        },  

        Document : {
      
            toolbar_flexpaper : null,

            init: function(id, id_file) { 

                if ( $('#sj_element_processing_' + id).length > 0 ) {
                    SJ.Conversion._monitor(id, id_file, 'document');
                } else {
                    if(typeof $FlexPaper !== 'undefined') {
                        if (SJ.Conversion.Document.toolbar_flexpaper == null) {
                            jQuery.get(( ! window.isTouchScreen)?'/ui/vendor/flexpaper/UI_flexpaper_desktop.html':'/ui/vendor/flexpaper/UI_flexpaper_mobile.html',
                                function(toolbarData) { 
                                    SJ.Conversion.Document.toolbar_flexpaper = toolbarData;
                                    SJ.Conversion.Document.init_flexpaper(id); 
                                }
                            );
                        } else {
                            SJ.Conversion.Document.init_flexpaper(id); 
                        }
                    }
                }

            },

            init_flexpaper : function(id) {
                var id_long = 'sj_element_document_' + id,
                    wmode = 'transparent', 
                    rendering_order = "flash, html5";

                if(navigator.platform.indexOf("Linux") === 0 && navigator.userAgent.indexOf("Firefox") > 0) {
                    var elem = document.createElement('canvas');
                    if ( ! elem.getContext ) {
                        if(swfobject.hasFlashPlayerVersion("1")) {
                            $('#' + id).parents('.sj_element_document').find('.cms-element-placeholder-flash').removeClass('hide');
                        }
                    }
                    
                    wmode = 'window'; // Hook for Linux platform because wmode transparent crash flash browser
                    rendering_order = "flash";
                }

                var swffile = $("#" + id_long).data('swf'),
                    pdffile = $("#" + id_long).data('pdf'),
                    toolbarContent = SJ.Conversion.Document.toolbar_flexpaper;
                
                toolbarContent = toolbarContent.replace(/documentViewer/g, id_long);

                $('#' + id_long).FlexPaperViewer( { config : {

                    SWFFile : swffile,
                    PDFFile : pdffile,
                    Scale : 0.9,
                    ZoomTime : 0.5,
                    ZoomInterval : 0.1,
                    FitPageOnLoad : false,
                    FitWidthOnLoad : true,
                    localeChain : "en_US",
                    FullScreenAsMaxWindow : false,
                    ProgressiveLoading : false,
                    MaxZoomSize : 5,
                    MinZoomSize : 0.2,
                    SearchMatchAll : false,
                    Toolbar : toolbarContent,
                    InitViewMode : "Portrait",
                    
                    ViewModeToolsVisible : true,
                    ZoomToolsVisible : true,
                    NavToolsVisible : true,
                    CursorToolsVisible : false, // Off because in html5 with jquery 1.9 crash browser
                    SearchToolsVisible : true,
                    
                    RenderingOrder : rendering_order,

                    WMode : wmode,
                    
                    jsDirectory : "/ui/vendor/flexpaper/js/",
                    cssDirectory : "/ui/vendor/flexpaper/css/",
                    localeDirectory : "/ui/vendor/flexpaper/locale/",
                    key : "@0449b830f5c159b5267$5a12d9944bf1b62d3a5"
                }});
                // Disable printing in Chrome and in Safari issue 13724
                                               
                if (navigator.userAgent.indexOf("Chrome") > 0 || navigator.userAgent.indexOf("Safari") > 0) {
                    $('.flexpaper_bttnPrint').hide();
                }

                $('#' + id_long).bind('onDocumentLoaded',function(e,totalPages){
                    if( ! window.isTouchScreen) { 
                        $('#sj_element_document_link_' + id).addClass('hide'); // If loaded document hide this link
                    }
                });

                $('#' + id_long).bind('onDocumentLoadedError',function(e,totalPages){
                    var msg = SJ.Core.print_box( __('Error loading document') + '. ' + __('Please use download button') + '.', { type: 'warning', header: __('Information'), close: 1 });
                    $(this).parents('.sj_element_document_container').first().removeAttr('style').html(msg);
                });

            }

        }
};


// Init all needed references
$(document).ready(function() {

});


