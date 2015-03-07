$(function() {
    if ($("#homepage-flag").length > 0) {
        $('.navbar').removeClass('opaque');
        $('.dropdown-menu').removeClass('opaque');
    }
    
    $('.edit-profile-image').on( "click", function() {
        $('#avatar').click();
    });
    
    $(".format-date").each(function() {
        $(this).html(formatDate($(this).attr('data-date')));
    });
    
    $('.anchor-btn').click(function(evt) {
        evt.preventDefault();
        var anchor = $(this).attr('data-anchor');
         $('html, body').animate({
            scrollTop: $(anchor).offset().top - 40
        }, 1000);
    });
    
    $(window).on("resize", function () {
        animateProgress();
        $('.splash').css({'height':($(window).height())+'px'});
    }).resize();
    
    if ($(".set-main-bg").length > 0) {
        $('body').addClass($(".set-main-bg").attr('data-bg'));
    }
    
    if( $('#code-btns').length ) {
        $('#code-btns').attr('padding-left', $('.CodeMirror-gutter').style.width);
    }
    
    $('#search-catalogue-again').click(function(evt) {
        evt.preventDefault();
        $('#catalogue-results').slideUp();
        $('#catalogue-form').slideDown();
    });
    
    updateXML();
    
});

$(window).scroll(function() {
    if ($("#homepage-flag").length > 0) {
        //$(".splash-overlay").css('background', 'none');
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
    var arr = date.split("-");
    var ret = arr[2] + '-' + arr[1] + "-" + arr[0];
    return ret;
}

function updateXML() {
    var text = vkbeautify.xml($('#xml2').html());
    var expr = new RegExp("\n","g")
    $('#xml').html(text.replace(expr,'<br>'));
}