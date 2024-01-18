$(function() {

    var slideCount = $('#month-slider ul li').length;
    var slideWidth = $('#month-slider ul li').width();
    var slideHeight = $('#month-slider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;

    $('#month-slider').css({
        width: slideWidth,
        height: slideHeight
    });

    $('#month-slider ul').css({
        width: sliderUlWidth,
        marginLeft: -slideWidth
    });

    $('#month-slider ul li').css({
        width: slideWidth
    });

    $('#month-slider ul li:last-child').prependTo('#month-slider ul');

    function moveLeft() {
        $('#month-slider ul').animate({
            left: +slideWidth
        }, 200, function() {
            $('#month-slider ul li:last-child').prependTo('#month-slider ul');
            $('#month-slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#month-slider ul').animate({
            left: -slideWidth
        }, 200, function() {
            $('#month-slider ul li:first-child').appendTo('#month-slider ul');
            $('#month-slider ul').css('left', '');
        });
    };

    $('a.calendar__month-prev').click(function(e) {
    	e.preventDefault();
        moveLeft();
    });

    $('a.calendar__month-next').click(function(e) {
    	e.preventDefault();
        moveRight();
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2Nrcy9jYWxlbmRhci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxDQUFFLFNBQUEsR0FBQSxDQUFGIiwiZmlsZSI6ImJsb2Nrcy9jYWxlbmRhci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIiQgLT5cclxuXHQiXX0=
