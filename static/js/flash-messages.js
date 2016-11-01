function pybossaNotify(msg, category, fadeOut=false){
    if (category === undefined) {
        category = "info";
    }
    let html = $(`<div class="alert alert-${category} fade">` 
                 + `<a class="close" data-dismiss="alert" href="#">&times;</a>${msg}` 
                 + `</div>`);
    $('#alert-messages').append(html);

    window.setTimeout(function () {
        html.addClass("in");
    }, 300);
    if (fadeOut) {
        window.setTimeout(function () {
            html.removeClass("in");
            html.addClass("out");
            window.setTimeout(function () {
                html.remove();
            }, 300);
        }, 2500);
    }
}
