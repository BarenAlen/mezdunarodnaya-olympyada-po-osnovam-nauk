$(document).ready(function (){
	ymaps.ready(function () {
		var stageID = $('#stage_id').val(),
			sectionBasePoint = $('.location-map');

		var myMap = new ymaps.Map('contest-map', {
			center: [
				56.836342,
				60.600250
			],
			zoom: 16,
			avoidFractionalZoom: false,
	        controls: [
		        'zoomControl'
	        ]
		});

		myMap.behaviors.disable([
			'scrollZoom',
		]);

		var myClusterer = new ymaps.Clusterer({
			gridSize: 128
		});

		var getBasepointMap = function (myMap, stageID, regionID, cityID, showSchools, showUniversities){
			var preloader = new Preloader($('#contest-map'));
			preloader.show();
			$.ajax({
				url: '/ajax/base_point.php',
				type: 'POST',
				data: {
					action: 'GET_COORDINATES',
					stageID: stageID,
					regionID: regionID,
					cityID: cityID,
					showSchools: (showSchools == undefined) ? 1 : showSchools,
					showUniversities: (showUniversities == undefined) ? 1 : showUniversities
				},
				success: function (responseData){
					myClusterer.removeAll();
					if (responseData.trim().length > 1){
						var response = JSON.parse(responseData),
							items = response['items'],
							htmlList = response['htmlList'],
							htmlAdditional = response['htmlAdditional'];

						if (items != null){
							items.forEach (function (item){
								var itemName = (item['NAME'].length > 30) ? item['NAME'].substr(0, 29) + '...' : item['NAME'],
									itemWidth = 40 + itemName.length * 8,
									iconTemplate = item['icon'],
									icon,
									placementLayout,
									myPlacemark;

									if (iconTemplate) {
										icon = iconTemplate.replace('%name%', itemName).replace('%width%', itemWidth);
									}

									placementLayout = ymaps.templateLayoutFactory.createClass(icon),
									myPlacemark = new ymaps.Placemark(
										[
											item['x'],
											item['y']
										],
										{},
										{
											balloonContent: item['NAME'],
											iconLayout: placementLayout,
											iconShape: {
												type: 'Rectangle',
												coordinates: [
													[0, 0], [itemWidth, 30]
												]
											},
								            iconImageSize: [
									            24,
									            25
								            ]
										}
									);

								myPlacemark.events.add('click', function (){
									$('[data-id="' + item['ID'] + '"]').click();
									myMap.setCenter(myPlacemark.geometry.getCoordinates());
								});

								myClusterer.add(myPlacemark);
							});

							myMap.geoObjects.add(myClusterer);

							if (myClusterer.getBounds() != null){
								myMap.setBounds(myClusterer.getBounds(), {
							        checkZoomRange: true,
									zoomMargin: 100
							    });
							}

							$('#base-point-list').html(htmlList);
							$('#base-point-total').html(htmlAdditional);
						}
					}

					preloader.hide();
				}
			});
		};

		var curRegionField = $('#location_regionID'),
			curCityField = $('#location_cityID');

		$('#location_regionName').on(
			'autocompleteSelect',
			function (e, location){
				showBasepointsByLocation(location.id);
				curCityField.val('value', null);
				getBasepointMap(myMap, stageID, location.id);
			}
		);

		$('#location_cityName').on(
			'autocompleteSelect',
			function (e, location){
				showBasepointsByLocation(curRegionField.val(), location.id);
				getBasepointMap(myMap, stageID, curRegionField.val(), location.id);
			}
		);

		if (stageID && stageID.length) {
			getBasepointMap(myMap, stageID, curRegionField.val(), curCityField.val());
		}

		showBasepointsByLocation = function ($region, $city){

			var allRegions = $('.js-region'),
				allCities = $('.js-city'),
				curRegion = $('.js-region_' + $region),
				curCity = $('.js-city_' + $city),
				schoolTitle = $('.js-school_title'),
				universityTitle = $('.js-university_title');

			allRegions.hide();
			allCities.show();
			schoolTitle.hide();
			universityTitle.hide();
			curRegion.show();

			if ($city != undefined){
				allCities.hide();
				curCity.show();
				if (curCity.filter('.js-school').length > 0){
					schoolTitle.show();
				}
				if (curCity.filter('.js-university').length > 0){
					universityTitle.show();
				}
			} else {
				if (curRegion.filter('.js-school').length > 0){
					schoolTitle.show();
				}
				if (curRegion.filter('.js-university').length > 0){
					universityTitle.show();
				}
			}
		};

		showBasepointsByLocation(
			curRegionField.val(),
			curCityField.val()
		);

		sectionBasePoint
			.on(
				'click',
				'.js-show__schools',
				function (){
					getBasepointMap(
						myMap,
						stageID,
						curRegionField.val(),
						curCityField.val(),
						$(this).is(":checked") ? 1 : 0,
						$('.js-show__universities').is(":checked") ? 1 : 0
					);
				}
			)
			.on(
				'click',
				'.js-show__universities',
				function (){
					getBasepointMap(
						myMap,
						stageID,
						curRegionField.val(),
						curCityField.val(),
						$('.js-show__schools').is(":checked") ? 1 : 0,
						$(this).is(":checked") ? 1 : 0
					);
				}
			);

		$('body').on(
			'click',
			'.js-open-modal__apply-application',
			function (){
				var modal = $('.js-modal__apply-application'),
					item = $(this);

				modal.find('.js-modal-data__name').html(item.data('content-name'));
				modal.find('.js-modal-data__description').html(item.data('content-text'));
				modal.find('.js-modal-data__type').attr('value', item.data('type'));
				modal.find('.js-modal-data__id').attr('value', item.data('id'));
				modal.find('form').attr('action', modal.find('form').data('action') + item.data('id'));
			}
		);
	});
});
