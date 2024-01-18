$(function() {
	var profileForm = document.forms.profile_form;

	profileForm.noValidate = true;

	$(profileForm).on("submit", function(e) {

		var $elems = $(this).find(":input[required]"),
			isValid = true,
			scrollTo = [];
		$elems.each(function(index) {
			if (!this.validity.valid) {
				isValid = false;
				$(this).parent().addClass("input-invalid");
				scrollTo.push(index);
			} else {
				$(this).parent().removeClass("input-invalid");
			}
		});

		if (!isValid) {
			e.preventDefault();
			$(document).scrollTop($($elems[scrollTo[0]]).offset().top);
		}
	});
});