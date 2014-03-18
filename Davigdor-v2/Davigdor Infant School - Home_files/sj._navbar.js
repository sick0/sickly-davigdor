/*
 *
 *  Navbar hover effects - quick and dirty, will tidy up at some stage
 *
 */

$(document).ready(function() {
    $(".sj-app-title-name").hover(
            function() {
                $(".sj-app-title-name").addClass("sj-app-title-hover-full");
                $(".sj-app-title-switcher").addClass("sj-app-title-hover-half");
            }, function() {
                $(".sj-app-title-name").removeClass("sj-app-title-hover-full");
                $(".sj-app-title-switcher").removeClass("sj-app-title-hover-half");
            }
    );
    $(".sj-app-title-switcher").hover(
            function() {
                $(".sj-app-title-name").addClass("sj-app-title-hover-half");
                $(".sj-app-title-switcher").addClass("sj-app-title-hover-full");
            }, function() {
                $(".sj-app-title-name").removeClass("sj-app-title-hover-half");
                $(".sj-app-title-switcher").removeClass("sj-app-title-hover-full");
            }
    );
});