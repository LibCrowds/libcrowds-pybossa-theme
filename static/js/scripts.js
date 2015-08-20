$(function() {
    var glow = $('.glowing-link');
    setInterval(function(){
        glow.hasClass('glow') ? glow.removeClass('glow') : glow.addClass('glow');
    }, 2000);

    var customSplash = $('.splash').attr('data-splash');
    if (typeof customSplash !== typeof undefined && customSplash !== false) {
        $('.splash').css({
            "background-image": 'url(' + customSplash + ")"
        });
    }
    
    //Progress button
    if($('.btn-circle-progress').length){
        var progress = $('.btn-circle-progress').attr('data-progress');
        if (progress >=100) {
            fillArc(1);
            fillArc(2);
            fillArc(3);
            fillArc(4);
            $('.btn-circle-progress').removeAttr('href');
            $('.btn-circle-progress p').html('<i class="fa fa-thumbs-up fa-4x"></i>');
        } else if (progress>=75) {
            fillArc(1);
            fillArc(2);
            fillArc(3);
            partialFillArc(4, progress - 75);
        } else if (progress>=50) {
            fillArc(1);
            fillArc(2);
            partialFillArc(3, progress - 50);
        } else if (progress>25) {
            fillArc(1);
            partialFillArc(2, progress - 25);
        } else {
            partialFillArc(1, progress);
        }
    }
    
    updateXML();
    
    $(".btn-album").each(function(){
        $(this).off('click').on('click', function(){
            document.getElementById('album_id').value = $(this).attr('id');
            document.location.href = "#album_id";
        });
    });
    
    if ($(".set-main-bg").length > 0) {
        $('body').addClass($(".set-main-bg").attr('data-bg'));
    }
    
    if ($('.CodeMirror-gutter').length) {
        $('#code-btns').attr('padding-left', $('.CodeMirror-gutter').attr('width'));
    }
    
    $(".polaroids .polaroid:nth-child(even)").addClass("even");
    $("ul.polaroids div:nth-child(even) .polaroid").addClass("even");
    
    $('.fa-download').each(function() {
            var bytes = $(this).attr('data-filesize');
            if (typeof bytes !== typeof undefined && bytes !== false) {
                $(this).html("<small> (" + bytesToSize(bytes) + ")</small>");
            }
    });
    
    if (history.length > 1) {
        $("#btnBack").show();
    }
    else {
        $("#btnHome").show();
    }
    
    $('.tasks-remaining').each(function() {
        var tasks = $(this).attr('data-tasks');
        var progress = $(this).attr('data-progress');
        var remaining = Math.ceil((100 - progress) * .01 * tasks);
        $(this).html('Tasks Remaining: ' + remaining);
    });
    
    //EpicEditor
    console.log(typeof(EpicEditor));
    if (typeof(EpicEditor) !== "undefined") {
        var epicEditorTextArea = $('#epiceditor').data('textarea');
        var opts = {
        container: 'epiceditor',
          textarea: epicEditorTextArea,
          basePath: window.location.origin + '/static/',
          clientSideStorage: false,
          theme: {
            base: 'vendor/EpicEditor-v0.2.2/themes/base/epiceditor.css',
            preview: 'css/styles.css',
            editor: 'css/styles.css'
          }
        }
        var editor = new EpicEditor(opts);
        editor.load();
    }
    
    animateProgress();
    sameSize();
    styleNavigation();
    getShareStats();
});

$(window).scroll(function() {
    styleNavigation();
    animateProgress();
});

$(window).on("resize", function() {
    sameSize();
    animateProgress();
    styleNavigation();
}).resize();

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
        });
    });
    $('#total-share-count').fadeIn('slow');
}


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
            $(this).animate({
                height: $(this).attr('data-progress') + "%"
            }, 1500);
            animateCounter($(this));
            $(this).attr('data-progress', '0');
        }
    });
}

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

function updateXML() {
    if ($("#xml").length > 0) {
        var text = vkbeautify.xml($('#xml2').html());
        var expr = new RegExp("\n", "g")
        $('#xml').html(text.replace(expr, '<br>'));
    }
}

function recordIP(){
    $.ajax('/blplugin/record_ip');
}

function fillArc(quarter) {
    $('.arc-q' + quarter).addClass('full');
}

function partialFillArc(quarter, progress){
    var skew =  (25 - progress) * 3.6;
    var degrees = 90;
    switch (quarter) {
        case 2:
            degrees = 180;
            break;
        case 3:
            degrees = 270;
            break;
        case 4:
            degrees = 360;
            break;
    }
    $('.arc-q' + quarter).css({
        '-moz-transform':'rotate(' + degrees + 'deg) skewX(' + skew + 'deg)',
        '-webkit-transform':'rotate(' + degrees + 'deg) skewX(' + skew + 'deg)',
        '-ms-transform':'rotate(' + degrees + 'deg) skewX(' + skew + 'deg)',
        '-o-transform':'rotate(' + degrees + 'deg) skewX(' + skew + 'deg)',
        'transform':'rotate(' + degrees + 'deg) skewX(' + skew + 'deg)'
    });
    $('.arc-q' + quarter).addClass('percent' + (25 - progress));
}

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
    $('.navbar-default')[0].offsetHeight; // Trigger a reflow, flushing the CSS changes
    $('.navbar-default').removeClass('notransition');
}

function bytesToSize(bytes) {
    if(bytes == 0) return '0 Bytes';
    if(bytes == 1) return '1 Byte';
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

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

$('.upload-img-form').submit(function() {
    $('#upload-btn').html('<i class="glyphicon glyphicon-refresh spinning"></i> Uploading');
    $('#upload-btn').blur();
});

$("a.avatar-popover").popover({
    html: true,
    animation: true,
    trigger: 'hover',
    placement: 'top'
});

$("a.btn-popover").popover({
    html: true,
    animation: true,
    trigger: 'hover',
    placement: 'bottom',
    container: 'body'
});

$(".input-popover").popover({
    html: true,
    animation: true,
    trigger: 'manual',
    placement: 'bottom',
    container: 'body'
});

$('.edit-profile-image').on("click", function() {
    $('#avatar').click();
});
    
$('.anchor-btn').click(function(evt) {
    evt.preventDefault();
    var anchor = $(this).attr('data-anchor');
    $('html, body').animate({
        scrollTop: $(anchor).offset().top - 40
    }, 1000);
});

$('#search-catalogue-again').click(function(evt) {
    evt.preventDefault();
    $('#catalogue-results').slideUp();
    $('#catalogue-form').slideDown();
});

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

$('#project-options').click(function(evt) {
    evt.preventDefault();
    var current = $(this).attr("class");
    $('.bs-docs-sidenav .nav-link > a').removeClass('active');
    $(this).attr("class", current);
    $(this).toggleClass("active");
    $('#admin-menu').slideUp();
    $('#web-service-menu').slideUp();
    $('#project-menu').slideToggle("fast", function() {});
});

$('#web-service-options').click(function(evt) {
    evt.preventDefault();
    var current = $(this).attr("class");
    $('.bs-docs-sidenav .nav-link > a').removeClass('active');
    $(this).attr("class", current);
    $(this).toggleClass("active");
    $('#admin-menu').slideUp();
    $('#project-menu').slideUp();
    $('#web-service-menu').slideToggle("fast", function() {});
});

$("#ckan > a").off('click').on('click', function(){
    $("#loading").show();
});

$("a[rel=tooltip]").tooltip();

$("#import").off('click').on('click', function(){
    $("#loading").show();
});
