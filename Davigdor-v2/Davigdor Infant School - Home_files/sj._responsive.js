/*
 *
 *  Add Viewport meta tag if it is an iPad
 *
 */

// Test to detect for tablets
function addViewportTag() {

    // Set viewport tag
    var viewPortTag = document.createElement('meta');
    viewPortTag.id = "viewport";
    viewPortTag.name = "viewport";
    viewPortTag.content = "initial-scale = 1.0, maximum-scale = 1.0, user-scalable = no, width = device-width";
    document.getElementsByTagName('head')[0].appendChild(viewPortTag);
}

/*
 *
 *  DIV hide/show
 *
 */

function addRotationDiv() {
    // Display overlay
    $(".layout").before("\
        <div class='sj-ipadPortraitNotice'>\n\
        <h1>Device Orientation</h1>\n\
        <hr>\n\
        <p>Please rotate your iPad to landscape to use School Jotter.</p>\n\
        <p>If rotation is not working please check that the rotation lock<br>is not enabled using the side switch or via Control Center.</p>\n\
        </div>");
    $(".sj-ipadPortraitNotice").hide();

}/*
 *
 *  DIV table overflow
 *
 */

function addTableOverflowDiv() {

    $(".bs3-table").wrap("<div class='sj-overflow'></div>");

}

// Add blocking div
function displayOverlay() {

    // Hide main content
    $(".layout").hide();
    $(".sj-ipadPortraitNotice").show();
}

// Remove blocking div
function removeOverlay() {

    $(".sj-ipadPortraitNotice").hide();
    $(".layout").show();
}

/*
 *
 *  Check for orientation
 *
 */

function checkMode() {
    var o = window.orientation;

    if (o != 90 && o != -90) {
        displayOverlay();
    } else {
        removeOverlay();
    }
}

/*
 *
 *  Get things started
 *
 */
var isiPad = navigator.userAgent.match(/iPad/i) !== null;

if (isiPad) {

    checkMode();
// check orientation on page load
    addViewportTag();

    $(document).ready(function() {
        addRotationDiv();
        addTableOverflowDiv();

        // Crappy hack
        if (window.innerHeight > window.innerWidth) {
            displayOverlay();
        }
    });

// listen for orientation changes
    $(window).bind('orientationchange', function() {
        checkMode();
    }
    );
}

$(document).ready(function() {
    addTableOverflowDiv();
    // TODO - Replace this with something better
});