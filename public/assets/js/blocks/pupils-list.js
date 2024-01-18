$(function() {
	var $classFilterItems = $("#class-filter a:not(.note-btn)");
	$classFilterItems.on("click", function(e) {
		e.preventDefault();
		var $elParent = $(this).parent();

		if ($elParent.hasClass("active")) {
			$elParent.removeClass("active");
		} else {
			$elParent.addClass("active");
		}
	})
});