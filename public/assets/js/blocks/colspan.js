$(function() {
	var tables = $(".table-colspan");

	$.each(tables, function() {

		if(Foundation.MediaQuery.atLeast($(this).attr("data-colspan-mq"))) {
			var colSpans = $(this).find(".colspan");

			$.each(colSpans, function() {
				$(this).attr("colspan", $(this).attr("data-colspan"));
			});
		}
	});
});