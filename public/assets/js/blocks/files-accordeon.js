$(function() {
	var $accordeon = $(".files-accordeon");

	$accordeon
		.children("li")
		.children("a:first-child")
		.click(function(e) {
			var $elParent = $(this).parent();
			e.preventDefault();

			if ($(this).next().length !== 0) {
				if($elParent.hasClass("active")) {

				$elParent.removeClass("active");
				} else {
					
					$elParent.addClass("active");
				}
			}
		});
		
});