$(function () {
	function priceCounter() {
		var checkInputs = $('.js-check'),
			sum = 0,
			elementsCount = 0,
			disabledButtons = $('.js-disabled_buttons');

		checkInputs.filter(':checked').each(
			function () {
				sum += $(this).data('price');
				elementsCount++;
			});
		$('.js-check-counter').text(sum);

		disabledButtons.prop('disabled', elementsCount <= 0);
		$('.js-check-all').prop('checked', elementsCount === checkInputs.length);
	}

	$('.js-check').on(
		'change',
		function () {
			priceCounter();
		}
	);

	$('.js-check-all').on(
		'change',
		function () {
			var checkedAll = $('.js-check-all').prop('checked');
			$('.js-check').prop('checked', checkedAll);
			priceCounter();
		}
	);

	$('#delivery_type').on(
		'change',
		function () {
			var deliveryType = $('.delivery_type').val(),
				stage = $('#stage_id').val(),
				checkboxes = $('.js-check'),
				prices = $('.js-price');

			$.post(
				'/ajax/medalPrices.php',
				{
					'STAGE_ID' : stage
				},
				function (result) {
					if (result.length > 0)
					{
						result = JSON.parse(result);
						checkboxes.each(
							function () {
								var medal = $(this).data('medal'),
									price = parseInt(result[medal][deliveryType]);
								if (price > 0)
								{
									$(this).data('price', price).attr('data-price', price)
								}
							}
						);
						prices.each(
							function () {
								var medal = $(this).data('medal'),
									price = parseInt(result[medal][deliveryType]);
								if (price > 0)
								{
									$(this).text(price);
								}
							}
						);
						priceCounter();
					}
				}
			)
		}
	);
});

