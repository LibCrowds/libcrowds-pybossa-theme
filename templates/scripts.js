$(function() {
    if ($("#homepage-flag").length < 1) {
        $('.navbar').addClass('opaque');
        $('.navbar-fixed-top').addClass('opaque');
        $('.dropdown-menu').addClass('opaque');
        $('.navbar-default').addClass('opaque');
    }
});

$(window).scroll(function() {
    if ($("#homepage-flag").length > 0) {
        if($(this).scrollTop() > 100) {
            $('.navbar').addClass('opaque');
            $('.navbar-fixed-top').addClass('opaque');
            $('.dropdown-menu').addClass('opaque');
            $('.navbar-default').addClass('opaque');
        } else {
            $('.navbar').removeClass('opaque');
            $('.navbar-fixed-top').removeClass('opaque');
            $('.dropdown-menu').removeClass('opaque');
            $('.navbar-default').removeClass('opaque');
        }
    }
});