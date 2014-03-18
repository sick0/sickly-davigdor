var SJ = SJ || {};
var __ = __ || function(str) { return str; }

SJ.Dropdown = SJ.Dropdown || {
    options : {
        arrows : false,
        more : __('More'),
        type : 'click',
        selector : '.dropdown'
    },
    redraw: function(element){
        element = $(element);
        var n = document.createTextNode(' ');
        element.appendChild(n);
        (function(){n.parentNode.removeChild(n)}).defer();
        return element;
    },

    show: function(event, $ul) {
        if(event !== null) {
            $ul = $(this).closest('li').children('ul');
            event.stopPropagation();
        }

        var selector = SJ.Dropdown.options.selector;
        var $menu = $ul.closest('ul'+selector);
        var $li = $ul.closest('li');

        // Close all other menu on the same level
        SJ.Dropdown.hide(null, $ul.parent().siblings().find('ul')); 

        // Show this menu
        $ul
            .removeClass('left')
            .css('visibility', 'visible')
            .css('display', 'block');
        $li.addClass('down');

        var width = $ul.width();
        var menu_width = $menu.width();
        var left_offset = $ul.offset().left - $menu.offset().left;
        var right_offset = ($ul.offset().left + width) - ($menu.offset().left + menu_width);

        // Start dropping left?
        if (right_offset > 0) {
            $ul.addClass('left');
            // Shift if second level navigation
            if ($li.parent().is(selector)) {
                $ul.css('margin-left', '-' + right_offset + 'px');
            }
        };
    },

    hide: function(event, $ul) {
        if(event !== null) {
            $ul = $(this).closest('li').children('ul');
        }
        
        $($ul).each(function() {
            $(this)
                .removeClass('left')
                .hide()
                .css('visibility', 'hidden')
                .closest('li')
                    .removeClass('down');
        });
    },

    toggle: function(event) {
        var $ul = $(this).closest('li').children('ul');

        if ($ul.is(':visible')) {
            SJ.Dropdown.hide(null, $ul);
        }
        else {
            SJ.Dropdown.show(null, $ul);
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
        // Hide all menu
        this.hide(null, menu.find('ul'));

        // Remove extra if present
        menu.find('.extra > ul > li').each(function(n, e) {
            $(e).appendTo(menu);
        });
        menu.find('.extra').remove();

        // Add extra
        if (this.too_much(menu))
        {
            var span = '';
            if(this.options.arrows || this.options.type === 'click') {
                // Show arrows
                var span = '<span>' + __('Show Menu') + '</span>';
            }
            $(menu).append('<li class="extra more"><a href="#">'+this.options.more+'</a>'+span+'<ul></ul></li>');

            while (this.too_much(menu))
            {
                menu.find('.extra').prev().prependTo('.extra > ul');
            }

            // Hide all menu once again
            this.hide(null, menu.find('ul'));

            // More should open on click
            if(this.options.type === 'click') {
                menu.on('click', '.extra', this.toggle);
            }
        }
    },

    init: function(options) {
        // Options
        if(options !== undefined) {
            $.extend(this.options, options);
            if(this.options.type === 'hover') {
                this.options.event = 'mouseenter';          }
            else {
                this.options.event = this.options.type;
            }
        }

        // Closure
        var that = this;

        // Dropdown

        var $menu = $('ul'+this.options.selector);

        var $li = $menu.find('li');
        var $ul = $menu.find('ul');

        this.hide(null, $ul);
        $ul.parent().addClass('more');

        // Show arrows
        if(this.options.arrows || this.options.type === 'click') {
            $ul.parent().children('a').after('<span>' + __('Show Menu') + '</span>');
        }

        $menu.find('.more, .more span').off('click mouseenter mouseleave');
        if(this.options.type === 'hover') {
            $menu.on('mouseenter', '.more', this.show);
            $menu.on('mouseleave', '.more', this.hide);
        }
        else {
            $menu.on('click', '.more span', this.toggle);
        }

        $menu.on('click mouseenter mouseleave', function(event) {
            event.stopPropagation();
        });

        $(document).on('click', function() {
            that.hide(null, $menu.find('ul'));
        });

        if(this.options.more) {
            // Show 'More'
            this.fit($menu);

            var old_width = $menu.width();
            // Watch window resize
            $(window).resize(function(event) {
                // New width
                var width = $($menu).width();
                if (width != old_width) {
                    // If width has changed, fit once again
                    that.fit($menu);
                    old_width = width;
                }
            });
        }
    }
}

/*
$(function() {
    // Show on click
    //SJ.Dropdown.init();

    // Show on hover not after click
    //SJ.Dropdown.init({type:'hover'});

    // Show on hover with spans - arrows
    //SJ.Dropdown.init({type:'hover',arrows:true});

    // Do not show 'More' menu
    //SJ.Dropdown.init({more:false});

    // Change title of 'More' menu
    //SJ.Dropdown.init({more:'All about us'});

    // Defaults to .dropdown, ul is prepended automaticaly
    //SJ.Dropdown.init({selector:'.dropdown2'}); 
});
*/
