$(document).ready(function(){
    if(!$("#nav-side ul li a").length) {
        $("body").removeClass("has-side-menu");
        $("#content").css({"width":"930px","padding":"0px"});
    }

});


 $(document).ready(function () {

$("#nav-mobile #nav-more").click( function() {
$(this).next("ul").stop(true,true).fadeToggle("fast");
});

});


$(function() {
    $('#nav-side ul li a').each(function() {
        $(this).attr('href', $(this).attr('href')+'#top');
    });
});




  $(function() {
// Show on click
//SJ.Dropdown.init();

// Show on hover not after click
SJ.Dropdown.init({type:'hover'});

// Show on hover with spans - arrows
//SJ.Dropdown.init({type:'hover',arrows:true});

// Do not show 'More' menu
//SJ.Dropdown.init({more:false});

// Change title of 'More' menu
//SJ.Dropdown.init({more:'All about us'});

// Defaults to .dropdown, ul is prepended automaticaly
//SJ.Dropdown.init({selector:'.dropdown2'});
});

 $(function(){
                        $('.fadein img:gt(0)').hide();
                        setInterval(function(){
                          $('.fadein :first-child').fadeOut(3000)
                             .next('img').fadeIn()
                             .end().appendTo('.fadein');}, 
                          9000);
                    });

        $(function(){
                        $('.fadeinp p:gt(0)').hide();
                        setInterval(function(){
                          $('.fadeinp :first-child').fadeOut(6000)
                             .next('p').fadeIn()
                             .end().appendTo('.fadeinp');}, 
                          10000);
                    });
