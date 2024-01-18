'use strict';
$(function() {
  var contestStatisticPageMap, fillStages, sendAjax;
  sendAjax = function(data, callback) {
    if (callback == null) {
      callback = false;
    }
    URFODU.preloader.show($('.contest-statistic-page'));
    return $.post(window.location.path, data, function(result) {
      var contestStatisticPageMap;
      $('.contest-statistic-page').html($(result).filter('.contest-statistic-page').html());
      contestStatisticPageMap = AmCharts.makeChart('contestStatisticPageMap', contestStatisticPageMapConfig);
      URFODU.preloader.hide();
      if (callback) {
        return callback();
      }
    });
  };
  fillStages = function() {
    var stages;
    stages = [];
    $.each($('.js-stage_map'), function(key, element) {
      if (!$(element).hasClass('contest-statistic-page__stages-filter__button--active')) {
        return;
      }
      return stages.push($(element).data('stage-id'));
    });
    return stages;
  };
  $('.contest-statistic-page').on('click', '.js-stage_map', function(evt) {
    var chartDiv, data, returnButton;
    evt.preventDefault();
    $(this).toggleClass('contest-statistic-page__stages-filter__button--active');
    chartDiv = $('#contestStatisticPageMap');
    returnButton = $('.contest-statistic-page__map__return-to-world');
    data = {
      stages: fillStages(),
      mapCountry: chartDiv.attr('data-country-code'),
      ajax: 'Y'
    };
    if (returnButton.length === 0) {
      data.isWithoutRegions = 'Y';
    }
    return sendAjax(data);
  });
  $('.contest-statistic-page__map__return-to-world').on('click', function() {
    var chartDiv, data;
    chartDiv = $('#contestStatisticPageMap');
    data = {
      stages: fillStages(),
      mapCountry: chartDiv.attr('data-country-code'),
      isWithoutRegions: 'Y',
      ajax: 'Y'
    };
    return sendAjax(data);
  });
  contestStatisticPageMap = AmCharts.makeChart('contestStatisticPageMap', contestStatisticPageMapConfig);
  contestStatisticPageMap.addListener('init', function() {
    return $('.contest-statistic-page__map__return-to-world').show();
  });
  return contestStatisticPageMap.addListener('clickMapObject', function(event) {
    var chartDiv, data;
    chartDiv = $('#contestStatisticPageMap');
    data = {
      stages: fillStages(),
      mapCountry: event.mapObject.id.toLowerCase(),
      ajax: 'Y'
    };
    if (data.mapCountry !== chartDiv.attr('data-country-code') || chartDiv.attr('data-detail-allow') === 'true') {
      return sendAjax(data, function() {
        return $('.contest-statistic-page__map__return-to-world').show();
      });
    }
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tzL2NvbnRlc3Qtc3RhdGlzdGljLXBhZ2UuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzIjpbImJsb2Nrcy9jb250ZXN0LXN0YXRpc3RpYy1wYWdlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUVBLENBQUEsQ0FBRSxTQUFBO0FBQ0QsTUFBQTtFQUFBLFFBQUEsR0FBVyxTQUFDLElBQUQsRUFBTyxRQUFQOztNQUFPLFdBQVc7O0lBQzVCLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBakIsQ0FBc0IsQ0FBQSxDQUFFLHlCQUFGLENBQXRCO1dBRUEsQ0FBQyxDQUFDLElBQUYsQ0FDQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBRGpCLEVBRUMsSUFGRCxFQUdDLFNBQUMsTUFBRDtBQUNDLFVBQUE7TUFBQSxDQUFBLENBQUUseUJBQUYsQ0FBNEIsQ0FBQyxJQUE3QixDQUFrQyxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsTUFBVixDQUFpQix5QkFBakIsQ0FBMkMsQ0FBQyxJQUE1QyxDQUFBLENBQWxDO01BRUEsdUJBQUEsR0FBMEIsUUFBUSxDQUFDLFNBQVQsQ0FBbUIseUJBQW5CLEVBQThDLDZCQUE5QztNQUUxQixNQUFNLENBQUMsU0FBUyxDQUFDLElBQWpCLENBQUE7TUFFQSxJQUFjLFFBQWQ7ZUFBQSxRQUFBLENBQUEsRUFBQTs7SUFQRCxDQUhEO0VBSFU7RUFnQlgsVUFBQSxHQUFhLFNBQUE7QUFDWixRQUFBO0lBQUEsTUFBQSxHQUFTO0lBRVQsQ0FBQyxDQUFDLElBQUYsQ0FDQyxDQUFBLENBQUUsZUFBRixDQURELEVBRUMsU0FBQyxHQUFELEVBQU0sT0FBTjtNQUNDLElBQUEsQ0FBYyxDQUFBLENBQUUsT0FBRixDQUFVLENBQUMsUUFBWCxDQUFvQix1REFBcEIsQ0FBZDtBQUFBLGVBQUE7O2FBRUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxDQUFBLENBQUUsT0FBRixDQUFVLENBQUMsSUFBWCxDQUFnQixVQUFoQixDQUFaO0lBSEQsQ0FGRDtBQVFBLFdBQU87RUFYSztFQWFiLENBQUEsQ0FBRSx5QkFBRixDQUNBLENBQUMsRUFERCxDQUVDLE9BRkQsRUFHQyxlQUhELEVBSUMsU0FBQyxHQUFEO0FBQ0MsUUFBQTtJQUFBLEdBQUcsQ0FBQyxjQUFKLENBQUE7SUFFQSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsV0FBUixDQUFvQix1REFBcEI7SUFFQSxRQUFBLEdBQVcsQ0FBQSxDQUFFLDBCQUFGO0lBQ1gsWUFBQSxHQUFlLENBQUEsQ0FBRSwrQ0FBRjtJQUVmLElBQUEsR0FDQztNQUFBLE1BQUEsRUFBUSxVQUFBLENBQUEsQ0FBUjtNQUNBLFVBQUEsRUFBWSxRQUFRLENBQUMsSUFBVCxDQUFjLG1CQUFkLENBRFo7TUFFQSxJQUFBLEVBQU0sR0FGTjs7SUFJRCxJQUErQixZQUFZLENBQUMsTUFBYixLQUF1QixDQUF0RDtNQUFBLElBQUksQ0FBQyxnQkFBTCxHQUF3QixJQUF4Qjs7V0FFQSxRQUFBLENBQVMsSUFBVDtFQWZELENBSkQ7RUFzQkEsQ0FBQSxDQUFFLCtDQUFGLENBQWtELENBQUMsRUFBbkQsQ0FDQyxPQURELEVBRUMsU0FBQTtBQUNDLFFBQUE7SUFBQSxRQUFBLEdBQVcsQ0FBQSxDQUFFLDBCQUFGO0lBRVgsSUFBQSxHQUNDO01BQUEsTUFBQSxFQUFRLFVBQUEsQ0FBQSxDQUFSO01BQ0EsVUFBQSxFQUFZLFFBQVEsQ0FBQyxJQUFULENBQWMsbUJBQWQsQ0FEWjtNQUVBLGdCQUFBLEVBQWtCLEdBRmxCO01BR0EsSUFBQSxFQUFNLEdBSE47O1dBS0QsUUFBQSxDQUFTLElBQVQ7RUFURCxDQUZEO0VBY0EsdUJBQUEsR0FBMEIsUUFBUSxDQUFDLFNBQVQsQ0FBbUIseUJBQW5CLEVBQThDLDZCQUE5QztFQUUxQix1QkFBdUIsQ0FBQyxXQUF4QixDQUNDLE1BREQsRUFFQyxTQUFBO1dBQ0MsQ0FBQSxDQUFFLCtDQUFGLENBQWtELENBQUMsSUFBbkQsQ0FBQTtFQURELENBRkQ7U0FNQSx1QkFBdUIsQ0FBQyxXQUF4QixDQUNDLGdCQURELEVBRUMsU0FBQyxLQUFEO0FBQ0MsUUFBQTtJQUFBLFFBQUEsR0FBVyxDQUFBLENBQUUsMEJBQUY7SUFFWCxJQUFBLEdBQ0M7TUFBQSxNQUFBLEVBQVEsVUFBQSxDQUFBLENBQVI7TUFDQSxVQUFBLEVBQVksS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsV0FBbkIsQ0FBQSxDQURaO01BRUEsSUFBQSxFQUFNLEdBRk47O0lBSUQsSUFBRyxJQUFJLENBQUMsVUFBTCxLQUFxQixRQUFRLENBQUMsSUFBVCxDQUFjLG1CQUFkLENBQXJCLElBQTJELFFBQVEsQ0FBQyxJQUFULENBQWMsbUJBQWQsQ0FBQSxLQUFzQyxNQUFwRzthQUNDLFFBQUEsQ0FDQyxJQURELEVBRUMsU0FBQTtlQUNDLENBQUEsQ0FBRSwrQ0FBRixDQUFrRCxDQUFDLElBQW5ELENBQUE7TUFERCxDQUZELEVBREQ7O0VBUkQsQ0FGRDtBQTFFQyxDQUFGIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4kIC0+XHJcblx0c2VuZEFqYXggPSAoZGF0YSwgY2FsbGJhY2sgPSBmYWxzZSkgLT5cclxuXHRcdFVSRk9EVS5wcmVsb2FkZXIuc2hvdygkKCcuY29udGVzdC1zdGF0aXN0aWMtcGFnZScpKVxyXG5cclxuXHRcdCQucG9zdChcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uLnBhdGgsXHJcblx0XHRcdGRhdGEsXHJcblx0XHRcdChyZXN1bHQpIC0+XHJcblx0XHRcdFx0JCgnLmNvbnRlc3Qtc3RhdGlzdGljLXBhZ2UnKS5odG1sKCQocmVzdWx0KS5maWx0ZXIoJy5jb250ZXN0LXN0YXRpc3RpYy1wYWdlJykuaHRtbCgpKVxyXG5cclxuXHRcdFx0XHRjb250ZXN0U3RhdGlzdGljUGFnZU1hcCA9IEFtQ2hhcnRzLm1ha2VDaGFydCgnY29udGVzdFN0YXRpc3RpY1BhZ2VNYXAnLCBjb250ZXN0U3RhdGlzdGljUGFnZU1hcENvbmZpZylcclxuXHJcblx0XHRcdFx0VVJGT0RVLnByZWxvYWRlci5oaWRlKClcclxuXHJcblx0XHRcdFx0Y2FsbGJhY2soKSBpZiBjYWxsYmFja1xyXG5cdFx0KVxyXG5cclxuXHRmaWxsU3RhZ2VzID0gLT5cclxuXHRcdHN0YWdlcyA9IFtdXHJcblxyXG5cdFx0JC5lYWNoKFxyXG5cdFx0XHQkKCcuanMtc3RhZ2VfbWFwJyksXHJcblx0XHRcdChrZXksIGVsZW1lbnQpIC0+XHJcblx0XHRcdFx0cmV0dXJuIHVubGVzcyAkKGVsZW1lbnQpLmhhc0NsYXNzKCdjb250ZXN0LXN0YXRpc3RpYy1wYWdlX19zdGFnZXMtZmlsdGVyX19idXR0b24tLWFjdGl2ZScpXHJcblxyXG5cdFx0XHRcdHN0YWdlcy5wdXNoKCQoZWxlbWVudCkuZGF0YSgnc3RhZ2UtaWQnKSlcclxuXHRcdClcclxuXHJcblx0XHRyZXR1cm4gc3RhZ2VzXHJcblxyXG5cdCQoJy5jb250ZXN0LXN0YXRpc3RpYy1wYWdlJylcclxuXHQub24oXHJcblx0XHQnY2xpY2snLFxyXG5cdFx0Jy5qcy1zdGFnZV9tYXAnLFxyXG5cdFx0KGV2dCkgLT5cclxuXHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KClcclxuXHJcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2NvbnRlc3Qtc3RhdGlzdGljLXBhZ2VfX3N0YWdlcy1maWx0ZXJfX2J1dHRvbi0tYWN0aXZlJylcclxuXHJcblx0XHRcdGNoYXJ0RGl2ID0gJCgnI2NvbnRlc3RTdGF0aXN0aWNQYWdlTWFwJylcclxuXHRcdFx0cmV0dXJuQnV0dG9uID0gJCgnLmNvbnRlc3Qtc3RhdGlzdGljLXBhZ2VfX21hcF9fcmV0dXJuLXRvLXdvcmxkJylcclxuXHJcblx0XHRcdGRhdGEgPVxyXG5cdFx0XHRcdHN0YWdlczogZmlsbFN0YWdlcygpXHJcblx0XHRcdFx0bWFwQ291bnRyeTogY2hhcnREaXYuYXR0cignZGF0YS1jb3VudHJ5LWNvZGUnKVxyXG5cdFx0XHRcdGFqYXg6ICdZJ1xyXG5cclxuXHRcdFx0ZGF0YS5pc1dpdGhvdXRSZWdpb25zID0gJ1knIGlmIHJldHVybkJ1dHRvbi5sZW5ndGggaXMgMFxyXG5cclxuXHRcdFx0c2VuZEFqYXgoZGF0YSlcclxuXHQpXHJcblxyXG5cdCQoJy5jb250ZXN0LXN0YXRpc3RpYy1wYWdlX19tYXBfX3JldHVybi10by13b3JsZCcpLm9uKFxyXG5cdFx0J2NsaWNrJyxcclxuXHRcdC0+XHJcblx0XHRcdGNoYXJ0RGl2ID0gJCgnI2NvbnRlc3RTdGF0aXN0aWNQYWdlTWFwJylcclxuXHJcblx0XHRcdGRhdGEgPVxyXG5cdFx0XHRcdHN0YWdlczogZmlsbFN0YWdlcygpXHJcblx0XHRcdFx0bWFwQ291bnRyeTogY2hhcnREaXYuYXR0cignZGF0YS1jb3VudHJ5LWNvZGUnKVxyXG5cdFx0XHRcdGlzV2l0aG91dFJlZ2lvbnM6ICdZJ1xyXG5cdFx0XHRcdGFqYXg6ICdZJ1xyXG5cclxuXHRcdFx0c2VuZEFqYXgoZGF0YSlcclxuXHQpXHJcblxyXG5cdGNvbnRlc3RTdGF0aXN0aWNQYWdlTWFwID0gQW1DaGFydHMubWFrZUNoYXJ0KCdjb250ZXN0U3RhdGlzdGljUGFnZU1hcCcsIGNvbnRlc3RTdGF0aXN0aWNQYWdlTWFwQ29uZmlnKVxyXG5cclxuXHRjb250ZXN0U3RhdGlzdGljUGFnZU1hcC5hZGRMaXN0ZW5lcihcclxuXHRcdCdpbml0JyxcclxuXHRcdC0+XHJcblx0XHRcdCQoJy5jb250ZXN0LXN0YXRpc3RpYy1wYWdlX19tYXBfX3JldHVybi10by13b3JsZCcpLnNob3coKVxyXG5cdClcclxuXHJcblx0Y29udGVzdFN0YXRpc3RpY1BhZ2VNYXAuYWRkTGlzdGVuZXIoXHJcblx0XHQnY2xpY2tNYXBPYmplY3QnLFxyXG5cdFx0KGV2ZW50KSAtPlxyXG5cdFx0XHRjaGFydERpdiA9ICQoJyNjb250ZXN0U3RhdGlzdGljUGFnZU1hcCcpXHJcblxyXG5cdFx0XHRkYXRhID1cclxuXHRcdFx0XHRzdGFnZXM6IGZpbGxTdGFnZXMoKVxyXG5cdFx0XHRcdG1hcENvdW50cnk6IGV2ZW50Lm1hcE9iamVjdC5pZC50b0xvd2VyQ2FzZSgpXHJcblx0XHRcdFx0YWpheDogJ1knXHJcblxyXG5cdFx0XHRpZiBkYXRhLm1hcENvdW50cnkgaXNudCBjaGFydERpdi5hdHRyKCdkYXRhLWNvdW50cnktY29kZScpIG9yIGNoYXJ0RGl2LmF0dHIoJ2RhdGEtZGV0YWlsLWFsbG93JykgaXMgJ3RydWUnXHJcblx0XHRcdFx0c2VuZEFqYXgoXHJcblx0XHRcdFx0XHRkYXRhLFxyXG5cdFx0XHRcdFx0LT5cclxuXHRcdFx0XHRcdFx0JCgnLmNvbnRlc3Qtc3RhdGlzdGljLXBhZ2VfX21hcF9fcmV0dXJuLXRvLXdvcmxkJykuc2hvdygpXHJcblx0XHRcdFx0KVxyXG5cdClcclxuIl19
