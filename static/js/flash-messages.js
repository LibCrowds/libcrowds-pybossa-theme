function pybossaNotify(msg, category){
    if (category === undefined) {
        category = 'info';
    }
    var html = '<div class="alert alert-' + category + ' fade ">' +
              '<a class="close" data-dismiss="alert" href="#">&times;</a>' +
              msg +
              '</div>';
    $("#alert-messages").append(html);
    window.setTimeout(function () {
        $('.alert').addClass('in');
    }, 300);
}
