$(document).ready(function() {
	var win = $(window);

	var rows = $(".students-application-table__row");
	refreshList();

	var timer;
	win.scroll(function() {
		clearTimeout(timer);
		timer = setTimeout( refreshList , 20 );
	});

	function refreshList() {

		$.each(rows, function(index, value) {
			var height = $(this).height();
			$(this).height(height);
			if (!$(this).visible(true, true)) {
				$(this).children().hide();
				$(this).css('visibility', 'hidden');
			} else {
				$(this).css('visibility', 'visible').children().show();
			}
		});
	}
});