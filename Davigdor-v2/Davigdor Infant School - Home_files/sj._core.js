var SJ = SJ || {};
var __ = __ || function(str) {
    return str;
}
var i18nLang = i18nLang || 'en';

SJ.Core = SJ.Core || {
    getURLParameter: function(name, href) {
        if (typeof href === 'undefined') {
            href = location.search;
        }

        return decodeURIComponent((RegExp(name + '=' + '(.+?)(&|$)').exec(href) || [, ''])[1]);
    },
    /*
     Function to print message box
     content - message text
     opt - object parameters
     id - (if set)print message box in 'id' container or return html
     type - info, success, danger, warning - default info
     close - (0/1) show close btn (x)
     header - content header
     more - show btn with extra content in textarea
     */
    print_box: function(content, opt) {

        var options = {
            id: null,
            type: 'info',
            close: 0,
            header: '',
            more: ''
        };
        if (typeof opt !== 'undefined') {
            $.extend(options, opt);
        }

        if (typeof content !== 'undefined') {

            var print_box_id = 'print_box_' + (new Date().getTime());

            options.type = options.type.replace(/^\s+|\s+$/g, "").toLowerCase();

            if (options.type !== 'danger' && options.type !== 'success' && options.type !== 'info' && options.type !== 'warning') {
                options.type = 'info';
            }

            options.close = parseInt(options.close, 10);

            if (options.close) {
                options.close = '<button type="button" class="bs3-close" data-dismiss="alert" aria-hidden="true">&times;</button>';
            } else {
                options.close = '';
            }

            if (options.more.length > 0) {
                var more = options.more;
                options.more = '<div><span class="hide type_message"><small class="bs3-label bs3-label-default"><span>HTML</span>&nbsp; | &nbsp;<span>TXT</span></small></span><span class="btn right small ' + options.type + '">&hellip;</span><div class="clear"></div></div>';
                options.more += '<div class="more hide">';

                var closeTXT = '', closeHTML = 'hide';
                if (more.indexOf('<') !== -1) {
                    closeTXT = 'hide';
                    closeHTML = '';
                }
                options.more += '<textarea rows="4" cols="30" class="' + closeTXT + ' print_box_textarea" style="width:100%">' + more + '</textarea>';
                options.more += '<div class="' + closeHTML + ' print_box_html">' + more + '</div>';
                options.more += '</div>';
                $(document).on('click', '#' + print_box_id + '.bs3-alert div span.btn', function(e) {
                    $(this).parents('div.bs3-alert').find('div.more, span.type_message').toggle();
                    e.preventDefault();
                });
                $(document).on('click', '#' + print_box_id + '.bs3-alert div small.label', function(e) {
                    $(this).parents('div').find('.print_box_textarea, .print_box_html').toggle();
                    e.preventDefault();
                });
            }

            if (options.header.length > 0) {
                options.header = '<b>' + options.header + '</b>';
            }

            content = '<div id="' + print_box_id + '" class="bs3-alert bs3-alert-dismissable bs3-alert-' + options.type + '">' + options.close + options.header + '<p>' + content + '</p>' + options.more + '</div>';

            if (options.id !== null) {
                $(options.id).html(content);
            } else {
                return content;
            }

        }
    },
    // Load images in File manager - Outline gallery
    outline_gallery: function() {
        // Imagick fail when have to many picture to outline so we queue requests
        var delay = 0;

        $('#load_new_href ul li img').each(function() {
            var $img = $(this);

            setTimeout(function() {
                var new_href = $img.attr('new_href');
                $img.attr('src', new_href);
            }, delay);

            delay += 100;
        });
    },
    // Init popover
    popover: function() {
        // Lib Bootstrap

        $(document).on('mouseover', '._popover', function() {
            $(this).popover({
                title: "title",
                placement: "bottom",
                trigger: "hover",
                html: true
            });
        });
    },
    // Load images in File manager
    LoadImages: {
        init: function() {

            // Conteiner for filemanager and header logo image
            var conteiner = ($('.pane').length) ? '.pane #sj-content, .pane #pane_scrollcontainer' : '#sj-content';
            if ($('#lazyloading').length) {
                var $id = $(conteiner);
            }else{
                var $id = $(conteiner);
            }
            // Setting aditional spin for header logo profile picture and images in _image_preloader clas conteiner
            if($('#header-logo, .sj-nav-user, .profile_picture, ._image_preloader').length > 0){
                SJ.Core.LoadImages.load($('.sj-nav-user, .profile_picture, ._image_preloader'));
            }
                    
            if($id.length){
                SJ.Core.LoadImages.load($id);
                SJ.Core.LoadImagesLazy.init($id);
            }            
        },
        load: function($id) {

            if ($id === SJ.Core.LoadImagesLazy.$window) {
                $id = $(document);
            }

            $id.find('img:not(.rendered, .lazy)').each(function() {
                $img = $(this);

                if ( typeof $img.attr('src') !== 'undefined' && $img.attr('src') !== false) {
                    if ($img.hasClass('bs3-hide')) {
                        $img.removeClass('bs3-hide').next('i').remove();
                    }

                    $img.addClass('bs3-hide').after('<i class="fa fa-refresh fa-spin fa-2x"></i>');
                    $img.next('i').attr('title', __('Converting'));

                    $img.load(function() {                        
                        $(this).addClass('rendered').removeClass('bs3-hide').next('i').remove();                        

                        // We are reseting image dimensions because without Width and Height setted we would have
                        // Troubles with Marquee animation (it would be displayed in strange way)
			if($id.hasClass('element-text') == true || $(this).hasClass('element-marquee') == true){
                            if ( (typeof $(this).attr('width') === 'undefined' || $(this).attr('width') == 0 )
                              || (typeof $(this).attr('height') === 'undefined' || $(this).attr('height') == 0) )  {
                                $(this).removeAttr('width');
                                $(this).removeAttr('height');
                                $(this).attr('width',$(this).width());                                
                                $(this).attr('height',$(this).height());
                            }                            
                        }
                    });

                    $img.error(function() {  
                        var self = this;
                        setTimeout(function() {
                            if(self.complete == false || typeof self.complete == 'undefined' || self.naturalWidth == 0){
                                var src = $(self).attr('src').replace(/[?&]ref=[\d]+/g,'');
                                $(self).removeAttr('src').attr('src', src + ( (src.indexOf('?') >= 0 ) ? '&' : '?') + 'ref=' +  ( new Date()).getTime() );
                            }                                                        
                        }, 10000);
                    });
                }
            });
          
            setTimeout(function() {
                SJ.Core.img_refresh($id);
            }, 500);
        }
    },

    img_refresh: function($id) {
        // Check if image already loaded (Opera issue)
        $id.find('img:not(.rendered, .lazy)').each(function() {
            if (typeof $(this).attr('src') !== 'undefined' && $(this).attr('src') !== false) {
                if (this.complete && this.naturalWidth != 0) {
                    $(this).trigger("load");
                }
            }
        });
    },

    LoadImagesLazy: {
        $container: null,
        $window: $(window),
        threshold: 0,
        init: function($container, threshold) {
            var self = SJ.Core.LoadImagesLazy;

            if ($('img.lazy').length) {
                self.threshold = (typeof threshold !== 'undefined') ? parseInt(threshold, 10) : 200;
                self.$container = (typeof $container !== 'undefined' && $container.length > 0) ? $container : self.$window;


                $('img.lazy:not(.rendered)').each(function() {
                    $(this).one("appear", function() {
                        if (typeof $(this).attr('src') === 'undefined' || $(this).attr('src') === false) {
                            $(this).attr('src', $(this).data('original')).removeClass('lazy');
                            SJ.Core.LoadImages.load(self.$container);
                        }
                    });
                });

                self.$container.on('scroll resize', function() {
                    SJ.Core.LoadImagesLazy.update();
                });

                SJ.Core.LoadImagesLazy.update();
            }
        },
        update: function() {
            $('img.lazy:not(.rendered)').each(function() {
                if (!SJ.Core.LoadImagesLazy.belowthefold(this)) {
                    $(this).trigger('appear');
                }
            });
        },
        belowthefold: function(element) {
            var fold = 0,
                $container = SJ.Core.LoadImagesLazy.$container;

            if ($container === SJ.Core.LoadImagesLazy.$window) {
                fold = ($container.innerHeight() ? $container.innerHeight() : $container.height()) + $container.scrollTop();
            } else {
                fold = $container.offset().top + $container.height();
            }

            fold = fold + SJ.Core.LoadImagesLazy.threshold;

            return fold <= $(element).offset().top;
        }
    },
    KeywordsList: {
        init: function() {
            if ($('#_keywords-list').length > 0) {

                var self = SJ.Core.KeywordsList;

                // Bind events
                $('#_add-keywords-btn').on('click', function(e) {
                    e.preventDefault();
                    self.add();
                    self.update();
                });
                $('#_keywords-list').on('click', 'span._keyword.bs3-label a', function(e) {
                    e.preventDefault();
                    self.remove(this);
                    self.update();
                });
                // Enter on input should click add button
                $('input[name="keywordslist"]').on('keypress', function(e) {
                    if (e.which == 13) {
                        $('#_add-keywords-btn').click();
                        return false;
                    }
                });
            }
        },
        add: function() {
            var keywords = $('input[name="keywordslist"]').val(),
                parts = keywords.split(',');

            parts = $(parts).filter(function(el) {
                return $.trim(el).length != 0;
            }); //filter out empty strings on jQuery object for IE8 compatibility

            if (parts.length) {
                $('._no-keywords-found').remove();
                $.each(parts, function(index, value) {
                    if (!$('span._keyword[data-keyword="' + value + '"]').length) {
                        // It doesnt exist so add it
                        if (value.length > 0) {
                            $('#_keywords-list').append('<span class="_keyword bs3-label bs3-label-info" data-keyword="' + value + '">' + value + ' <a href="#"><i class="fa fa-times-circle fa-inverse"></i>&nbsp;</a></span> ');
                        }
                    }
                });
                $('input[name="keywordslist"]').val('').focus();
            }
        },
        remove: function(element) {
            $(element).closest('span').remove();
        },
        update: function() {
            // Updates the hidden input
            var keywords = [];
            if ($('span._keyword').length) {
                $('span._keyword').each(function() {
                    keywords.push($(this).data('keyword'));
                });
                var val = keywords.join(',');
                $('input[name="keywords"]').val(val);
            } else {
                // No keywords
                $('input[name="keywords"]').val('');
                if (!$('._no-keywords-found').length) {
                    $('#_keywords-list').append('<div class="_no-keywords-found"><div class="bs3-alert bs3-alert-warning bs3-alert-dismissable"><p>' + __('No keywords added.') + '</p></div></div>');
                }
            }
        }
    },
    SubjectsList: {
        init: function() {
            if ($('#_subjects-list').length > 0) {
                var self = SJ.Core.SubjectsList;

                // Bind events
                $('#_add-subject-btn').on('click', function(e) {
                    e.preventDefault();
                    self.add();
                    self.update();
                });
                $('#_subjects-list').on('click', 'span._subject.bs3-label a', function(e) {
                    e.preventDefault();
                    self.remove(this);
                    self.update();
                });
                // Enter on input should click add button
                $('select[name="subjectslist"]').on('keypress', function(e) {
                    if (e.which == 13) {
                        $('#_add-subject-btn').click();
                        return false;
                    }
                });
            }
        },
        add: function() {
            var subject_id = $('select[name="subjectslist"]').val(),
                subject = $('select[name="subjectslist"] option[value="' + subject_id + '"]').text();

            if (subject_id) {
                $('._no-subjects-found').remove();
                $('#_subjects-list').append('<span class="_subject bs3-label bs3-label-info" data-subject="' + subject_id + '">' + subject + ' <a href="#"><i class="fa fa-times-circle fa-inverse"></i></a></span> ');
                $('select[name="subjectslist"] option[value="' + subject_id + '"]').remove();
            }
        },
        remove: function(element) {
            var $remove = $(element).closest('span'),
                subject_id = $remove.data('subject'),
                subject = $remove.text();

            $remove.remove();
            $('select[name="subjectslist"]').append($('<option>', {value: subject_id}).text(subject));
        },
        update: function() {
            // Updates the hidden input
            var subjects = [];
            if ($('span._subject').length) {
                $('span._subject').each(function() {
                    subjects.push($(this).data('subject'));
                });
                var val = subjects.join(',');
                $('input[name="subjects"]').val(val);
            } else {
                // No subjects
                $('input[name="subjects"]').val('');
                if (!$('._no-subjects-found').length) {
                    $('#_subjects-list').append('<div class="_no-subjects-found"><div class="bs3-alert bs3-alert-warning bs3-alert-dismissable"><p>' + __('No subjects added.') + '</p></div></div>');
                }
            }
        }
    },
    Calendar: {
        conteiner : null,
        init: function(id, opt) {
            SJ.Core.Calendar.conteiner = ($('#sj-content').length >  0) ? '#sj-content' : 'body';    
            var options = {
                edit: false,
                events: {
                    url: '/calendar/events',
                    type: 'POST',
                    data: {
                        calendar_id: $(id).attr('data-calendars')
                    },
                    error: function() {
                        alert(__('there was an error while fetching events!'));
                    },
                    color: '#9fc6e7',
                    textColor: '#222222'
                },
                view: "month",
                left_header: 'month,agendaWeek,agendaDay,basicDay,basicWeek'
            };
            if (typeof opt !== 'undefined') {
                $.extend(options, opt);
            }

            var $id = $(id);

            $(document).click(function() {
                $('.bs3-popover').hide();
            });

            $id.fullCalendar({
                allDayText: __("All Day"),
                monthNames: [__('January'), __('February'), __('March'), __('April'), __('May'), __('June'), __('July'), __('August'), __('September'), __('October'), __('November'), __('December')],
                monthNamesShort: [__('Jan'), __('Feb'), __('Mar'), __('Apr'), __('May'), __('Jun'), __('Jul'), __('Aug'), __('Sep'), __('Oct'), __('Nov'), __('Dec')],
                dayNames: [__('Sunday'), __('Monday'), __('Tuesday'), __('Wednesday'), __('Thursday'), __('Friday'), __('Saturday')],
                dayNamesShort: [__('Sun'), __('Mon'), __('Tue'), __('Wed'), __('Thu'), __('Fri'), __('Sat')],
                ignoreTimezone: true,
                timeFormat: 'h(:mm)tt',
                defaultView: options['view'],
                header: {
                    left: options['left_header'],
                    center: 'title',
                    right: 'prev,next'
                },
                buttonText: {
                    prev: '&#x25C0;',
                    next: '&#x25B6;',
                    today: __('Today'),
                    basicDay: __('Basic Day'),
                    basicWeek: __('Basic Week'),
                    day: __('Day'),
                    week: __('Week'),
                    month: __('Month')
                },
                viewDisplay: function(view) {
                    if (view.name === 'agendaWeek' || view.name === 'agendaDay') {
                        // Remove scroll bar
                        view.setHeight(5000);
                        $('.fc-agenda-slots').css('margin-bottom', 0);
                    }

                    $('.fc-button').children().removeClass('info');
                    $('.fc-state-active').children().addClass('info');

                    SJ.Core.Calendar.optimization_view(this);
                },
                events: options['events'],
                eventRender: function(event, element) {

                    $(element).popover({
                        title: event.title,
                        content: SJ.Core.Calendar.get_content(event, options['edit']),
                        trigger: 'manual',
                        placement: SJ.Core.Calendar.conteiner === 'body' ? 'auto right' : 'auto left',
                        html: true,
                        container: SJ.Core.Calendar.conteiner
                    });

                    // Narrow column view
                    if (($id.parents('.column').length > 0)) {
                        // If parent is column and is not wider than 320px
                        if ($id.parents('.column').width() < 320) {
                            // Remove event details for clear view
                            element.children('[class*="fc-event-inner"]').empty().html('&nbsp;');
                            $id.children('.fc-header-left').remove();
                        }
                    }
                },
                eventClick: function(calEvent, jsEvent, view) {
                    jsEvent.preventDefault();
                    jsEvent.stopPropagation();
                    $('.bs3-popover').hide();
                    $(this).popover('show');
                    $popover = $('.bs3-popover');
                    $popover
                        .appendTo($(SJ.Core.Calendar.conteiner))
                        .addClass('popover-calendar');
                }

            });
            $('.fc-button-inner').removeAttr('class').addClass('btn small').children().removeAttr('class');
            $('.fc-state-active').children().addClass('info');            
        },
        get_content: function(event, edit) {
            var content = SJ.Core.Calendar.get_event_date(event);
            if (event.where !== '') {
                content += '<br><b>Where</b> ' + event.where;
            }
            if (event.description !== '') {
                content += '<br><small><em>' + event.description + '</em></small>';
            }

            if (edit === true) {
                var edit_link = '<a class="bs3-btn bs3-btn-default edit_event" href="/event/add/' + event.id + '?edit=1&start=' + (event.start_timestamp) + '">' + __('Edit') + '</a>',
                    delete_link = '<a class="use-pane bs3-btn bs3-btn-default delete_event" href="/app/event/delete/' + event.id + '?start=' + (event.start_timestamp) + '">' + __('Delete') + '</a>';

                content += '<div style="margin-top: 10px;">' + edit_link + ' ' + delete_link + '</div>';
            }

            return content;
        },
        get_event_date: function(event) {
            var days = [__('Sun'), __('Mon'), __('Tue'), __('Wed'), __('Thu'), __('Fri'), __('Sat')],
                months = [__('January'), __('February'), __('March'), __('April'), __('May'), __('June'), __('July'), __('August'), __('September'), __('October'), __('November'), __('December')],
                event_date = days[event.start.getDay()] + ', ' + event.start.getDate() + ' ' + months[event.start.getMonth()];

            event.allDay = Boolean(Number(event.allDay));

            if (!event.allDay) {
                //add the time
                var s_hour = event.start.getHours(),
                    s_mins = '' + event.start.getMinutes();
                //pad the minutes
                if (s_mins.length < 2) {
                    s_mins = '0' + s_mins;
                }

                event_date += ', ' + s_hour + ':' + s_mins;
            }

            //end date
            if (event.end !== null && event.end != event.start) {
                event_date += ' - ' + days[event.end.getDay()] + ', ' + event.end.getDate() + ' ' + months[event.end.getMonth()];
            }

            if (!event.allDay) {
                //add the time
                if (event.end != null) {
                    var e_hour = event.end.getHours(),
                        e_mins = '' + event.end.getMinutes();
                    //pad the minutes
                    if (e_mins.length < 2) {
                        e_mins = '0' + e_mins;
                    }

                    event_date += ', ' + e_hour + ':' + e_mins;
                }
            }

            if (event.allDay) {
                //event_date += ' - All Day';
            }

            return event_date;
        },
        optimization_view: function(self) {

            $(self).each(function() {

                if (($(this).parents('.column').length > 0)) {

                    if ($(this).parents('.column').width() <= 330) {
                        // Remove event details for clear view
                        $(this).find('.fc-header-title').children().css('font-size', 'small').css('font-weight', '200');
                        $(this).find('.fc-widget-header').css('font-size', 'small');
                        $(this).find('.fc-header-left').hide();
                    } else if ($(this).parents('.column').width() <= 450) {
                        // Remove event details for clear view
                        $(this).find('.fc-header-title').children().css('font-size', 'smaller').css('font-weight', '200');
                        $(this).find('.fc-widget-header').css('font-size', 'smaller');
                    }
                }
            });
        }
    },
    Datepicker: {
        init: function() {

            var date = new Date(),
                end_year = date.getFullYear(),
                start_year = end_year - 100;

            $('input.datepicker').datepicker({
                dateFormat: 'yy-mm-dd',
                beforeShow: function(input, inst) {
                    var calendar = inst.dpDiv;
                    setTimeout(function() {
                        calendar.css("z-index", "500001");
                    }, 1);
                }
            });

            $('input.datepicker-years').datepicker({
                dateFormat: 'yy-mm-dd',
                showOn: "button",
                buttonImage: "",
                buttonImageOnly: true,
                changeYear: true,
                changeMonth: true
            });

            $('input.datepicker-years-nofuture').datepicker({
                dateFormat: 'yy-mm-dd',
                showOn: "button",
                buttonImage: "",
                changeYear: true,
                changeMonth: true,
                yearRange: start_year + ':' + end_year
            });

            $('input.datepicker, input.datepicker-years, input.datepicker-years-nofuture')
                .after('<span class="fa fa-calendar add-on ui-datepicker-trigger" style="cursor:pointer"></span>');

            $(document).on('click', '.ui-datepicker-trigger', function() {
                $(this).parent().find('input.datepicker, input.datepicker-years, input.datepicker-years-nofuture').datepicker("show");
            });

            $('input.datepicker-noimage').datepicker({
                dateFormat: 'yy-mm-dd',
                beforeShow: function(input, inst) {
                    // Handle calendar position before showing it.
                    var calendar = inst.dpDiv;
                    setTimeout(function() {
                        calendar.position({
                            my: 'right top',
                            at: 'right bottom',
                            collision: 'none',
                            of: input
                        });
                    }, 1);
                }
            });

            $('input.datepicker-noimage-years').datepicker({
                dateFormat: 'yy-mm-dd',
                changeYear: true,
                changeMonth: true
            });

            $('input.datepicker-noimage-years-nofuture').datepicker({
                dateFormat: 'yy-mm-dd',
                changeYear: true,
                changeMonth: true,
                yearRange: start_year + ':' + end_year
            });

            $('input.datepicker-noimage-start').datepicker({
                dateFormat: 'yy-mm-dd',
                // beforeShow: function(input, inst) {
                //     // Handle calendar position before showing it.
                //     // It's not supported by Datepicker itself (for now) so we need to use its internal variables.
                //     var calendar = inst.dpDiv;

                //     // Dirty hack, but we can't do anything without it (for now, in jQuery UI 1.8.20)
                //     setTimeout(function() {
                //         calendar.position({
                //             my: 'right top',
                //             at: 'right bottom',
                //             collision: 'none',
                //             of: input
                //         });
                //     }, 1);
                // },
                onClose: function(selectedDate) {
                    SJ.Core.Datepicker.set_end_by_start(selectedDate, '');
                }
            });

            $('input.datepicker-noimage-end').datepicker({
                dateFormat: 'yy-mm-dd',
                // beforeShow: function(input, inst) {
                //     // Handle calendar position before showing it.
                //     // It's not supported by Datepicker itself (for now) so we need to use its internal variables.
                //     var calendar = inst.dpDiv;

                //     // Dirty hack, but we can't do anything without it (for now, in jQuery UI 1.8.20)
                //     setTimeout(function() {
                //         calendar.position({
                //             my: 'right top',
                //             at: 'right bottom',
                //             collision: 'none',
                //             of: input
                //         });
                //     }, 1);
                // },
                onClose: function(selectedDate) {
                    SJ.Core.Datepicker.set_start_by_end(selectedDate, '');
                }
            });

            $('input.datepicker-noimage-start-tommorow').datepicker({
                dateFormat: 'yy-mm-dd',
                minDate: '+1d',
                onClose: function(selectedDate) {
                    SJ.Core.Datepicker.set_end_by_start(selectedDate, '-tommorow');
                }
            });

            $('input.datepicker-noimage-end-tommorow').datepicker({
                dateFormat: 'yy-mm-dd',
                minDate: '+1d',
                onClose: function(selectedDate) {
                    SJ.Core.Datepicker.set_start_by_end(selectedDate, '-tommorow');
                }
            });
        },
        set_end_by_start: function(selectedDate, selector) {
            var date_start = new Date(selectedDate),
                date_end = new Date($('input.datepicker-noimage-end' + selector).val());

            if (date_start.getTime() > date_end.getTime()) {
                $('input.datepicker-noimage-end' + selector).val($('input.datepicker-noimage-start' + selector).val())
            }
        },
        set_start_by_end: function(selectedDate, selector) {
            var date_start = new Date($('input.datepicker-noimage-start' + selector).val()),
                date_end = new Date(selectedDate);

            if (date_end.getTime() < date_start.getTime()) {
                $('input.datepicker-noimage-start' + selector).val($('input.datepicker-noimage-end' + selector).val())
            }
        },
        date_filter: function() {

            $(document).on('click', 'input[name=period_type]', function() {
                if ($(this).val() == 2) {
                    $("select[name=date_period]").removeAttr('disabled');
                    $("input[name=date_start], input[name=date_end]").attr('disabled', 'disabled');
                } else {
                    $("select[name=date_period]").attr('disabled', 'disabled');
                    $("input[name=date_start], input[name=date_end]").removeAttr('disabled');
                }
            });

            $(document).on('click', '.ui-datepicker-trigger', function() {
                $('#period_type_1').prop('checked', false);
                $('#period_type_2').prop('checked', true);
                $("select[name=date_period]").attr('disabled', 'disabled');
                $("input[name=date_start], input[name=date_end]").removeAttr('disabled');
            });
        }
    },
    Validation: {
        init: function() {
            if (typeof $.validator !== 'undefined') {
                $.validator.addMethod("required", function(value, element, param) {
                    // check if dependency is met
                    if (!this.depend(param, element)) {
                        return "dependency-mismatch";
                    }
                    if (element.nodeName.toLowerCase() === "select") {
                        // could be an array for select-multiple or a string, both are fine this way
                        var val = $(element).val();
                        return val && val.length > 0;
                    }
                    if (this.checkable(element)) {
                        return this.getLength(value, element) > 0;
                    }
                    // Hook for Webkit Number inputs
                    if ($(element).attr('type') === 'number') {
                        if (typeof element.validity !== 'undefined' && typeof param !== 'undefined' && typeof element.validity.valueMissing !== 'undefined' && typeof element.validity.badInput !== 'undefined') {
                            if (element.validity.badInput === true) {
                                return true;
                            } else if (element.validity.valueMissing === true) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }
                    return $.trim(value).length > 0;
                }, null);

                $.validator.addMethod("number", function(value, element) {
                    //Hook for Webkit Number inputs
                    if (typeof element.validity !== 'undefined' && typeof element.validity.badInput !== 'undefined') {
                        var val = element.validity.badInput;

                        if (val) {
                            return false;
                        }
                    }
                    return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value);
                }, null);

                $.validator.addMethod("phone", function(value, element) {
                    return this.optional(element) || /^[\d+]{7,11}$/.test(value);
                }, null);

                $.extend($.validator.messages, {
                    required: __("must not be empty. Please try again."),
                    email: __("must be an email address. Please try again."),
                    url: __("must contain URL. Please try again."),
                    number: __("must be numeric. Please try again."),
                    phone: __("must be a phone number without spaces. Please try again.")
                });

                /*
                 *  Function to resolve name input/select/textarea from list with errors
                 **/
                if ($("._form-error-list").val()) {

                    var _form_error_list = $.parseJSON($("._form-error-list").val()),
                        $form_with_errors = $('form#' + _form_error_list.form_id);

                    $("._form-error-list").parents('p').first().html('<b>' + $form_with_errors.find('h3').html() + '</b><br>' + $("._form-error-list").parents('p').first().html());

                    $.each(_form_error_list.list_errors, function(index, value) {

                        var $field = $form_with_errors.find("[name='" + value + "']").first().addClass("bs3-has-error");

                        if (!$field.parents("div.bs3-form-group").first().hasClass("bs3-has-error")) {
                            $field.parents("div.bs3-form-group").first().addClass("bs3-has-error");
                        }
                    });
                }

                /*
                 *  Function to remove error class from focused input/select/textarea
                 **/
                $(document).on('focus', 'form .error', function() {
                    if ($(this).hasClass("bs3-alert-danger") == false) {
                        $(this).removeClass("bs3-has-error");
                    }
                    if ($(this).parents("div.bs3-form-group").first().hasClass("bs3-has-error")) {
                        var $error_div = $(this).parents('.bs3-form-group').first();
                        $error_div.removeClass('bs3-has-error');
                        $error_div.find('p.bs3-help-block').remove();
                    }
                });

            }
        },
        init_form: function(id) {
            if (typeof $.validator !== 'undefined') {

                $(id).each(function() {
                    $(this).validate({
                        onfocusout: false,
                        onkeyup: false,
                        success: function(label, element) {
                            var $error_div = $(element).parents('.bs3-form-group').first();
                            $error_div.removeClass('bs3-has-error');
                            $error_div.find('p.bs3-help-block').remove();
                        },
                        errorPlacement: function(error, element) {
                            var $error_div = $(element).parents('.bs3-form-group').first();
                            $error_div.addClass('bs3-has-error');
                            
                            if (!$error_div.find('p.bs3-help-block').length && (error.length > 0) && (typeof error[0].innerHTML !== 'undefined') && (error[0].innerHTML.length > 0)) {
                                
                                var name = __('Field'),
                                    err_info = '<p class="bs3-help-block bs3-text-danger">' + name + ' ' + error[0].innerHTML + '</p>';
                                // $(document).find('.bs3-has-error .bs3-text-danger').hide();
                                if ($(element).parent().find('*').length > 1) {
                                    $(element).parent().parent().append(err_info);
                                } else {
                                    $(element).parent().append(err_info);
                                }

                            }

                        },
                        invalidHandler: function(event, validator) {
                            var errors = validator.numberOfInvalids(),
                                $form = $(event.target),
                                $valid_form = $form.closest('._validation-form'),
                                message = '';

                            if (errors) {
                                $(document).find('.bs3-has-error').removeClass('bs3-has-error').find('.bs3-help-block').remove();
                                $(document).find('._validation-form .bs3-alert-danger').remove();


                                var form_header = '';
                                if ($valid_form.find('h3').length) {
                                    form_header = ': <b>' + $valid_form.find('h3').html() + '</b>';
                                }

                                var fieds = validator.invalidElements(),
                                    err_message = __('There was a problem processing the form') + form_header + '<br>';

                                for (var i = 0; i < errors; i++) {
                                    var $label = ($form.find("label[for='" + fieds[i].name + "']").length) ? $form.find("label[for='" + fieds[i].name + "']") : $(fieds[i]).parents('.bs3-form-group').find('label').first(),
                                            field_name = $label.text();

                                    if (field_name == __('Please enter the letters above')) {
                                        field_name = __('Captcha');
                                    }

                                    err_message += '<b>' + field_name + '</b> - ' + validator.errorMap[fieds[i].name] + '<br>';
                                    $label.parent().addClass('bs3-has-error');
                                }

                                message = SJ.Core.print_box(err_message, {type: 'danger', close: 1});
                                $($form).prepend(message);
                            }
                        },
                        submitHandler: function(form) {
                            if ($(form).parents('.ajax-container').length) {
                                $(form).removeClass('_validation-form').find('[type="submit"]').trigger('click');
                            } else {
                                
                                if($(form).attr('_already_sent') == 'true'){
                                    return false;
                                }

                                $(form).attr('_already_sent', 'true');
                                
                                // Use the native submit method of the form element
                                form.submit();
                           }
                        }
                    });
                });

            }
        },
        check_form: function(id) {
            var valid = true;
            $(id).find('[required], [type="url"], [maxlength], [minlength]').each(function() {
                if ($(this).attr('placeholder') === $(this).val()) {
                    $(this).val('');
                }

                if ($(this).hasClass('compact_editor')) {
                    tinymce.activeEditor.save();
                }

                var test = $(this).valid();
                if (test == false) {
                    valid = false;
                }
            });
            return valid;
        }
    },
    CompactEditor: {
        /* If you want use CompactEditor you must add class="compact_editor" to textarea */
        init: function() {
            // load TinyMCE crossdomain
            // http://www.tinymce.com/wiki.php/How-to_load_TinyMCE_crossdomain
            // if(document.location.host.match(/\.(sites|messages|resources|forum)\./i)) {
            //     document.domain = document.location.host.replace(/^.*\.(sites|messages|resources|forum)\./i, '');
            // }

            var static_url = $('meta[name="static_url"]').attr('content') + "vendor/tinymce_dev/plugins/",
                ver = '4.0.10';

            if ($('.compact_editor').length > 0) {
                // If we init inited teaxtareas we first must save content
                if (tinymce.activeEditor !== null) {
                    tinymce.activeEditor.save();
                }

                tinymce.init({
                    selector: '.compact_editor',
                    height: 'auto',
                    language: (i18nLang === 'en-gb' || i18nLang === 'en-us' || i18nLang === 'xx-xx') ? 'en' : i18nLang,
                    inline: false,
                    menubar: false,
                    statusbar: false,
                    relative_urls: false,
                    schema: "html5",
                    browser_spellcheck: true,
                    theme: "sj2",
                    skin: "sj2_bs3",
                    image_advtab: true,
                    toolbar_items_size: 'small',
                    invalid_elements: "script",
                    content_css: $('meta[name="static_url"]').attr('content') + "css/default.css?v=" + ver,
                    external_plugins: {
                        "advlist": static_url + "advlist/plugin.js?v=" + ver,
                        "textcolor": static_url + "textcolor/plugin.js?v=" + ver,
                        "sj2_autolink": static_url + "sj2_autolink/plugin.js?v=" + ver,
                        "sj2_paste": static_url + "sj2_paste/plugin.js?v=" + ver
                    },
                    style_formats: [
                        {title: 'Headers', items: [
                                {title: 'Header 1', format: 'h1'},
                                {title: 'Header 2', format: 'h2'},
                                {title: 'Header 3', format: 'h3'},
                                {title: 'Header 4', format: 'h4'},
                                {title: 'Header 5', format: 'h5'},
                                {title: 'Header 6', format: 'h6'}
                            ]},
                        {title: 'Inline', items: [
                                {title: 'Strikethrough', icon: 'strikethrough', format: 'strikethrough'},
                                {title: 'Superscript', icon: 'superscript', format: 'superscript'},
                                {title: 'Subscript', icon: 'subscript', format: 'subscript'},
                                {title: 'Code', icon: 'code', format: 'code'}
                            ]},
                        {title: 'Blocks', items: [
                                {title: 'Paragraph', format: 'p'},
                                {title: 'Blockquote', format: 'blockquote'},
                                {title: 'Pre', format: 'pre'}
                            ]}
                    ],
                    toolbar: "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | styleselect fontselect fontsizeselect forecolor backcolor removeformat"
                });
            }

        }

    },
    Form: {
        init: function() {
            $('._sj_multiple_save_prevent').each(function() {
                $(this).submit(function(e) {

                    // Don't submit multiple times
                    e.preventDefault();

                    // Use the native submit method of the form element
                    this.submit();

                    var curent_form = this;

                    // Disable buttons
                    $("button[type='submit']", curent_form).each(function() {
                        $(this).button('loading');
                    });
                });
            });
        }
    },
    ShareView: {
        init: function() {
            if ($('#share-table').length) {
                // Share add
                $(document).on('updated', 'input[name="userrule"]', function() {
                    var userrule_id = $('input[name=userrule]').val(),
                        summary = $('input[name=nice_userrule]').val(),
                        html = '';

                    // Add the row
                    html += '<tr>';
                    html += '<td>';
                    html += '<input type="checkbox" class="userrule_id" name="userrule_ids[]" value="' + userrule_id + '">';
                    html += '</td>';
                    html += '<td>' + summary + '</td>';
                    html += '<td>';
                    html += '<select class="bs3-form-control" name="edit[' + userrule_id + ']">'
                    html += '<option value="0" selected="selected">' + __('View Only') + '</option>';
                    html += '<option value="1">' + __('Edit and View') + '</option>';
                    html += '</select>';
                    html += '<input type="hidden" name="userrules[]" value="' + userrule_id + '">';
                    html += '</td>';
                    html += '</td>';
                    html += '</tr>';

                    $('#share-table tr:last').after(html);

                    // If there is a no user message then hide
                    $('#share-table #no-user-message').addClass('bs3-hide');

                });

                // Share del
                $(document).on('click', '#unshare', function() {
                    $('#share-table input:checked').not('.select_all').parents('tr').remove();

                    if ($('#share-table tbody tr').length === 1) {
                        $('#share-table #no-user-message').removeClass('bs3-hide');
                    }
                });
            }
        }
    },
    Browsers: {
        isIe: function() {
            if( $.browser.msie ){
                return true;
            }
            return false;
        },
        isVersionAtLeast: function(expected_version){
            var actual_version = parseInt($.browser.version);
            if(actual_version >= expected_version){
                return true;
            }
            return false;
        }
    }

};


