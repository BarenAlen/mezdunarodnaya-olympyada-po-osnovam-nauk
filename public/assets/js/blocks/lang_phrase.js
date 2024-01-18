var toggleLangPhrases = function(isForceShow) {
	isForceShow = isForceShow || false;

	var resultBlock = $('.lang-phrase__result'),
		globalWrapper = $('#wrapper'),
		isShownResult;

	if (!isForceShow) {
		resultBlock.toggleClass('active');
		globalWrapper.toggleClass('long');
	} else {
		resultBlock.addClass('active');
		globalWrapper.addClass('long');
	}

	isShownResult = resultBlock.hasClass('active');

	if (isShownResult && !isForceShow) {
		URFODU.preloader.show($('body'));
	} else {
		URFODU.preloader.show($('.lang-phrase__show-btn'));
	}

	$.post(
		window.location.href,
		{
			GET_PHRASES: (isShownResult) ? 'Y' : 'N'
		},
		function(result) {
			URFODU.preloader.hide();

			if (result && result.length > 0 && isShownResult) {
				resultBlock.html(result);
			}
		}
	);
};

$(function () {
	var elements = $('[data-toggle="popover"]');

	if (elements && elements.length > 0) {
		elements.popover()
	}

	$('.js-lang_phrases').tooltip({
		placement: 'left'
	}).on(
		'click',
		function() {
			toggleLangPhrases();
		}
	);

	if ($('.lang-phrase__result').hasClass('active')) {
		toggleLangPhrases(true);
	}

	$('.js-show_phrase_modal').live(
		'click',
		function(e) {
			openNewWindow($(this), e);
		}
	);
});
