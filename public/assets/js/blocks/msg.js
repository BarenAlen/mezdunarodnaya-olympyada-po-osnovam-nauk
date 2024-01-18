$(function() {
	$(".msg__close").click(function() {
		var msg = $(this).parent();
		closeMsg();
		function closeMsg() {
			if(msg.hasClass("msg")) {
				msg.hide();
				return;
			} else {
				msg = msg.parent();
				closeMsg();
			}
		};
	});
});