// Init all needed references
$(document).ready(function() {
    // Activate App bar tooltips - Requires bootstrap.js
    // Take me out about 1-2 months after the release!
    // Not working properly, they are getting activated by dropdowns!
    // if ($().tooltip) {
    //     $('.sj-nav-home, .sj-app-title-name, .sj-app-title-switcher').tooltip({
    //         html: true,
    //         delay: { show: 500, hide: 100 }
    //     });

    //     $('.sj-app-title').on('show.bs.bs3-dropdown', function () {
    //         $('.sj-app-title-switcher').tooltip('destroy');
    //         $('.sj-app-title .bs3-tooltip').remove();
    //     });

    //     $('.sj-app-title').on('hide.bs.bs3-dropdown', function () {
    //         $('.sj-app-title-switcher').tooltip({
    //             'html': true
    //         });
    //     })
    // }

    /**
     * Function error handler
     **/
    $(document).ajaxError(function(jqXHR, error, errorThrown) {
        var message, header;

        if (!error.status) {
            return;
        }

        var statusErrorMap = {
            '400': __("Server understood the request but request content was invalid"),
            '401': __("Unauthorised access"),
            '403': __("Forbidden - resource can't be accessed"),
            '404': __("Page or file not found"),
            '500': __("Internal Server Error"),
            '503': __("Service Unavailable")
        };
        message = statusErrorMap[error.status];
        if (!message) {
            message = __("Unknown Error");
        }

        if (error.status == 401) {
            SJ.session_expired_counter_down = 5;
            message = __('Your session has expired! <br>You will be redirected to login page in ') + '<b><span id="session_expired_counter_down">' + SJ.session_expired_counter_down + '</span> sec. </b>';
            message = SJ.Core.print_box(message, {type: 'warning', header: __('Information')});
            header = 'Session Expired';

            SJ.session_expired_timeout = function() {
                $("#session_expired_counter_down").html(SJ.session_expired_counter_down);
                SJ.session_expired_counter_down = (SJ.session_expired_counter_down > 0) ? SJ.session_expired_counter_down - 1 : 0;
                if (SJ.session_expired_counter_down === 0) {
                    window.location.reload();
                } else {
                    setTimeout("SJ.session_expired_timeout()", 1000);
                }
            }
            setTimeout("SJ.session_expired_timeout()", 1);

        } else if (error.status == 403) {
            message = SJ.Core.print_box(message, {type: 'warning', header: __('Information')});
            header = __('Forbidden access');

        } else {
            message = SJ.Core.print_box(message, {type: 'danger', header: __('Error'), more: error.responseText});
            header = __('Error');
        }

        if ($('.pane.pane-loaded').length > 0) {
            $('.pane-next').remove();
            $('.pane .actions').addClass('hide');
            $('.pane-content').removeClass('has-header').html(message);
        } else {
            message = '<div class="page-header"><h2>' + header + '</h2></div><div class="pane-content">' + message + '</div>';
            SJ.Pane.fill(message);
        }
    });

    // If using the ajax request then do this
    $(document).on('click', '.ajax-container a, .ajax-container input[type="submit"], .ajax-container button', function(event) {

        var ignore_classes = ['prevent-default', 'use-pane', 'just-link', 'close'],
            use_ajax = true;

        for (i in ignore_classes) {
            if ($(this).hasClass(ignore_classes[i])) {
                use_ajax = false;
            }
        }

        // Ignore tinyMCE buttons
        if ($(this).parents('.mce-tinymce').length) {
            use_ajax = false;
        }

        // Ignore validation form
        var $form = $(this).parents('._validation-form');
        if ($form.length) {
            use_ajax = false;
            valid = SJ.Core.Validation.check_form($form);
            if (valid == false) {
                event.stopImmediatePropagation();
                event.preventDefault();
                return false;
            }

        }


        if (use_ajax) {
            event.preventDefault(); // Only when we use ajax
            var href = '',
                method = '',
                data = '',
                back = '',
                id = Math.floor((Math.random() * 1000) + 1),
                $container = $(this).parents('.ajax-container').first();

            // If pane have CompactEditor - first must save content to hidden textarea
            if ($container.find('.compact_editor').length) {
                tinymce.activeEditor.save();
            }

            if ($(this).is('button') || $(this).is('input[type="submit"]')) {
                href = $(this).parents('form').attr('action');
                method = 'POST';
                data = $(this).parents('form').serializeArray();
                data.push({name: $(this).attr('name'), value: $(this).val()});
            }

            if ($(this).is('a')) {
                href = $(this).attr('href');
                method = 'GET';
            }

            back = SJ.Core.getURLParameter('back', href);

            $container.attr('id', id);
            $container.prepend('<div class="ajax-container-loading"><i class="fa fa-spinner fa-spin"></i></div>');

            $.ajax({
                url: href,
                data: data,
                type: method,
                cache: false, // In issue IE8 Bug #11231  
                success: function(data) {
                    $container.html(data);

                    if ($('.pane').is(':visible')) {

                        SJ.Pane.Load.run_queue();

                    } else {

                        SJ.Core.CompactEditor.init();
                        SJ.CMSFrontend.Elements.init();

                    }

                },
                complete: function(data, status) {
                    $container.find('.ajax-container-loading').remove();

                    if (back.length) {
                        if ($('.pane').is(':visible')) {
                            if (!$('.pane .page-header .btn.pane-back, .ajax-container-back').length) {
                                $('.pane .page-header').prepend('<a class="sj-pane-back ajax-container-back" data-id-container="' + id + '" href="' + back + '"><i class="fa fa-chevron-left"></i></a>');
                            } else {
                                if (typeof $('.pane .page-header .btn.pane-back, .ajax-container-back').data('id-container') !== 'undefined') {
                                    $('.pane .page-header .btn.pane-back').data('id-container', $container.attr('id'));
                                }
                            }
                        } else {
                            $container.find('h1, h2, h3, h4, h5').first().prepend('<a class="ajax-container-back" href="' + back + '"><i class="fa fa-reply-all"></i></a> ');
                        }
                    } else {
                        if ($('.pane').is(':visible')) {
                            $('.pane .page-header .bs3-btn.pane-back').remove();
                        } else {
                            $container.find('.btn.ajax-container-back').remove();
                        }

                    }
                }
            });

        }
    });

    $(document).on('click', 'a.ajax-container-back', function(event) {
        event.preventDefault();

        var href = $(this).attr('href');

        if ($('.pane').is(':visible')) {
            $(this).remove();
        }

        $('.pane .page-body .ajax-container').append('<a id="link-to-refresh" href="' + href + '"></a>');
        $('#link-to-refresh').trigger('click');
    });


    $(document).on('click', 'a.ajax-container-refresh', function(event) {
        event.preventDefault();

        var id = $(this).data('id-container'),
            href = $(this).attr('href');

        $('#' + id).append('<a id="link-to-refresh" href="' + href + '"></a>');
        $('#link-to-refresh').trigger('click');
    });


    // Function to toggle filter etc..
    $(document).on('click', '*[data-toggle-div]', function(event) {
        var selector = $(this).attr('data-toggle-div');
        $(selector).slideToggle();
        event.preventDefault();
    });


    if (jQuery().placeholder) {
        $(":input[placeholder]").placeholder();
    }

    // Init for pane
    if (typeof SJ.Pane !== 'undefined') {
        SJ.Pane.Load.add(SJ.Core.KeywordsList.init);
        SJ.Pane.Load.add(SJ.Core.SubjectsList.init);
        SJ.Pane.Load.add(SJ.Core.CompactEditor.init);
        SJ.Pane.Load.add(SJ.Core.Datepicker.init);
        SJ.Pane.Load.add(SJ.Core.LoadImages.init);
    }
    //init for normal pages
    SJ.Core.KeywordsList.init();
    SJ.Core.SubjectsList.init();
    SJ.Core.CompactEditor.init();
    SJ.Core.Datepicker.init();
    SJ.Core.Validation.init();
    SJ.Core.LoadImages.init();
    SJ.Core.popover();
    SJ.Core.ShareView.init();
    SJ.Core.Form.init();
});
