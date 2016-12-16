/** Renders a circular 'progress' button. */
$(function() {
    $('.btn-circle-progress').each(function() {
        var progress = $(this).attr('data-progress');
	var btn = $(this);

    function fillArc(quarter) {
        btn.children('.arc-q' + quarter).addClass('full');
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
        btn.children('.arc-q' + quarter).css({
            '-moz-transform':'rotate(' + degrees + 'deg) skewX(' + skew + 'deg)',
            '-webkit-transform':'rotate(' + degrees + 'deg) skewX(' + skew + 'deg)',
            '-ms-transform':'rotate(' + degrees + 'deg) skewX(' + skew + 'deg)',
            '-o-transform':'rotate(' + degrees + 'deg) skewX(' + skew + 'deg)',
            'transform':'rotate(' + degrees + 'deg) skewX(' + skew + 'deg)'
        });
        $('.arc-q' + quarter).addClass('percent' + (25 - progress));
        }

    if (progress >= 100) {
            fillArc(1);
            fillArc(2);
            fillArc(3);
            fillArc(4);
            $(this).removeAttr('href');
            $(this).children('p').html('<i class="fa fa-thumbs-up fa-4x"></i>');
        } else if (progress >= 75 ) {
            fillArc(1);
            fillArc(2);
            fillArc(3);
            partialFillArc(4, progress - 75);
        } else if (progress >= 50) {
            fillArc(1);
            fillArc(2);
            partialFillArc(3, progress - 50);
        } else if (progress > 25) {
            fillArc(1);
            partialFillArc(2, progress - 25);
        } else {
            partialFillArc(1, progress);
        }
    });
});