$(function() {
	$userInfoToggler = $(".main-menu__user-info-toggler"),
	$userInfoEl = $(".user-info");

	if (!Foundation.MediaQuery.atLeast('medium')) {

		$userInfoEl.addClass('user-info--collapse');

		$userInfoToggler.on("click", function(e) {
			e.preventDefault();
			if ($userInfoEl.is(":visible")) {
				$userInfoEl.slideUp(300);
			} else {
				$userInfoEl.slideDown(300);	
			}
		});

		$(document).mouseup(function (e) {
		    if (!$userInfoEl.is(e.target) && $userInfoEl.has(e.target).length === 0)
		    {
		        $userInfoEl.slideUp(300);
		    }
		});
	}
});