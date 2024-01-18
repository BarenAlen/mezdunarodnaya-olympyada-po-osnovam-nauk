var Modal;

Modal = (function() {
  function Modal(element, settings) {
    if (settings == null) {
      settings = {};
    }
    if (!element || element.length <= 0) {
      console.error('Неверно указан элемент');
    }
    this.element = element;
    this.settings = {
      closeButtonClass: 'modal__close',
      overlayClass: 'modal__overlay',
      modalActiveClass: 'modal__active',
      fadeSpeed: 300
    };
    if (settings) {
      this.__checkSettings(settings);
    }
    if (!this.settings.openSpeed) {
      this.settings.openSpeed = this.settings.fadeSpeed;
    }
    if (!this.settings.fadeSpeed) {
      this.settings.closeSpeed = this.settings.fadeSpeed;
    }
    this.element.addClass(this.settings.modalActiveClass);
    this.element.attr('data-modal-block', 'true');
    this.__bindDefault();
  }

  Modal.prototype.show = function() {
    var $this;
    $this = this;
    return this.hideAll(function() {
      return $this.element.fadeIn($this.settings.openSpeed);
    });
  };

  Modal.prototype.hide = function() {
    var $this;
    $this = this;
    return this.element.fadeOut(this.settings.fadeSpeed, function() {
      $this.element.removeClass($this.settings.modalActiveClass);
      return $this.__unbindDefault();
    });
  };

  Modal.prototype.hideAll = function(callback) {
    var $this;
    $this = this;
    $.each($('[data-modal-block="true"]'), function(key, modalElement) {
      return $(modalElement).fadeOut($this.settings.fadeSpeed);
    });
    if (callback) {
      return callback();
    }
  };

  Modal.prototype.setStopPropagation = function(element) {
    if (element && element.length > 0) {
      return element.on('click', function(e) {
        return e.stopPropagation();
      });
    }
  };

  Modal.prototype.__checkSettings = function(settings) {
    var results, setting, settingValue, stopElement;
    results = [];
    for (setting in settings) {
      settingValue = settings[setting];
      switch (setting) {
        case 'stopPropagation':
          if (!typeof settingValue === 'object') {
            break;
          }
          if (Array.isArray(settingValue)) {
            results.push((function() {
              var i, len, results1;
              results1 = [];
              for (i = 0, len = settingValue.length; i < len; i++) {
                stopElement = settingValue[i];
                results1.push(this.setStopPropagation(stopElement));
              }
              return results1;
            }).call(this));
          } else {
            results.push(this.setStopPropagation(settingValue));
          }
          break;
        case 'closeButtonClass':
        case 'overlayClass':
        case 'modalActiveClass':
        case 'fadeSpeed':
        case 'openSpeed':
        case 'closeSpeed':
          if (settingValue && settingValue.length > 0) {
            results.push(this.settings[setting] = settingValue);
          } else {
            results.push(void 0);
          }
          break;
        default:
          results.push(void 0);
      }
    }
    return results;
  };

  Modal.prototype.__findCloseButton = function() {
    return this.element.find("." + this.settings.closeButtonClass);
  };

  Modal.prototype.__findOverlay = function() {
    var overlay, tryOverlay;
    overlay = null;
    if (this.element.hasClass(this.settings.overlayClass)) {
      overlay = this.element;
    } else {
      tryOverlay = this.element.find("." + this.settings.overlayClass);
      if (tryOverlay && tryOverlay.length > 0) {
        overlay = tryOverlay;
      }
    }
    return overlay;
  };

  Modal.prototype.__bindDefault = function() {
    var $this, closeBtn, overlay;
    $this = this;
    closeBtn = this.__findCloseButton();
    if (closeBtn && closeBtn.length > 0) {
      closeBtn.on('click', function() {
        return $this.hide();
      });
    }
    overlay = this.__findOverlay();
    if (overlay && overlay.length > 0) {
      return overlay.on('click', function() {
        return $this.hide();
      });
    }
  };

  Modal.prototype.__unbindDefault = function() {
    var closeBtn, overlay;
    closeBtn = this.__findCloseButton();
    if (closeBtn && closeBtn.length > 0) {
      closeBtn.off('click');
    }
    overlay = this.__findOverlay();
    if (overlay && overlay.length > 0) {
      return overlay.off('click');
    }
  };

  return Modal;

})();

