/** Customisation for project portal pages (place above scripts.min.js). */


/** Use the array declared below to sSet attributions for splash images.
 *
 * Just add another item to the array using the category ID as the index. The
 * assoicated string will be loaded underneath the image. A link could be
 * added like this:
 *
 * attributions[n] = '<a href="http://example.com">Somebody</a>'
 */
var attributions = ['Splash image attributions'];
attributions[1] = '<a href="http://www.lensintheface.com" target="_blank">Jon Ellis</a>';


/** Load the attribution, if it exists. */
function loadAttribution() {
    var id = $('#portal-attribution').attr('data-category-id');
    if (attributions.length > id) {
        $('#portal-attribution').html('Image: &copy; ' + attributions[id]);
    }
}


/** Load the tutorial video, if it exists. */
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


$(function() {
    loadSplash();
    loadAttribution();
    loadVideo();
});