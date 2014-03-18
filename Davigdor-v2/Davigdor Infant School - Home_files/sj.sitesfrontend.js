var SJ = SJ || {};
var __ = __ || function(str) { return str; }

SJ.SitesFrontend = SJ.SitesFrontend || {
  
    init : function() {
        // Comments functions
        $(document).on('click', '.sj_show_more_comments', function(e) {
            var element_hash = $(this).closest('.element').find('input[name=hash]').val(),
                offset = $(this).attr('data-offset');

            $.getJSON('/comments/more/'+offset+'/'+element_hash, function(data) {
                if (data.status == 1) {
                    var $element = $('input[name=hash][value='+data.hash+']').closest('.element').find('.sj_comments_initial');
                    $element.find('.sj_show_more_comments').remove();
                    $element.append(data.html);
                }
            });

            e.preventDefault();
        });

        $('.sj_show_comments').click(function(e) {
           $(this).parent('.sj_comments').find('.sj_comments_initial').show();
           $(this).remove();
           e.preventDefault();
        });
    }
};

// Init all needed references
$(document).ready(function() {

    SJ.SitesFrontend.init();
    
});