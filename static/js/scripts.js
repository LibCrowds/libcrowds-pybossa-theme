$(function() {
    stylePolaroids();
    setBodyBackground();
    showHistoryButton();
    startGlowingLinks();
    setTasksRemaining();
    animateProgress();
    styleNavigation();
    addIEInputLabels();
});


/** Make any glowing links glow periodically. */
function startGlowingLinks(){
    var glow = $('.glowing-link');
    setInterval(function(){
        glow.hasClass('glow') ? glow.removeClass('glow') : glow.addClass('glow');
    }, 2000);
}


/** Style any polaroid images. */
function stylePolaroids(){
    $(".polaroids .polaroid:nth-child(even)").addClass("even");
    $("ul.polaroids div:nth-child(even) .polaroid").addClass("even");
}


/** Add background class body allowing backgrounds to be set from templates. */
function setBodyBackground(){
    if ($(".set-body-bg").length > 0) {
        $('body').addClass($(".set-body-bg").attr('data-bg'));
    }
}


/** Show back button, or home button if now history. */
function showHistoryButton(){
    if (history.length > 1) {
        $("#btnBack").show();
    }
    else {
        $("#btnHome").show();
    }
}

/** Set tasks remaining in project summaries. */
function setTasksRemaining() {
$('.tasks-remaining').each(function() {
    var tasks = $(this).attr('data-tasks');
    var progress = $(this).attr('data-progress');
    var remaining = Math.ceil((100 - progress) * .01 * tasks);
    $(this).html('Tasks Remaining: ' + remaining);
});
}


/** Trigger refresh of certain elements on scroll. */
$(window).scroll(function() {
    styleNavigation();
    animateProgress();
});


/** Trigger refresh of certain elements on resize. */
$(window).on("resize", function() {
    animateProgress();
    styleNavigation();
}).resize();


/** Return True if an element is visible on the screen, False otherwise. */
function isVisible(elem) {
    var $elem = $(elem);
    var $window = $(window);
    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();
    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


/** Animate the progress bar. */
function animateProgress() {
    $(".meter > span").each(function() {
        if (isVisible($(this)) && $(this).attr('data-progress') > 0) {
            $(this).animate({
                height: $(this).attr('data-progress') + "%"
            }, 1500);
            animateCounter($(this));
            $(this).attr('data-progress', '0');
        }
    });
}


/** Animate the progress counter. */
function animateCounter(elem) {
    var $counter = $('#' + $(elem).attr('data-app') + 'Complete');
    var progress = $(elem).attr('data-progress');
    jQuery({
        Counter: 0
    }).animate({
        Counter: progress
    }, {
        duration: 1500,
        easing: 'swing',
        step: function() {
            $counter.html('Complete: ' + Math.ceil(this.Counter) + '%');
        }
    });
}


/** Set the main navigation bar as opaque and transparent. */
function styleNavigation() {

    // If there is a splash image, the window is large enough and not scrolled to the top.
    if ($(".splash").length > 0 && $(window).width() > 991 && $(this).scrollTop() < 100) {
        $('.navbar').removeClass('opaque');
        $('.dropdown-menu').removeClass('opaque');
        $('#navbar-logo').attr('src', $('#logo-white').attr('data-src'));
    } else {
        $('.navbar').addClass('opaque');
        $('.dropdown-menu').addClass('opaque');
        $('#navbar-logo').attr('src', $('#logo-black').attr('data-src'));
    }
    $('.navbar-default')[0].offsetHeight; // Trigger a reflow, flushing the CSS
    $('.navbar-default').removeClass('notransition');
}


/** Display popover */
$("a.avatar-popover").popover({
    html: true,
    animation: true,
    trigger: 'hover',
    placement: 'top'
});


/** Display popover */
$("a.btn-popover").popover({
    html: true,
    animation: true,
    trigger: 'hover',
    placement: 'bottom',
    container: 'body'
});


/** Display popover */
$(".input-popover").popover({
    html: true,
    animation: true,
    trigger: 'manual',
    placement: 'bottom',
    container: 'body'
});


/** Click the avatar button when edit-profile-image clicked. */
$('.edit-profile-image').on("click", function() {
    $('#avatar').click();
});


/** On click scroll to the element with the ID given in data-anchor. */
$('.anchor-btn').click(function(evt) {
    evt.preventDefault();
    var anchor = $(this).attr('data-anchor');
    $('html, body').animate({
        scrollTop: $(anchor).offset().top - 40
    }, 1000);
});


/** Toggle slide of project options menu */
$('#project-options').click(function(evt) {
    evt.preventDefault();
    var current = $(this).attr("class");
    $('.bs-docs-sidenav .nav-link > a').removeClass('active');
    $(this).attr("class", current);
    $(this).toggleClass("active");
    $('#project-menu').slideToggle("fast", function() {});
});


/** Show loading ID when import ID clickied. */
$("#import").off('click').on('click', function(){
    $("#loading").show();
});


/** Show loading ID when ckan link clickied. */
$("#ckan > a").off('click').on('click', function(){
    $("#loading").show();
});


/** Fix for tooltips. */
$("a[rel=tooltip]").tooltip();


/** IE fix for form input labels. */
function addIEInputLabels() {
    if (/*@cc_on!@*/false || !!document.documentMode) {
        $('label').each(function() {
            if (!$(this).siblings('.hidden').length) {
                $(this).removeClass('sr-only');
            }
        });
    }
}