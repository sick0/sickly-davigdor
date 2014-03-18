var SJ = SJ || {};

SJ.SitesDropdown = SJ.SitesDropdown || {
        menu :   null,
        width :  null,
        size :   null,
        config : {
            type: 0
        }, 
        init : function( config ) {
    
            var o = $.extend({}, SJ.SitesDropdown.config, config),
                    $this = $(this);

                    
            // Dropdown 
            $('ul.dropdown li').removeClass('down');

            // Caching selectors
            var submenu_ul = $('ul.dropdown ul');
            submenu_ul.hide().removeClass('left');
            submenu_ul.parent().addClass('more');
            submenu_ul.parent().children('a').after('<span>Show Menu</span>');

            $('ul.dropdown .more span').click(this.dropdown);

            // This page is category, so we don't open it but show submenu
            $('ul.dropdown .more.category-page>a').click(
                function(event){ 
                    var span = $(this).next('span').click();
                    return false;
                }
            );

            $('ul.dropdown').click(function(event) {
                event.stopPropagation();
            });

            $(document).click(function() {

                $('ul.dropdown ul').removeClass('left');
                $('ul.dropdown li').removeClass('down');

                $('ul.dropdown').find('ul').hide();
                $('ul.dropdown').find('ul').css('visibility', 'hidden');
            });

            this.menu = $('ul.dropdown');
            this.fit(this.menu);

            this.size = $(this.menu).width();

            $(window).resize(function(event) {
                // New width
                var width = $(this.menu).width();
                if (this.width === width) return;
                this.width = width;

                this.fit(this.menu);
            });
        },
                
        redraw: function(element){
            element = $(element);
            var n = document.createTextNode(' ');
            element.appendChild(n);
            (function(){ n.parentNode.removeChild(n); }).defer();
            return element;
        },
        dropdown: function(event) {

            var visible = $(this).next('ul').is(':visible');

            if (visible)
            {
                // Caching selectors
                var this_next = $(this).next('ul');

                this_next.removeClass('left');
                $(this).parent().parent().find('li').removeClass('down');

                this_next.hide();
                this_next.css('visibility', 'hidden');
            }
            else
            {
                // Caching selectors
                var this_parent = $(this).parent();
                var this_next_ul = $(this).next('ul');

                this_parent.parent().find('li ul').hide();
                this_parent.parent().find('li ul').removeClass('left');

                this_next_ul.css('visibility', 'visible');
                this_next_ul.css('display', 'block');

                this_parent.addClass('down');

                var width = $(this).next('ul').width();
                var menu_width = $(this).parents('ul.dropdown').width();
                var left_offset = this_next_ul.offset().left - $(this).parents('ul.dropdown').offset().left;
                var right_offset = (this_next_ul.offset().left + width) - ($(this).parents('ul.dropdown').offset().left + menu_width);

                // Start dropping left?
                if (right_offset > 0)
                {
                    this_next_ul.addClass('left');
                    if (this_parent.parent().hasClass('dropdown'))
                    {
                        // Shift if second level navigation
                        this_next_ul.css('margin-left', '-' + right_offset + 'px');
                    }
                }

            }

            event.stopPropagation();
        },

        too_much: function(menu) {
            var current = null;
            var too_much = false;
            $(menu).children('li').each(function(n, e) {
                var offset = $(e).offset().top;
                if (offset !== current && current !== null) too_much = true;
                current = offset;
            });

            return too_much;
        },

        fit: function(menu) {
            // Hide dropdowns

            $('ul.dropdown ul').hide();
            $('ul.dropdown ul').removeClass('left');
            $('ul.dropdown li').removeClass('down');

            // Remove extra if present
            $('.extra > ul > li').each(function(n, e) {
                $(e).appendTo('.dropdown');
            });
            $('.extra').remove();

            // Add extra
            if (this.too_much(menu))
            {
                $(menu).append('<li class="extra more"><a href="#">More</a><span>Show Menu</span><ul></ul></li>');

                while (this.too_much(menu))
                {
                    $('.extra').prev().prependTo('.extra > ul');
                }


                $('ul.dropdown ul').hide();
                $('ul.dropdown ul').css('visibility', 'hidden');
                $('ul.dropdown ul').removeClass('left');
                $(this).parent().removeClass('down');
                $('ul.dropdown .more span').unbind('click');
                $('ul.dropdown .more span').click(this.dropdown);
                $('ul.dropdown .extra').click(function() {
                    $(this).children('span').click();
                });
            }
        }

};