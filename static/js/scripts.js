$(function() {
    loadSplash();
    getShareStats();
    stylePolaroids();
    setBodyBackground();
    showHistoryButton();
    makeLinkGlow();
    setTasksRemaining();
    animateProgress();
    sameSize();
    styleNavigation();
    addIEInputLabels();
});


/** Load any custom splash images. */
function loadSplash(){
    var customSplash = $('.splash').attr('data-splash');
    if (typeof customSplash !== typeof undefined && customSplash !== false) {
        $('.splash').css({
            "background-image": 'url(' + customSplash + ")"
        });
    }
}


/** Update social media share stats. */
function getShareStats(){
    $('.btn-facebook').each(function(){
        var facebook = $(this);
        $.getJSON('https://graph.facebook.com/?id=' + $(this).data('url') + '&callback=?', function(json) {
            if (typeof json['shares'] != 'undefined') {
                if (json['shares'] == 1) {
                    facebook.attr('data-content', 'Shared once on Facebook');
                } else {
                    facebook.attr('data-content', 'Shared ' + json['shares'] + ' times on Facebook');
                }
                $('#total-share-count').attr('data-count', parseInt($('#total-share-count').attr('data-count')) + json['shares']);
            }
        });
    });
    $('.btn-twitter').each(function(){
        var twitter = $(this);
        $.getJSON('http://urls.api.twitter.com/1/urls/count.json?url=' + $(this).data('url') + '&callback=?', function(json) {
            if (json['count'] > 0) {
                if (json['shares'] == 1) {
                    twitter.attr('data-content', 'Shared once on Twitter');
                } else {
                    twitter.attr('data-content', 'Shared ' + json['count'] + ' times on Twitter');
                }
                $('#total-share-count').attr('data-count', parseInt($('#total-share-count').attr('data-count')) + json['count']);
            }
        });
    });
    $('.btn-linkedin').each(function(){
        var linkedin = $(this);
        $.getJSON('https://www.linkedin.com/countserv/count/share?url=' + $(this).data('url') + '&callback=?', function(json) {
            if (json['count'] > 0) {
                if (json['shares'] == 1) {
                    linkedin.attr('data-content', 'Shared once on LinkedIn');
                } else {
                    linkedin.attr('data-content', 'Shared ' + json['count'] + ' times on LinkedIn');
                }
                $('#total-share-count').attr('data-count', parseInt($('#total-share-count').attr('data-count')) + json['count']);
            }
        });
    });
    $('.btn-googleplus').each(function(){
        var googleplus = $(this);
        var data = {
            "method":"pos.plusones.get",
            "id":$(this).data('url'),
            "params":{
                "nolog":true,
                "id":$(this).data('url'),
                "source":"widget",
                "userId":"@viewer",
                "groupId":"@self"
            },
            "jsonrpc":"2.0",
            "key":"p",
            "apiVersion":"v1"
        };
        $.ajax({
            type: "POST",
            url: "https://clients6.google.com/rpc",
            processData: true,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(r){
                if (typeof(r.result) !== "undefined") {
                    count = r.result.metadata.globalCounts.count;
                    if (count > 0) {
                        if (count == 1) {
                            googleplus.attr('data-content', 'Shared once on Google+');
                        } else {
                            googleplus.attr('data-content', 'Shared ' + count + ' times on Google+');
                        }
                        $('#total-share-count').attr('data-count', parseInt($('#total-share-count').attr('data-count')) + count);
                    }
                }
            }
        });
    });
    $('#total-share-count').fadeIn('slow');
}


/** Style any polaroid images. */
function stylePolaroids(){
    $(".polaroids .polaroid:nth-child(even)").addClass("even");
    $("ul.polaroids div:nth-child(even) .polaroid").addClass("even");
}


/** Add background class body allowing backgrounds to be set from templates. */
function setBodyBackground(){
    if ($(".set-main-bg").length > 0) {
        $('body').addClass($(".set-main-bg").attr('data-bg'));
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
    sameSize();
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


/** Toggle the main navigation between opaque and transparent. */
function styleNavigation() {
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


/** Sets all elements of class same-size to the same height. */
function sameSize() {
    var m2 = 0;
    $(".row .same-size").height("");
    $(".row .same-size").each(function(i, el) {
        m2 = Math.max(m2, $(el).height());
    });
    if($(window).width() > 991){
        $(".row .same-size").height(m2);
    } else {
        $(".row .same-size").height(m2 + 50);
    }

    var m = 0;
    $(".well").height("");
    $(".well").each(function(i, el) {
        m = Math.max(m, $(el).height());
    });
    $(".well").height(m);
}


/** Show loading icon while image form uploads */
$('.upload-img-form').submit(function() {
    $('#upload-btn').html('<i class="fa fa-refresh spinning"></i> Uploading');
    $('#upload-btn').blur();
});


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


/** Toggle slide of admin options menu */
$('#admin-options').click(function(evt) {
    evt.preventDefault();
    var current = $(this).attr("class");
    $('.bs-docs-sidenav .nav-link > a').removeClass('active');
    $(this).attr("class", current);
    $(this).toggleClass("active");
    $('#project-menu').slideUp();
    $('#web-service-menu').slideUp();
    $('#admin-menu').slideToggle("fast", function() {});
});


/** Toggle slide of project options menu */
$('#project-options').click(function(evt) {
    evt.preventDefault();
    var current = $(this).attr("class");
    $('.bs-docs-sidenav .nav-link > a').removeClass('active');
    $(this).attr("class", current);
    $(this).toggleClass("active");
    $('#admin-menu').slideUp();
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