if ($) {
  $.fn.modal = function(settings) {
    if (settings == null) {
      settings = {};
    }
    return new Modal($(this), settings);
  };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tzL21vZGFsLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlcyI6WyJibG9ja3MvbW9kYWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQU07RUFDUyxlQUFDLE9BQUQsRUFBVSxRQUFWOztNQUFVLFdBQVc7O0lBQ2hDLElBQUcsQ0FBSSxPQUFKLElBQWUsT0FBTyxDQUFDLE1BQVIsSUFBa0IsQ0FBcEM7TUFDRSxPQUFPLENBQUMsS0FBUixDQUFjLHdCQUFkLEVBREY7O0lBR0EsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUVYLElBQUMsQ0FBQSxRQUFELEdBQ0U7TUFBQSxnQkFBQSxFQUFrQixjQUFsQjtNQUNBLFlBQUEsRUFBYyxnQkFEZDtNQUVBLGdCQUFBLEVBQWtCLGVBRmxCO01BR0EsU0FBQSxFQUFXLEdBSFg7O0lBS0YsSUFBRyxRQUFIO01BQ0UsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsUUFBakIsRUFERjs7SUFHQSxJQUE2QyxDQUFJLElBQUMsQ0FBQSxRQUFRLENBQUMsU0FBM0Q7TUFBQSxJQUFDLENBQUEsUUFBUSxDQUFDLFNBQVYsR0FBc0IsSUFBQyxDQUFBLFFBQVEsQ0FBQyxVQUFoQzs7SUFDQSxJQUE4QyxDQUFJLElBQUMsQ0FBQSxRQUFRLENBQUMsU0FBNUQ7TUFBQSxJQUFDLENBQUEsUUFBUSxDQUFDLFVBQVYsR0FBdUIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxVQUFqQzs7SUFFQSxJQUFDLENBQUEsT0FBTyxDQUFDLFFBQVQsQ0FBa0IsSUFBQyxDQUFBLFFBQVEsQ0FBQyxnQkFBNUI7SUFFQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxrQkFBZCxFQUFrQyxNQUFsQztJQUVBLElBQUMsQ0FBQSxhQUFELENBQUE7RUF0Qlc7O2tCQXdCYixJQUFBLEdBQU0sU0FBQTtBQUNKLFFBQUE7SUFBQSxLQUFBLEdBQVE7V0FFUixJQUFDLENBQUEsT0FBRCxDQUFTLFNBQUE7YUFBTSxLQUFLLENB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TUFBVCxHQUFrQixDQUFsQztNQUNFLFFBQVEsQ0FBQyxFQUFULENBQVksT0FBWixFQUFxQixTQUFBO2VBQU0sS0FBSyxDQUFDLElBQU4sQ0FBQTtNQUFOLENBQXJCLEVBREY7O0lBR0EsT0FBQSxHQUFVLElBQUMsQ0FBQSxhQUFELENBQUE7SUFFVixJQUFHLE9BQUEsSUFBWSxPQUFPLENBQUMsTUFBUixHQUFpQixDQUFoQzthQUNFLE9BQU8sQ0FBQyxFQUFSLENBQVcsT0FBWCxFQUFvQixTQUFBO2VBQU0sS0FBSyxDQUFDLElBQU4sQ0FBQTtNQUFOLENBQXBCLEVBREY7O0VBVmE7O2tCQWFmLGVBQUEsR0FBaUIsU0FBQTtBQUNmLFFBQUE7SUFBQSxRQUFBLEdBQVcsSUFBQyxDQUFBLGlCQUFELENBQUE7SUFFWCxJQUFHLFFBQUEsSUFBYSxRQUFRLENBQUMsTUFBVCxHQUFrQixDQUFsQztNQUNFLFFBQVEsQ0FBQyxHQUFULENBQWEsT0FBYixFQURGOztJQUdBLE9BQUEsR0FBVSxJQUFDLENBQUEsYUFBRCxDQUFBO0lBRVYsSUFBRyxPQUFBLElBQVksT0FBTyxDQUFDLE1BQVIsR0FBaUIsQ0FBaEM7YUFDRSxPQUFPLENBQUMsR0FBUixDQUFZLE9BQVosRUFERjs7RUFSZTs7Ozs7O0FBV25CLElBQUcsQ0FBSDtFQUNFLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBTCxHQUFhLFNBQUMsUUFBRDs7TUFBQyxXQUFXOztBQUN2QixXQUFPLElBQUksS0FBSixDQUFVLENBQUEsQ0FBRSxJQUFGLENBQVYsRUFBbUIsUUFBbkI7RUFESSxFQURmIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTW9kYWxcclxuICBjb25zdHJ1Y3RvcjogKGVsZW1lbnQsIHNldHRpbmdzID0ge30pIC0+XHJcbiAgICBpZiBub3QgZWxlbWVudCBvciBlbGVtZW50Lmxlbmd0aCA8PSAwXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ9Cd0LXQstC10YDQvdC+INGD0LrQsNC30LDQvSDRjdC70LXQvNC10L3RgicpXHJcblxyXG4gICAgQGVsZW1lbnQgPSBlbGVtZW50XHJcblxyXG4gICAgQHNldHRpbmdzID1cclxuICAgICAgY2xvc2VCdXR0b25DbGFzczogJ21vZGFsX19jbG9zZSdcclxuICAgICAgb3ZlcmxheUNsYXNzOiAnbW9kYWxfX292ZXJsYXknXHJcbiAgICAgIG1vZGFsQWN0aXZlQ2xhc3M6ICdtb2RhbF9fYWN0aXZlJ1xyXG4gICAgICBmYWRlU3BlZWQ6IDMwMFxyXG5cclxuICAgIGlmIHNldHRpbmdzXHJcbiAgICAgIEBfX2NoZWNrU2V0dGluZ3Moc2V0dGluZ3MpXHJcblxyXG4gICAgQHNldHRpbmdzLm9wZW5TcGVlZCA9IEBzZXR0aW5ncy5mYWRlU3BlZWQgaWYgbm90IEBzZXR0aW5ncy5vcGVuU3BlZWRcclxuICAgIEBzZXR0aW5ncy5jbG9zZVNwZWVkID0gQHNldHRpbmdzLmZhZGVTcGVlZCBpZiBub3QgQHNldHRpbmdzLmZhZGVTcGVlZFxyXG5cclxuICAgIEBlbGVtZW50LmFkZENsYXNzKEBzZXR0aW5ncy5tb2RhbEFjdGl2ZUNsYXNzKVxyXG4gICAgXHJcbiAgICBAZWxlbWVudC5hdHRyKCdkYXRhLW1vZGFsLWJsb2NrJywgJ3RydWUnKVxyXG5cclxuICAgIEBfX2JpbmREZWZhdWx0KClcclxuXHJcbiAgc2hvdzogKCkgLT5cclxuICAgICR0aGlzID0gQFxyXG4gICAgXHJcbiAgICBAaGlkZUFsbCgoKSAtPiAkdGhpcy5lbGVtZW50LmZhZGVJbigkdGhpcy5zZXR0aW5ncy5vcGVuU3BlZWQpKVxyXG5cclxuICBoaWRlOiAoKSAtPlxyXG4gICAgJHRoaXMgPSBAXHJcblxyXG4gICAgQGVsZW1lbnQuZmFkZU91dChAc2V0dGluZ3MuZmFkZVNwZWVkLCAoKSAtPlxyXG4gICAgICAkdGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKCR0aGlzLnNldHRpbmdzLm1vZGFsQWN0aXZlQ2xhc3MpXHJcbiAgICAgICR0aGlzLl9fdW5iaW5kRGVmYXVsdCgpXHJcbiAgICApXHJcblxyXG4gIGhpZGVBbGw6IChjYWxsYmFjaykgLT5cclxuICAgICR0aGlzID0gQFxyXG4gICAgXHJcbiAgICAkLmVhY2goJCgnW2RhdGEtbW9kYWwtYmxvY2s9XCJ0cnVlXCJdJyksIChrZXksIG1vZGFsRWxlbWVudCkgLT5cclxuICAgICAgJChtb2RhbEVsZW1lbnQpLmZhZGVPdXQoJHRoaXMuc2V0dGluZ3MuZmFkZVNwZWVkKVxyXG4gICAgKVxyXG4gICAgICAgIFxyXG4gICAgaWYgY2FsbGJhY2tcclxuICAgICAgY2FsbGJhY2soKVxyXG5cclxuICBzZXRTdG9wUHJvcGFnYXRpb246IChlbGVtZW50KSAtPlxyXG4gICAgaWYgZWxlbWVudCBhbmQgZWxlbWVudC5sZW5ndGggPiAwXHJcbiAgICAgIGVsZW1lbnQub24gJ2NsaWNrJywgKGUpIC0+XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgIFxyXG4gIF9fY2hlY2tTZXR0aW5nczogKHNldHRpbmdzKSAtPlxyXG4gICAgZm9yIHNldHRpbmcsIHNldHRpbmdWYWx1ZSBvZiBzZXR0aW5nc1xyXG4gICAgICBzd2l0Y2ggc2V0dGluZ1xyXG4gICAgICAgICMg0JTQu9GPINC60LDQutC+0LPQviDQstC70L7QttC10L3QvdC+0LPQviDRjdC70LXQvNC10L3RgtCwKC3QvtCyKSDQvdC1INC90YPQttC90L4g0L/RgNC40LLRj9C30YvQstCw0YLRjCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LfQsNC60YDRi9GC0LjRjyDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsCDQv9C+INC60LvQuNC60YNcclxuICAgICAgICB3aGVuICdzdG9wUHJvcGFnYXRpb24nXHJcbiAgICAgICAgICBpZiBub3QgdHlwZW9mIHNldHRpbmdWYWx1ZSBpcyAnb2JqZWN0J1xyXG4gICAgICAgICAgICBicmVha1xyXG5cclxuICAgICAgICAgIGlmIEFycmF5LmlzQXJyYXkoc2V0dGluZ1ZhbHVlKVxyXG4gICAgICAgICAgICBmb3Igc3RvcEVsZW1lbnQgaW4gc2V0dGluZ1ZhbHVlXHJcbiAgICAgICAgICAgICAgQHNldFN0b3BQcm9wYWdhdGlvbihzdG9wRWxlbWVudClcclxuICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgQHNldFN0b3BQcm9wYWdhdGlvbihzZXR0aW5nVmFsdWUpXHJcblxyXG4gICAgICAgICAgICAgIyDQmtC70LDRgdGBIFwi0LrRgNC10YHRgtC40LrQsFwiINC30LDQutGA0YvRgtC40Y8g0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuICAgICAgICB3aGVuICdjbG9zZUJ1dHRvbkNsYXNzJywgXFxcclxuICAgICAgICAgICAgICMg0JrQu9Cw0YHRgSDQv9C+0LTQu9C+0LbQutC4INC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXHJcbiAgICAgICAgICAgICAnb3ZlcmxheUNsYXNzJywgXFxcclxuICAgICAgICAgICAgICMg0JrQu9Cw0YHRgSDQsNC60YLQuNCy0L3QvtCz0L4g0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuICAgICAgICAgICAgICdtb2RhbEFjdGl2ZUNsYXNzJywgXFxcclxuICAgICAgICAgICAgICMg0KHQutC+0YDQvtGB0YLRjCDQvtGC0LrRgNGL0YLQuNGPINC4INC30LDQutGA0YvRgtC40Y9cclxuICAgICAgICAgICAgICdmYWRlU3BlZWQnLCBcXFxyXG4gICAgICAgICAgICAgIyDQodC60L7RgNC+0YHRgtGMINC+0YLQutGA0YvRgtC40Y8g0L7QutC90LAgKNC/0LXRgNC10LrRgNGL0LLQsNC10YIgZmFkZVNwZWVkINC00LvRjyDQvtGC0LrRgNGL0YLQuNGPKVxyXG4gICAgICAgICAgICAgJ29wZW5TcGVlZCcsIFxcXHJcbiAgICAgICAgICAgICAjINCh0LrQvtGA0L7RgdGC0Ywg0LfQsNC60YDRi9GC0LjRjyDQvtC60L3QsCAo0L/QtdGA0LXQutGA0YvQstCw0LXRgiBmYWRlU3BlZWQg0LTQu9GPINC30LDQutGA0YvRgtC40Y8pXHJcbiAgICAgICAgICAgICAnY2xvc2VTcGVlZCdcclxuICAgICAgICAgIGlmIHNldHRpbmdWYWx1ZSBhbmQgc2V0dGluZ1ZhbHVlLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgQHNldHRpbmdzW3NldHRpbmddID0gc2V0dGluZ1ZhbHVlXHJcbiAgICAgICAgICAgIFxyXG4gIF9fZmluZENsb3NlQnV0dG9uOiAoKSAtPlxyXG4gICAgcmV0dXJuIEBlbGVtZW50LmZpbmQoXCIuI3tAc2V0dGluZ3MuY2xvc2VCdXR0b25DbGFzc31cIilcclxuICAgIFxyXG4gIF9fZmluZE92ZXJsYXk6ICgpIC0+XHJcbiAgICBvdmVybGF5ID0gbnVsbFxyXG4gICAgaWYgQGVsZW1lbnQuaGFzQ2xhc3MoQHNldHRpbmdzLm92ZXJsYXlDbGFzcylcclxuICAgICAgb3ZlcmxheSA9IEBlbGVtZW50XHJcbiAgICBlbHNlXHJcbiAgICAgIHRyeU92ZXJsYXkgPSBAZWxlbWVudC5maW5kKFwiLiN7QHNldHRpbmdzLm92ZXJsYXlDbGFzc31cIilcclxuXHJcbiAgICAgIGlmIHRyeU92ZXJsYXkgYW5kIHRyeU92ZXJsYXkubGVuZ3RoID4gMFxyXG4gICAgICAgIG92ZXJsYXkgPSB0cnlPdmVybGF5XHJcblxyXG4gICAgcmV0dXJuIG92ZXJsYXlcclxuXHJcbiAgX19iaW5kRGVmYXVsdDogKCkgLT5cclxuICAgICR0aGlzID0gQFxyXG5cclxuICAgIGNsb3NlQnRuID0gQF9fZmluZENsb3NlQnV0dG9uKClcclxuXHJcbiAgICBpZiBjbG9zZUJ0biBhbmQgY2xvc2VCdG4ubGVuZ3RoID4gMFxyXG4gICAgICBjbG9zZUJ0bi5vbiAnY2xpY2snLCAoKSAtPiAkdGhpcy5oaWRlKClcclxuXHJcbiAgICBvdmVybGF5ID0gQF9fZmluZE92ZXJsYXkoKVxyXG5cclxuICAgIGlmIG92ZXJsYXkgYW5kIG92ZXJsYXkubGVuZ3RoID4gMFxyXG4gICAgICBvdmVybGF5Lm9uICdjbGljaycsICgpIC0+ICR0aGlzLmhpZGUoKVxyXG5cclxuICBfX3VuYmluZERlZmF1bHQ6ICgpIC0+XHJcbiAgICBjbG9zZUJ0biA9IEBfX2ZpbmRDbG9zZUJ1dHRvbigpXHJcblxyXG4gICAgaWYgY2xvc2VCdG4gYW5kIGNsb3NlQnRuLmxlbmd0aCA+IDBcclxuICAgICAgY2xvc2VCdG4ub2ZmICdjbGljaydcclxuXHJcbiAgICBvdmVybGF5ID0gQF9fZmluZE92ZXJsYXkoKVxyXG5cclxuICAgIGlmIG92ZXJsYXkgYW5kIG92ZXJsYXkubGVuZ3RoID4gMFxyXG4gICAgICBvdmVybGF5Lm9mZiAnY2xpY2snXHJcbiAgICAgIFxyXG5pZiAkXHJcbiAgJC5mbi5tb2RhbCA9IChzZXR0aW5ncyA9IHt9KSAtPlxyXG4gICAgcmV0dXJuIG5ldyBNb2RhbCgkKHRoaXMpLCBzZXR0aW5ncylcclxuICAiXX0=
