var CustomAutoComplete;

$.ui.autocomplete.prototype._renderItem = function(ul, item) {
  return $('<li></li>').data('item.autocomplete', item).append('<a>' + item.label + '<br/>' + item.desc + '</a>').appendTo(ul);
};


/*
  Events:
    autocompleteBeforeSearch - до начала поиска [строка запроса к ajax'у, CustomAutoComplete]
    autocompleteSearchComplete - сразу после окончания ajax-запроса [результат ajax'а, CustomAutoComplete]
    autocompleteSelect - во время успешного окончания поиска и выбора пункта [выбранный элемент, CustomAutoComplete]
    autocompleteBlur - во время снятия фокуса с элемента [CustomAutoComplete]
 */

CustomAutoComplete = (function() {
  function CustomAutoComplete(element) {
    this.element = element;
    this.url = '/autocomplete.php';
    this.dependencies = {};
    this.destinationElement = null;
    this.emptyResultsMessage = '';
  }

  CustomAutoComplete.prototype.setUrl = function(url1) {
    this.url = url1;
  };

  CustomAutoComplete.prototype.setDependencies = function(dependencies) {
    this.dependencies = dependencies;
  };

  CustomAutoComplete.prototype.setAdditionalElements = function(additionalElements) {
    this.additionalElements = additionalElements;
  };

  CustomAutoComplete.prototype.setEmptyResultsMessage = function(emptyResultsMessage) {
    this.emptyResultsMessage = emptyResultsMessage;
  };

  CustomAutoComplete.prototype.setDependenceRequiredMessage = function(dependenceRequiredMessage) {
    this.dependenceRequiredMessage = dependenceRequiredMessage;
  };

  CustomAutoComplete.prototype.setDestination = function(destinationElement) {
    return this.destinationElement = $('#' + destinationElement);
  };

  CustomAutoComplete.prototype.highlightField = function(element) {
    element.parent().addClass('input-invalid');
    return element.on('focus click', function() {
      return $(this).parent().removeClass('input-invalid');
    });
  };

  CustomAutoComplete.prototype.getQueryString = function(type) {
    var additional, additionalElement, depElement, dependence, i, j, len, len1, ref, ref1, result;
    if (type == null) {
      type = 'city';
    }
    result = "type=" + type;
    if (this.dependencies) {
      if (typeof this.dependencies === 'string') {
        this.dependencies = this.dependencies.split(' ');
      }
      ref = this.dependencies;
      for (i = 0, len = ref.length; i < len; i++) {
        dependence = ref[i];
        depElement = $('#' + dependence);
        if (depElement && depElement.length > 0) {
          result += "&" + (dependence.toUpperCase()) + "=" + (depElement.val());
        }
      }
    }
    if (this.additionalElements) {
      if (typeof this.additionalElements === 'string') {
        this.additionalElements = this.additionalElements.split(' ');
      }
      ref1 = this.additionalElements;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        additional = ref1[j];
        additionalElement = $('#' + additional);
        if (additionalElement && additionalElement.length > 0) {
          result += "&" + (additional.toUpperCase()) + "=" + (additionalElement.val());
        }
      }
    }
    return result;
  };

  CustomAutoComplete.prototype.fillValues = function(id, name) {
    this.element.val(name);
    if (this.destinationElement && this.destinationElement.length > 0) {
      this.destinationElement.val(id);
    }
    return $('.ui-autocomplete').hide();
  };

  CustomAutoComplete.prototype.addElementNote = function(message, element) {
    var existsNote, parent;
    if (element == null) {
      element = this.element;
    }
    parent = element.parent();
    existsNote = parent.find('.js-autocomplete_note');
    if (this.noteTimer) {
      clearTimeout(this.noteTimer);
    }
    if (existsNote && existsNote.length > 0) {
      existsNote.html(message);
    } else {
      parent.append("<p class=\"js-autocomplete_note\" style=\"width: 320px; margin: 0;\">" + message + "</p>");
    }
    return this.noteTimer = setTimeout(function() {
      return parent.find('.js-autocomplete_note').fadeOut(300);
    }, 10000);
  };

  CustomAutoComplete.prototype.removeElementNote = function() {
    var existsNote, parent;
    parent = this.element.parent();
    existsNote = parent.find('.js-autocomplete_note');
    if (existsNote && existsNote.length > 0) {
      existsNote.remove();
      if (this.noteTimer) {
        return clearTimeout(this.noteTimer);
      }
    }
  };

  CustomAutoComplete.prototype.checkDependencies = function() {
    var depElement, dependence, i, lastDepParentElement, len, parentDepElement, ref, result;
    if (typeof this.dependencies === 'string') {
      this.dependencies = this.dependencies.split(' ');
    }
    lastDepParentElement = null;
    result = true;
    ref = this.dependencies;
    for (i = 0, len = ref.length; i < len; i++) {
      dependence = ref[i];
      depElement = $('#' + dependence);
      if ((depElement && depElement.length > 0) && depElement.val().length <= 0) {
        parentDepElement = $('[data-autocomplete-destination-id="' + depElement.attr('id') + '"]');
        if (parentDepElement && parentDepElement.length > 0) {
          this.highlightField(parentDepElement);
          lastDepParentElement = parentDepElement;
        }
        result = false;
      }
    }
    if (lastDepParentElement && lastDepParentElement.length) {
      lastDepParentElement.focus();
      this.addElementNote(this.dependenceRequiredMessage, lastDepParentElement);
    }
    return result;
  };

  CustomAutoComplete.prototype.start = function(type) {
    var $this;
    $this = this;
    if (this.element && this.element.length > 0) {
      return this.element.autocomplete({
        minLength: 0,
        autoFocus: true,
        delay: 500,
        source: function(request, response) {
          var concatSymbol, string, url;
          if (!$this.checkDependencies()) {
            $this.fillValues('', '');
            return;
          }
          string = $this.getQueryString(type);
          $this.removeElementNote();
          if (string.length > 0) {
            concatSymbol = $this.url.indexOf('?') > 0 ? '&' : '?';
          }
          url = $this.url + concatSymbol + string + '&term=' + request.term;
          $this.element.trigger('autocompleteBeforeSearch', [string, $this]);
          return $.ajax({
            url: url,
            dataType: 'json',
            success: function(result) {
              var value;
              if (result) {
                $this.element.trigger('autocompleteSearchComplete', [result, $this]);
                switch (result.type) {
                  case 'match':
                    if (result.values.length === 1) {
                      value = result.values[0];
                      $this.fillValues(value.id, value.value);
			          $this.element.trigger('autocompleteSelect', [value, $this]);
                      if (result.hasOwnProperty('text') && result.text.length > 0) {
                        return $this.addElementNote(result.text);
                      }
                    }
                    break;
                  case 'ok':
                    if (result.values.length > 0) {
                      if (result.hasOwnProperty('text') && result.text.length > 0) {
                        $this.addElementNote(result.text);
                      }
                      return response(result.values);
                    }
                    break;
                  case 'error':
                    if (!result.values || result.values.length <= 0) {
                      if ($this.emptyResultsMessage && $this.emptyResultsMessage.length > 0) {
                        return $this.addElementNote($this.emptyResultsMessage);
                      } else {
                        $this.fillValues('', request.term);
                        if (result.hasOwnProperty('text') && result.text.length > 0) {
                          return $this.addElementNote(result.text);
                        }
                      }
                    }
                }
              }
            }
          });
        },
        select: function(event, ui) {
          if (ui && ui.hasOwnProperty('item')) {
            $this.fillValues(ui.item.id, ui.item.value);
            return $this.element.trigger('autocompleteSelect', [ui.item, $this]);
          }
        }
      }).on('blur', function() {
        $this.element.trigger('autocompleteBlur', $this);
        if ($this.destinationElement && $this.destinationElement.length > 0) {
          if ($this.destinationElement.val().length <= 0 || $this.destinationElement.val() === '0') {
            $this.element.val('');
          }
          if ($this.element.val().length <= 0) {
            return $this.fillValues('', '');
          }
        }
      });
    }
  };

  return CustomAutoComplete;

})();

$(function() {
  var autoCompletes;
  autoCompletes = $('[data-autocomplete="true"]');
  return $.each(autoCompletes, function(key, autoComplete) {
    var entity;
    autoComplete = $(autoComplete);
    entity = new CustomAutoComplete(autoComplete);
    entity.setDependencies(autoComplete.data('autocomplete-dependencies'));
    entity.setAdditionalElements(autoComplete.data('autocomplete-additional'));
    entity.setDestination(autoComplete.data('autocomplete-destination-id'));
    entity.setEmptyResultsMessage(autoComplete.data('autocomplete-empty-message'));
    entity.setDependenceRequiredMessage(autoComplete.data('autocomplete-dependence-required-message') || 'Сначала необходимо заполнить это поле');
    return entity.start(autoComplete.data('autocomplete-type'));
  });
});
