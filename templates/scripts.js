$(function() {
    if ($("#homepage-flag").length > 0) {
        console.log('homepage recognised');
        $('.navbar').removeClass('opaque');
        $('.dropdown-menu').removeClass('opaque');
    }
    
    $('.edit-profile-image').on( "click", function() {
        $('#avatar').click();
    });
    
    $(".format-date").each(function() {
        $(this).html(formatDate($(this).attr('data-date')));
    });
    
    animateProgress();
    
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
    
    animateProgress();
});

$( window ).resize(function() {
    animateProgress();
});

function isVisible(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function animateProgress() {
    $(".meter > span").each(function() {
        if (isVisible($(this)) && $(this).attr('data-progress') > 0) {
            $(this).animate({height:$(this).attr('data-progress') + "%"}, 1500);
            animateCounter($(this));
            $(this).attr('data-progress', '0');
        }
    });
}

function animateCounter (elem) {
  var $counter = $('#' + $(elem).attr('data-app') + 'Complete');
  var progress = $(elem).attr('data-progress');
  console.log(progress);
  jQuery({ Counter: 0 }).animate({ Counter: progress }, {
    duration: 1500,
    easing: 'swing',
    step: function () {
      $counter.html('Complete: ' + Math.ceil(this.Counter) + '%');
    }
  });
}

function formatDate(str) {
    var date = str.substring(0,10);
    var arr = str.split("-");
    var ret = arr[2] + '-' + arr[1] + "-"; + arr[0]
    return ret;
}



