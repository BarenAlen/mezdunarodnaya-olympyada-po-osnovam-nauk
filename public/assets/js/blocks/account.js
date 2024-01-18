$(function(){
	$(".js-accordion_table thead").on("click", function() {
		var el = $(this).next().find(".inner-wrap")[0];

		if($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(el).slideUp();
		} else {
			$(this).addClass("active");
			$(el).slideDown();
		}
	});

	var $tabTogglers = $("#account-details-tabs a"),
	$tabs = $(".account__details-tab");

	$tabTogglers.on("click", function(e) {
		e.preventDefault();
		var tabId = $(this).attr("href");

		$tabs.removeClass("active");
		$tabTogglers.parent().removeClass("active");

		$(this).parent().addClass("active");

		$(tabId).addClass("active");

	});
});