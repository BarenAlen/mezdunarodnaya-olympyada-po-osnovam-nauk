$(function() {
	$("#add-fieldset").on("click", function(e) {
		e.preventDefault();

		var tmp = $("#add_fieldset_template").html(),
			lastStudent = $(".students-add__fieldset").last(),
			newIndex = parseInt(lastStudent.data('index')) + 1;

		tmp = tmp.replace(/#INDEX#/g, newIndex);

		$(tmp).insertAfter(lastStudent);
		$(".datePicker").datepicker();
	});

	$('.js-toggle_excel').on(
		'click',
		function() {
			$('.excel_form').toggle(300);
		}
	);

	$.datepicker.setDefaults({
		dateFormat: "dd.mm.yy",
		changeYear: true,
		changeMonth: true
	});
	$(".datePicker").datepicker();
});