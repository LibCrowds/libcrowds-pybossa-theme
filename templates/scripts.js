$(window).scroll(function() {
    if ($("#homepage-flag").length > 0) {
        if($(this).scrollTop() > 100) {
            $('.navbar').addClass('opaque');
            $('.navbar-fixed-top').addClass('opaque');
        } else {
            $('.navbar').removeClass('opaque');
            $('.navbar-fixed-top').removeClass('opaque');
        }
    }
});