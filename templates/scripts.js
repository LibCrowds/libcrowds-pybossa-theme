$(function() {
    if ($("#homepage-flag").length > 0) {
        console.log('homepage recognised');
        $('.navbar').removeClass('opaque');
        $('.dropdown-menu').removeClass('opaque');
    }
    
    $('.edit-profile-image').on( "click", function() {
        $('#avatar').click();
    });
    
});

$(window).scroll(function() {
    if ($("#homepage-flag").length > 0) {
        if($(this).scrollTop() > 100) {
            $('.navbar').addClass('opaque');
            $('.dropdown-menu').addClass('opaque');
            $('#navbar-logo').attr('src', $('#logo-black').attr('data-src'));
        } else {
            $('.navbar').removeClass('opaque');
            $('.dropdown-menu').removeClass('opaque');
            $('#navbar-logo').attr('src', $('#logo-white').attr('data-src'));
        }
    }
});


