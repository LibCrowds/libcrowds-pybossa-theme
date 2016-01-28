/** Customisation for project portal pages (place above scripts.min.js). */


/** Use the array declared below to set attributions for splash images.
 *
 * Just add another item to the array using the category ID as the index. The
 * assoicated string will be loaded underneath the image. So, links for catagories
 * with IDs 1 and 2 could be added like this:
 *
 * { 1 : '<a href="http://example.com">Somebody</a>',
     2 : '<a href="http://example.com">Somebody</a>' };
 */
var attributions = { 1: '<a href="http://www.lensintheface.com" target="_blank">Jon Ellis</a>' };


/** Load the attribution, if it exists. */
function loadAttribution() {
    var id = $('#portal-attribution').attr('data-category-id');
    if (id in attributions) {
        $('#portal-attribution').html('Image: &copy; ' + attributions[id]);
    }
}


/** Load the splash image, if it exists. */
function loadSplash() {
    var src = $('#portal-splash').attr('data-src');
    var splash = $('#portal-splash');

    // Restyle the page.
    function removeSplash() {
        splash.removeClass('splash');
        splash.find('.splash-dependant').html('');
    }

    if (typeof src !== typeof undefined && src !== false) {
        $.get(src)
        .done(function() {
            splash.css({"background-image": 'url(' + src + ")"});
        }).fail(function() {
            removeSplash();
        });
    } else {
        removeSplash();
    }
}


/** Load the MP4 video, if it exists. */
function loadVideo() {
    var src = $('#portal-video').attr('data-src');
    if (typeof src !== typeof undefined && src !== false) {
        $.get(src)
        .done(function() {
            $('#portal-video').html(
                    '<div class="row text-center padding-top-md">'
                  + '  <video controls>'
                  + '    <source src="' + src + '" type="video/mp4">'
                  + '  </video>'
                  + '</div>'
            );
        });
    }
}


$(function() {
    loadSplash();
    loadAttribution();
    loadVideo();
});