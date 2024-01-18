'use strict';
var Preloader;

Preloader = (function() {
  function Preloader(element) {
    var existPreloader;
    if (!element || element.length <= 0) {
      console.error('Неверно указан элемент');
      return;
    }
    this.element = element;
    existPreloader = this.element.parent().find('.preloader');
    if (existPreloader.length <= 0) {
      this.uniqueID = "js-preloader_" + (Math.random().toString(36).substr(2, 9));
      this.element.before('<div class="preloader" id="' + this.uniqueID + '"></div>');
    } else {
      this.uniqueID = existPreloader.attr('id');
    }
  }

  Preloader.prototype.show = function() {
    return $('.preloader#' + this.uniqueID).show();
  };

  Preloader.prototype.hide = function() {
    return $('.preloader#' + this.uniqueID).hide();
  };

  Preloader.prototype.remove = function() {
    return this.element.parent().find('.preloader#' + this.uniqueID).remove();
  };

  return Preloader;

})();

if ($) {
  $.fn.preloader = function(command) {
    var instance;
    if (command == null) {
      command = null;
    }
    instance = new Preloader($(this));
    if (instance && typeof command === 'string' && command.length > 0) {
      switch (command) {
        case 'show':
          instance.show();
          break;
        case 'hide':
          instance.hide();
          break;
        case 'remove':
          instance.remove();
      }
    }
    return instance;
  };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tzL3ByZWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXMiOlsiYmxvY2tzL3ByZWxvYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxJQUFBOztBQUVNO0VBQ1MsbUJBQUMsT0FBRDtBQUNYLFFBQUE7SUFBQSxJQUFHLENBQUMsT0FBRCxJQUFZLE9BQU8sQ0FBQyxNQUFSLElBQWtCLENBQWpDO01BQ0UsT0FBTyxDQUFDLEtBQVIsQ0FBYyx3QkFBZDtBQUNBLGFBRkY7O0lBSUEsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUVYLGNBQUEsR0FBaUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULENBQUEsQ0FBaUIsQ0FBQyxJQUFsQixDQUF1QixZQUF2QjtJQUNqQixJQUFHLGNBQWMsQ0FBQyxNQUFmLElBQXlCLENBQTVCO01BQ0UsSUFBQyxDQUFBLFFBQUQsR0FBWSxlQUFBLEdBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTCxDQUFBLENBQWEsQ0FBQyxRQUFkLENBQXVCLEVBQXZCLENBQTBCLENBQUMsTUFBM0IsQ0FBa0MsQ0FBbEMsRUFBcUMsQ0FBckMsQ0FBRDtNQUUzQixJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsQ0FBZ0IsNkJBQUEsR0FBZ0MsSUFBQyxDQUFBLFFBQWpDLEdBQTRDLFVBQTVELEVBSEY7S0FBQSxNQUFBO01BS0UsSUFBQyxDQUFBLFFBQUQsR0FBWSxjQUFjLENBQUMsSUFBZixDQUFvQixJQUFwQixFQUxkOztFQVJXOztzQkFlYixJQUFBLEdBQU0sU0FBQTtXQUNKLENBQUEsQ0FBRSxhQUFBLEdBQWdCLElBQUMsQ0FBQSxRQUFuQixDQUE0QixDQUFDLElBQTdCLENBQUE7RUFESTs7c0JBR04sSUFBQSxHQUFNLFNBQUE7V0FDSixDQUFBLENBQUUsYUFBQSxHQUFnQixJQUFDLENBQUEsUUFBbkIsQ0FBNEIsQ0FBQyxJQUE3QixDQUFBO0VBREk7O3NCQUdOLE1BQUEsR0FBUSxTQUFBO1dBQ04sSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULENBQUEsQ0FBaUIsQ0FBQyxJQUFsQixDQUF1QixhQUFBLEdBQWdCLElBQUMsQ0FBQSxRQUF4QyxDQUFpRCxDQUFDLE1BQWxELENBQUE7RUFETTs7Ozs7O0FBR1YsSUFBRyxDQUFIO0VBQ0UsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFMLEdBQWlCLFNBQUMsT0FBRDtBQUNmLFFBQUE7O01BRGdCLFVBQVU7O0lBQzFCLFFBQUEsR0FBVyxJQUFJLFNBQUosQ0FBYyxDQUFBLENBQUUsSUFBRixDQUFkO0lBRVgsSUFBRyxRQUFBLElBQWEsT0FBTyxPQUFQLEtBQWtCLFFBQS9CLElBQTRDLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLENBQWhFO0FBQ0UsY0FBTyxPQUFQO0FBQUEsYUFDTyxNQURQO1VBQ21CLFFBQVEsQ0FBQyxJQUFULENBQUE7QUFBWjtBQURQLGFBRU8sTUFGUDtVQUVtQixRQUFRLENBQUMsSUFBVCxDQUFBO0FBQVo7QUFGUCxhQUdPLFFBSFA7VUFHcUIsUUFBUSxDQUFDLE1BQVQsQ0FBQTtBQUhyQixPQURGOztBQU1BLFdBQU87RUFUUSxFQURuQiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuY2xhc3MgUHJlbG9hZGVyXHJcbiAgY29uc3RydWN0b3I6IChlbGVtZW50KSAtPlxyXG4gICAgaWYgIWVsZW1lbnQgb3IgZWxlbWVudC5sZW5ndGggPD0gMFxyXG4gICAgICBjb25zb2xlLmVycm9yKCfQndC10LLQtdGA0L3QviDRg9C60LDQt9Cw0L0g0Y3Qu9C10LzQtdC90YInKVxyXG4gICAgICByZXR1cm5cclxuXHJcbiAgICBAZWxlbWVudCA9IGVsZW1lbnRcclxuXHJcbiAgICBleGlzdFByZWxvYWRlciA9IEBlbGVtZW50LnBhcmVudCgpLmZpbmQoJy5wcmVsb2FkZXInKVxyXG4gICAgaWYgZXhpc3RQcmVsb2FkZXIubGVuZ3RoIDw9IDBcclxuICAgICAgQHVuaXF1ZUlEID0gXCJqcy1wcmVsb2FkZXJfI3tNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSl9XCJcclxuICAgICAgXHJcbiAgICAgIEBlbGVtZW50LmJlZm9yZSgnPGRpdiBjbGFzcz1cInByZWxvYWRlclwiIGlkPVwiJyArIEB1bmlxdWVJRCArICdcIj48L2Rpdj4nKVxyXG4gICAgZWxzZVxyXG4gICAgICBAdW5pcXVlSUQgPSBleGlzdFByZWxvYWRlci5hdHRyKCdpZCcpXHJcblxyXG4gIHNob3c6ICgpIC0+XHJcbiAgICAkKCcucHJlbG9hZGVyIycgKyBAdW5pcXVlSUQpLnNob3coKVxyXG5cclxuICBoaWRlOiAoKSAtPlxyXG4gICAgJCgnLnByZWxvYWRlciMnICsgQHVuaXF1ZUlEKS5oaWRlKClcclxuXHJcbiAgcmVtb3ZlOiAoKSAtPlxyXG4gICAgQGVsZW1lbnQucGFyZW50KCkuZmluZCgnLnByZWxvYWRlciMnICsgQHVuaXF1ZUlEKS5yZW1vdmUoKVxyXG5cclxuaWYgJFxyXG4gICQuZm4ucHJlbG9hZGVyID0gKGNvbW1hbmQgPSBudWxsKSAtPlxyXG4gICAgaW5zdGFuY2UgPSBuZXcgUHJlbG9hZGVyKCQodGhpcykpXHJcbiAgICBcclxuICAgIGlmIGluc3RhbmNlIGFuZCB0eXBlb2YgY29tbWFuZCBpcyAnc3RyaW5nJyBhbmQgY29tbWFuZC5sZW5ndGggPiAwXHJcbiAgICAgIHN3aXRjaCBjb21tYW5kXHJcbiAgICAgICAgd2hlbiAnc2hvdycgdGhlbiBpbnN0YW5jZS5zaG93KClcclxuICAgICAgICB3aGVuICdoaWRlJyB0aGVuIGluc3RhbmNlLmhpZGUoKVxyXG4gICAgICAgIHdoZW4gJ3JlbW92ZScgdGhlbiBpbnN0YW5jZS5yZW1vdmUoKVxyXG4gICAgXHJcbiAgICByZXR1cm4gaW5zdGFuY2VcclxuIl19
