$(function() {
	var modal = $(".js-contact-us-modal");
	$(".js-contact-us").on("click", function(e) {
		e.preventDefault();
		if (Foundation.MediaQuery.current !== 'small') {
			modal.modal({
      			stopPropagation: modal.find('.contact-us')
    		});
    		modal.show();
		} else {
			window.location.replace($(this).attr('href'));
		}
	});
});