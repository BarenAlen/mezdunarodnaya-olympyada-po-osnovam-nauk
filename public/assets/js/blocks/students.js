$(function() {
  var CheckCounter, btn, checkUserItemsDependencies, counter, firstRow, gradeActiveEvent, myStudentsSwitcher, search;
  $('.js-toggle_filter').on('click', function(e) {
    var filter, newMessage, oldMessage;
    e.preventDefault();
    filter = $(this).data('toggle-element');
    if (filter && filter.length > 0) {
      filter = $('#' + filter);
      if (filter && filter.length > 0) {
        newMessage = $(this).data('toggle-message');
        oldMessage = $(this).text();
        if (newMessage && newMessage.length > 0) {
          $(this).data('toggle-message', oldMessage);
          $(this).text(newMessage);
        }
        return filter.slideToggle();
      }
    }
  });
  gradeActiveEvent = function() {
    var biggestGrade, biggestOffset, gradeNavLinks, gradeTitles, gradesPositions, header, scrollTop;
    gradeNavLinks = $('.js-group');
    gradeTitles = $('.js-title');
    gradesPositions = {};
    header = $('.control-header');
    $.each(gradeNavLinks, function(key, grade) {
      var gradeHeight;
      if ($(grade).is(':visible')) {
        gradeHeight = $(grade).offset().top;
        if (header && header.length > 0) {
          gradeHeight -= header.height() * 1.5;
        }
        return gradesPositions[gradeHeight] = $(grade).attr('id');
      }
    });
    scrollTop = $(window).scrollTop();
    biggestOffset = 0;
    biggestGrade = null;
    $.each(gradesPositions, function(topOffset, gradeID) {
      topOffset = parseInt(topOffset);
      if (topOffset <= scrollTop && topOffset > biggestOffset) {
        biggestOffset = topOffset;
        return biggestGrade = gradeID;
      }
    });
    gradeTitles.filter('.active').removeClass('active');
    if (biggestOffset > 0) {
      gradeTitles.find('a[href="#' + biggestGrade + '"]').parent().addClass('active');
    }
    return gradeTitles.find('a').on('click', function(event) {
      var grade, gradeHeight;
      event.preventDefault();
      grade = $(this).attr('href');
      if (grade !== void 0) {
        window.location.hash = grade;
        gradeHeight = $(grade).offset().top;
        if (header && header.length > 0) {
          gradeHeight -= header.height() * 1.5;
        }
        return $(window).scrollTop(gradeHeight);
      }
    });
  };
  $(window).on('scroll', gradeActiveEvent);
  gradeActiveEvent();
  CheckCounter = (function() {
    function CheckCounter() {
      var self;
      self = this;
      $('.js-check:visible').on('change', function() {
        return self.counter();
      });
      $('.js-check-group').on('change', function() {
        self.checkGroup(this);
        return self.counter();
      });
      $('.js-check-all').on('change', function() {
        self.checkAll();
        return self.counter();
      });
    }

    CheckCounter.prototype.addCheckEvent = function(event) {
      return $('.js-check:visible').on('change', function() {
        return event(this);
      });
    };

    CheckCounter.prototype.counter = function() {
      var checkInputs, counter, disabledButtons;
      checkInputs = $('.js-check:visible');
      disabledButtons = $('.js-disabled_buttons');
      counter = checkInputs.filter(':checked').length;
      disabledButtons.prop('disabled', counter <= 0);
      $('.js-check-all').prop('checked', counter === checkInputs.length);
      return $('.js-check-counter').text(counter);
    };

    CheckCounter.prototype.checkGroup = function(group) {
      var groupBlock, inputs;
      groupBlock = $($(group).data('group'));
      inputs = groupBlock.find('.js-check:visible');
      return inputs.prop('checked', $(group).prop('checked'));
    };

    CheckCounter.prototype.checkAll = function() {
      var checkedAll;
      checkedAll = $('.js-check-all').prop('checked');
      $('.js-check-group').prop('checked', checkedAll);
      return $('.js-check:visible').prop('checked', checkedAll);
    };

    return CheckCounter;

  })();
  counter = new CheckCounter();
  counter.addCheckEvent(function() {
    var isAddToMineButtonShow, isRemoveFromMineButtonShow;
    isAddToMineButtonShow = false;
    isRemoveFromMineButtonShow = false;
    $.each($('.js-check:visible'), function(key, element) {
      var userItem;
      userItem = $(element).closest('.userItem');
      if ($(element).prop('checked')) {
        if (userItem.hasClass('js-my_student')) {
          return isRemoveFromMineButtonShow = true;
        } else {
          return isAddToMineButtonShow = true;
        }
      }
    });
    $('.js-disabled_buttons[name="ADD_TO_MINE"]').parent().toggle(isAddToMineButtonShow);
    return $('.js-disabled_buttons[name="REMOVE_FROM_MINE"]').parent().toggle(isRemoveFromMineButtonShow);
  });
  checkUserItemsDependencies = function(items) {
    return $.each(items, function(dependence, shownCount) {
      return $(dependence).toggle(shownCount > 0);
    });
  };
  search = $('.js-search_by');
  myStudentsSwitcher = $('.js-my_students_switch');
  search.on('keyup', function(event) {
    var dependencies, names, regExp, val;
    val = $(this).val();
    names = $('.js-student_name');
    if (names && names.length > 0 && event.keyCode !== 16) {
      regExp = new RegExp('^' + val, 'i');
      dependencies = {};
      $.each(names, function(key, name) {
        var dependence, i, itemDependencies, j, len, len1, results, userItem;
        userItem = $(name).closest('.userItem');
        if (myStudentsSwitcher.prop('checked') && !userItem.hasClass('js-my_student')) {
          return;
        }
        itemDependencies = userItem.data('dependence');
        itemDependencies = itemDependencies.split(' ');
        for (i = 0, len = itemDependencies.length; i < len; i++) {
          dependence = itemDependencies[i];
          if (!dependencies.hasOwnProperty(dependence)) {
            dependencies[dependence] = 0;
          }
        }
        if (val && val.length > 0 && $(name).text().trim().match(regExp) === null) {
          return userItem.hide();
        } else {
          userItem.show();
          results = [];
          for (j = 0, len1 = itemDependencies.length; j < len1; j++) {
            dependence = itemDependencies[j];
            results.push(dependencies[dependence]++);
          }
          return results;
        }
      });
      return checkUserItemsDependencies(dependencies);
    }
  });
  myStudentsSwitcher.on('change', function() {
    var collectNotMyStudentsDependencies, dependencies, isChecked, myStudents, notMyStudents, students;
    students = $('.userItem');
    myStudents = students.filter('.js-my_student');
    notMyStudents = students.not('.js-my_student');
    isChecked = $(this).prop('checked');
    $.post('/ajax/session.php', {
      DATA: {
        LIST_TYPE: isChecked ? 'MY' : 'ALL'
      }
    });
    collectNotMyStudentsDependencies = function() {
      var dependencies;
      dependencies = {};
      $.each(notMyStudents, function(key, notMyStudent) {
        var dependence, i, itemDependencies, len, results;
        itemDependencies = $(notMyStudent).data('dependence');
        itemDependencies = itemDependencies.split(' ');
        results = [];
        for (i = 0, len = itemDependencies.length; i < len; i++) {
          dependence = itemDependencies[i];
          results.push(dependencies[dependence] = 0);
        }
        return results;
      });
      return dependencies;
    };
    if (isChecked) {
      dependencies = collectNotMyStudentsDependencies();
      $.each(myStudents, function(key, myStudent) {
        var dependence, i, itemDependencies, len, results;
        itemDependencies = $(myStudent).data('dependence');
        itemDependencies = itemDependencies.split(' ');
        results = [];
        for (i = 0, len = itemDependencies.length; i < len; i++) {
          dependence = itemDependencies[i];
          if (dependencies.hasOwnProperty(dependence)) {
            results.push(delete dependencies[dependence]);
          } else {
            results.push(void 0);
          }
        }
        return results;
      });
      checkUserItemsDependencies(dependencies);
      notMyStudents.hide();
      myStudents.show();
    } else {
      $.each(collectNotMyStudentsDependencies(), function(dependence) {
        return $(dependence).show();
      });
      students.show();
    }
    if (search.length && search.val().length > 0) {
      return search.keyup();
    }
  });
  myStudentsSwitcher.change();
  $(window).scroll();
  btn = $('#btn-stick');
  btn.data('top', btn.offset().top);
  firstRow = $('.students-application-table__body-row')[1];
  $(window).scroll(function() {
    var scrollBottom;
    if (firstRow) {
      scrollBottom = $(window).scrollTop() + $(window).height();
      if (scrollBottom >= btn.data('top') || scrollBottom < $(firstRow).offset().top) {
        return btn.removeClass('fixed');
      } else if (scrollBottom < btn.data('top')) {
        if (scrollBottom > $(firstRow).offset().top) {
          return btn.addClass('fixed');
        }
      }
    }
  });
  return $(window).scroll();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tzL3N0dWRlbnRzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlcyI6WyJibG9ja3Mvc3R1ZGVudHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUEsQ0FBRSxTQUFBO0FBQ0EsTUFBQTtFQUFBLENBQUEsQ0FBRSxtQkFBRixDQUFzQixDQUFDLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLFNBQUMsQ0FBRDtBQUNqQyxRQUFBO0lBQUEsQ0FBQyxDQUFDLGNBQUYsQ0FBQTtJQUVBLE1BQUEsR0FBUyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLGdCQUFiO0lBRVQsSUFBRyxNQUFBLElBQVcsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBOUI7TUFDRSxNQUFBLEdBQVMsQ0FBQSxDQUFFLEdBQUEsR0FBTSxNQUFSO01BRVQsSUFBRyxNQUFBLElBQVcsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBOUI7UUFDRSxVQUFBLEdBQWEsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxnQkFBYjtRQUNiLFVBQUEsR0FBYSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFBO1FBRWIsSUFBRyxVQUFBLElBQWUsVUFBVSxDQUFDLE1BQVgsR0FBb0IsQ0FBdEM7VUFDRSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLGdCQUFiLEVBQStCLFVBQS9CO1VBQ0EsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxVQUFiLEVBRkY7O2VBSUEsTUFBTSxDQUFDLFdBQVAsQ0FBQSxFQVJGO09BSEY7O0VBTGlDLENBQW5DO0VBa0JBLGdCQUFBLEdBQW1CLFNBQUE7QUFDakIsUUFBQTtJQUFBLGFBQUEsR0FBZ0IsQ0FBQSxDQUFFLFdBQUY7SUFDaEIsV0FBQSxHQUFjLENBQUEsQ0FBRSxXQUFGO0lBQ2QsZUFBQSxHQUFrQjtJQUVsQixNQUFBLEdBQVMsQ0FBQSxDQUFFLGlCQUFG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R0FBRyxDQUFDLElBQUosQ0FBUyxLQUFULENBQWhCLElBQW1DLFlBQUEsR0FBZSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsTUFBWixDQUFBLENBQW9CLENBQUMsR0FBMUU7ZUFDRSxHQUFHLENBQUMsV0FBSixDQUFnQixPQUFoQixFQURGO09BQUEsTUFFSyxJQUFHLFlBQUEsR0FBZSxHQUFHLENBQUMsSUFBSixDQUFTLEtBQVQsQ0FBbEI7UUFDSCxJQUFHLFlBQUEsR0FBZSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsTUFBWixDQUFBLENBQW9CLENBQUMsR0FBdkM7aUJBQ0UsR0FBRyxDQUFDLFFBQUosQ0FBYSxPQUFiLEVBREY7U0FERztPQUpQOztFQURlLENBQWpCO1NBUUEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE1BQVYsQ0FBQTtBQXRQQSxDQUFGIiwic291cmNlc0NvbnRlbnQiOlsiJCAtPlxyXG4gICQoJy5qcy10b2dnbGVfZmlsdGVyJykub24gJ2NsaWNrJywgKGUpIC0+XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIFxyXG4gICAgZmlsdGVyID0gJCh0aGlzKS5kYXRhKCd0b2dnbGUtZWxlbWVudCcpXHJcblxyXG4gICAgaWYgZmlsdGVyIGFuZCBmaWx0ZXIubGVuZ3RoID4gMFxyXG4gICAgICBmaWx0ZXIgPSAkKCcjJyArIGZpbHRlcilcclxuICAgICAgXHJcbiAgICAgIGlmIGZpbHRlciBhbmQgZmlsdGVyLmxlbmd0aCA+IDBcclxuICAgICAgICBuZXdNZXNzYWdlID0gJCh0aGlzKS5kYXRhKCd0b2dnbGUtbWVzc2FnZScpXHJcbiAgICAgICAgb2xkTWVzc2FnZSA9ICQodGhpcykudGV4dCgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgbmV3TWVzc2FnZSBhbmQgbmV3TWVzc2FnZS5sZW5ndGggPiAwXHJcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoJ3RvZ2dsZS1tZXNzYWdlJywgb2xkTWVzc2FnZSlcclxuICAgICAgICAgICQodGhpcykudGV4dChuZXdNZXNzYWdlKVxyXG5cclxuICAgICAgICBmaWx0ZXIuc2xpZGVUb2dnbGUoKVxyXG4gIFxyXG4gIGdyYWRlQWN0aXZlRXZlbnQgPSAtPlxyXG4gICAgZ3JhZGVOYXZMaW5rcyA9ICQoJy5qcy1ncm91cCcpXHJcbiAgICBncmFkZVRpdGxlcyA9ICQoJy5qcy10aXRsZScpXHJcbiAgICBncmFkZXNQb3NpdGlvbnMgPSB7fVxyXG5cclxuICAgIGhlYWRlciA9ICQoJy5jb250cm9sLWhlYWRlcicpXHJcblxyXG4gICAgIyDQn9GA0L7RgdGC0LDQstC70LXQvdC40LUg0YHRgdGL0LvQutC4INC60LvQsNGB0YHQsCDQsNC60YLQuNCy0L3QvtC5INC/0YDQuCDQv9GA0L7QvNCw0YLRi9Cy0LDQvdC40Lgg0YHRgtGA0LDQvdC40YbRiyDQtNC+INC90YPQttC90L7Qs9C+INC80LXRgdGC0LBcclxuICAgICQuZWFjaChncmFkZU5hdkxpbmtzLCAoa2V5LCBncmFkZSkgLT5cclxuICAgICAgaWYgJChncmFkZSkuaXMoJzp2aXNpYmxlJylcclxuICAgICAgICBncmFkZUhlaWdodCA9ICQoZ3JhZGUpLm9mZnNldCgpLnRvcFxyXG4gICAgICAgIGlmIGhlYWRlciBhbmQgaGVhZGVyLmxlbmd0aCA+IDBcclxuICAgICAgICAgIGdyYWRlSGVpZ2h0IC09IChoZWFkZXIuaGVpZ2h0KCkgKiAxLjUpXHJcblxyXG4gICAgICAgIGdyYWRlc1Bvc2l0aW9uc1tncmFkZUhlaWdodF0gPSAkKGdyYWRlKS5hdHRyKCdpZCcpXHJcbiAgICApXHJcblxyXG4gICAgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpXHJcblxyXG4gICAgYmlnZ2VzdE9mZnNldCA9IDBcclxuICAgIGJpZ2dlc3RHcmFkZSA9IG51bGxcclxuICAgICQuZWFjaChncmFkZXNQb3NpdGlvbnMsICh0b3BPZmZzZXQsIGdyYWRlSUQpIC0+XHJcbiAgICAgIHRvcE9mZnNldCA9IHBhcnNlSW50KHRvcE9mZnNldClcclxuICAgICAgaWYgdG9wT2Zmc2V0IDw9IHNjcm9sbFRvcCBhbmQgdG9wT2Zmc2V0ID4gYmlnZ2VzdE9mZnNldFxyXG4gICAgICAgIGJpZ2dlc3RPZmZzZXQgPSB0b3BPZmZzZXRcclxuICAgICAgICBiaWdnZXN0R3JhZGUgPSBncmFkZUlEXHJcbiAgICApXHJcblxyXG4gICAgZ3JhZGVUaXRsZXMuZmlsdGVyKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcblxyXG4gICAgaWYgYmlnZ2VzdE9mZnNldCA+IDBcclxuICAgICAgZ3JhZGVUaXRsZXMuZmluZCgnYVtocmVmPVwiIycgKyBiaWdnZXN0R3JhZGUgKyAnXCJdJykucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcblxyXG4gICAgIyDQn9GA0L7QvNCw0YLRi9Cy0LDQvdC40LUg0YHRgtGA0LDQvdC40YbRiyDQtNC+INC90YPQttC90L7Qs9C+INGB0L/QuNGB0LrQsCDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0L3QsCDRgdGB0YvQu9C60YMg0LrQu9Cw0YHRgdCwXHJcbiAgICBncmFkZVRpdGxlcy5maW5kKCdhJykub24gJ2NsaWNrJywgKGV2ZW50KSAtPlxyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgICBncmFkZSA9ICQodGhpcykuYXR0cignaHJlZicpXHJcblxyXG4gICAgICBpZiBncmFkZSBpc250IHVuZGVmaW5lZFxyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gZ3JhZGVcclxuXHJcbiAgICAgICAgZ3JhZGVIZWlnaHQgPSAkKGdyYWRlKS5vZmZzZXQoKS50b3BcclxuICAgICAgICBpZiBoZWFkZXIgYW5kIGhlYWRlci5sZW5ndGggPiAwXHJcbiAgICAgICAgICBncmFkZUhlaWdodCAtPSAoaGVhZGVyLmhlaWdodCgpICogMS41KVxyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKGdyYWRlSGVpZ2h0KVxyXG5cclxuICAkKHdpbmRvdykub24gJ3Njcm9sbCcsIGdyYWRlQWN0aXZlRXZlbnRcclxuXHJcbiAgZ3JhZGVBY3RpdmVFdmVudCgpXHJcblxyXG4gICMg0KHRh9C10YLRh9C40Log0L/RgNC+0YHRgtCw0LLQu9C10L3QvdGL0YUg0LPQsNC70L7Rh9C10LpcclxuICBjbGFzcyBDaGVja0NvdW50ZXJcclxuICAgIGNvbnN0cnVjdG9yOiAtPlxyXG4gICAgICBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgJCgnLmpzLWNoZWNrOnZpc2libGUnKS5vbiAnY2hhbmdlJywgKCkgLT5cclxuICAgICAgICBzZWxmLmNvdW50ZXIoKVxyXG5cclxuICAgICAgJCgnLmpzLWNoZWNrLWdyb3VwJykub24gJ2NoYW5nZScsICgpIC0+XHJcbiAgICAgICAgc2VsZi5jaGVja0dyb3VwKHRoaXMpXHJcbiAgICAgICAgc2VsZi5jb3VudGVyKClcclxuXHJcbiAgICAgICQoJy5qcy1jaGVjay1hbGwnKS5vbiAnY2hhbmdlJywgKCkgLT5cclxuICAgICAgICBzZWxmLmNoZWNrQWxsKClcclxuICAgICAgICBzZWxmLmNvdW50ZXIoKVxyXG5cclxuICAgIGFkZENoZWNrRXZlbnQ6IChldmVudCkgLT5cclxuICAgICAgJCgnLmpzLWNoZWNrOnZpc2libGUnKS5vbiAnY2hhbmdlJywgKCkgLT5cclxuICAgICAgICBldmVudCh0aGlzKVxyXG5cclxuICAgIGNvdW50ZXI6IC0+XHJcbiAgICAgIGNoZWNrSW5wdXRzID0gJCgnLmpzLWNoZWNrOnZpc2libGUnKVxyXG4gICAgICBkaXNhYmxlZEJ1dHRvbnMgPSAkKCcuanMtZGlzYWJsZWRfYnV0dG9ucycpXHJcblxyXG4gICAgICBjb3VudGVyID0gY2hlY2tJbnB1dHMuZmlsdGVyKCc6Y2hlY2tlZCcpLmxlbmd0aFxyXG5cclxuICAgICAgZGlzYWJsZWRCdXR0b25zLnByb3AoJ2Rpc2FibGVkJywgKGNvdW50ZXIgPD0gMCkpXHJcblxyXG4gICAgICAkKCcuanMtY2hlY2stYWxsJykucHJvcCgnY2hlY2tlZCcsIChjb3VudGVyID09IGNoZWNrSW5wdXRzLmxlbmd0aCkpXHJcblxyXG4gICAgICAkKCcuanMtY2hlY2stY291bnRlcicpLnRleHQoY291bnRlcilcclxuXHJcbiAgICBjaGVja0dyb3VwOiAoZ3JvdXApIC0+XHJcbiAgICAgIGdyb3VwQmxvY2sgPSAkKCQoZ3JvdXApLmRhdGEoJ2dyb3VwJykpXHJcbiAgICAgIGlucHV0cyA9IGdyb3VwQmxvY2suZmluZCgnLmpzLWNoZWNrOnZpc2libGUnKVxyXG5cclxuICAgICAgaW5wdXRzLnByb3AoJ2NoZWNrZWQnLCAkKGdyb3VwKS5wcm9wKCdjaGVja2VkJykpXHJcblxyXG4gICAgY2hlY2tBbGw6IC0+XHJcbiAgICAgIGNoZWNrZWRBbGwgPSAkKCcuanMtY2hlY2stYWxsJykucHJvcCgnY2hlY2tlZCcpXHJcblxyXG4gICAgICAkKCcuanMtY2hlY2stZ3JvdXAnKS5wcm9wKCdjaGVja2VkJywgY2hlY2tlZEFsbClcclxuICAgICAgJCgnLmpzLWNoZWNrOnZpc2libGUnKS5wcm9wKCdjaGVja2VkJywgY2hlY2tlZEFsbClcclxuXHJcbiAgY291bnRlciA9IG5ldyBDaGVja0NvdW50ZXIoKVxyXG4gIGNvdW50ZXIuYWRkQ2hlY2tFdmVudCgoKSAtPlxyXG4gICAgaXNBZGRUb01pbmVCdXR0b25TaG93ID0gZmFsc2VcclxuICAgIGlzUmVtb3ZlRnJvbU1pbmVCdXR0b25TaG93ID0gZmFsc2VcclxuICAgICQuZWFjaCgkKCcuanMtY2hlY2s6dmlzaWJsZScpLCAoa2V5LCBlbGVtZW50KSAtPlxyXG4gICAgICB1c2VySXRlbSA9ICQoZWxlbWVudCkuY2xvc2VzdCgnLnVzZXJJdGVtJylcclxuXHJcbiAgICAgIGlmICQoZWxlbWVudCkucHJvcCgnY2hlY2tlZCcpXHJcbiAgICAgICAgaWYgdXNlckl0ZW0uaGFzQ2xhc3MoJ2pzLW15X3N0dWRlbnQnKVxyXG4gICAgICAgICAgaXNSZW1vdmVGcm9tTWluZUJ1dHRvblNob3cgPSB0cnVlXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgaXNBZGRUb01pbmVCdXR0b25TaG93ID0gdHJ1ZVxyXG4gICAgKVxyXG5cclxuICAgICQoJy5qcy1kaXNhYmxlZF9idXR0b25zW25hbWU9XCJBRERfVE9fTUlORVwiXScpLnBhcmVudCgpLnRvZ2dsZShpc0FkZFRvTWluZUJ1dHRvblNob3cpXHJcbiAgICAkKCcuanMtZGlzYWJsZWRfYnV0dG9uc1tuYW1lPVwiUkVNT1ZFX0ZST01fTUlORVwiXScpLnBhcmVudCgpLnRvZ2dsZShpc1JlbW92ZUZyb21NaW5lQnV0dG9uU2hvdylcclxuICApO1xyXG5cclxuICBjaGVja1VzZXJJdGVtc0RlcGVuZGVuY2llcyA9IChpdGVtcykgLT5cclxuICAgICQuZWFjaChpdGVtcywgKGRlcGVuZGVuY2UsIHNob3duQ291bnQpIC0+XHJcbiAgICAgICQoZGVwZW5kZW5jZSkudG9nZ2xlKHNob3duQ291bnQgPiAwKVxyXG4gICAgKVxyXG5cclxuICBzZWFyY2ggPSAkKCcuanMtc2VhcmNoX2J5JylcclxuICBteVN0dWRlbnRzU3dpdGNoZXIgPSAkKCcuanMtbXlfc3R1ZGVudHNfc3dpdGNoJylcclxuICBcclxuICAjINCf0L7QuNGB0Log0L/QviDRhNCw0LzQuNC70LjQuCDRg9GH0LXQvdC40LrQsFxyXG4gIHNlYXJjaC5vbiAna2V5dXAnLCAoZXZlbnQpIC0+XHJcbiAgICB2YWwgPSAkKHRoaXMpLnZhbCgpXHJcbiAgICBuYW1lcyA9ICQoJy5qcy1zdHVkZW50X25hbWUnKVxyXG5cclxuICAgIGlmIG5hbWVzIGFuZCBuYW1lcy5sZW5ndGggPiAwIGFuZCBldmVudC5rZXlDb2RlICE9IDE2ICMgU2hpZnQga2V5XHJcbiAgICAgIHJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14nICsgdmFsLCAnaScpXHJcblxyXG4gICAgICBkZXBlbmRlbmNpZXMgPSB7fVxyXG4gICAgICAkLmVhY2gobmFtZXMsIChrZXksIG5hbWUpIC0+XHJcbiAgICAgICAgdXNlckl0ZW0gPSAkKG5hbWUpLmNsb3Nlc3QoJy51c2VySXRlbScpXHJcblxyXG4gICAgICAgICMg0JTQu9GPINC+0LTQvdC+0LLRgNC10LzQtdC90L3QvtC5INGA0LDQsdC+0YLRiyBcItCc0L7QuNGFINGB0YLRg9C00LXQvdGC0L7QslwiINC4INC/0L7QuNGB0LrQsFxyXG4gICAgICAgIGlmIG15U3R1ZGVudHNTd2l0Y2hlci5wcm9wKCdjaGVja2VkJykgYW5kIG5vdCB1c2VySXRlbS5oYXNDbGFzcygnanMtbXlfc3R1ZGVudCcpXHJcbiAgICAgICAgICByZXR1cm5cclxuXHJcbiAgICAgICAgaXRlbURlcGVuZGVuY2llcyA9IHVzZXJJdGVtLmRhdGEoJ2RlcGVuZGVuY2UnKVxyXG4gICAgICAgIGl0ZW1EZXBlbmRlbmNpZXMgPSBpdGVtRGVwZW5kZW5jaWVzLnNwbGl0KCcgJylcclxuXHJcbiAgICAgICAgZm9yIGRlcGVuZGVuY2UgaW4gaXRlbURlcGVuZGVuY2llc1xyXG4gICAgICAgICAgaWYgbm90IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShkZXBlbmRlbmNlKVxyXG4gICAgICAgICAgICBkZXBlbmRlbmNpZXNbZGVwZW5kZW5jZV0gPSAwXHJcblxyXG4gICAgICAgIGlmIHZhbCBhbmQgdmFsLmxlbmd0aCA+IDAgYW5kICQobmFtZSkudGV4dCgpLnRyaW0oKS5tYXRjaChyZWdFeHApIGlzIG51bGxcclxuICAgICAgICAgIHVzZXJJdGVtLmhpZGUoKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHVzZXJJdGVtLnNob3coKVxyXG5cclxuICAgICAgICAgIGZvciBkZXBlbmRlbmNlIGluIGl0ZW1EZXBlbmRlbmNpZXNcclxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzW2RlcGVuZGVuY2VdKytcclxuICAgICAgKVxyXG5cclxuICAgICAgY2hlY2tVc2VySXRlbXNEZXBlbmRlbmNpZXMoZGVwZW5kZW5jaWVzKVxyXG5cclxuICAjINCf0LXRgNC10LrQu9GO0YfQsNGC0LXQu9GMIFwi0JzQvtC4INGD0YfQtdC90LjQutC4XCJcclxuICBteVN0dWRlbnRzU3dpdGNoZXIub24gJ2NoYW5nZScsICgpIC0+XHJcbiAgICBzdHVkZW50cyA9ICQoJy51c2VySXRlbScpXHJcblxyXG4gICAgbXlTdHVkZW50cyA9IHN0dWRlbnRzLmZpbHRlcignLmpzLW15X3N0dWRlbnQnKVxyXG4gICAgbm90TXlTdHVkZW50cyA9IHN0dWRlbnRzLm5vdCgnLmpzLW15X3N0dWRlbnQnKVxyXG5cclxuICAgIGlzQ2hlY2tlZCA9ICQodGhpcykucHJvcCgnY2hlY2tlZCcpXHJcbiAgICBcclxuICAgICQucG9zdChcclxuICAgICAgJy9hamF4L3Nlc3Npb24ucGhwJ1xyXG4gICAgICB7XHJcbiAgICAgICAgREFUQTpcclxuICAgICAgICAgIExJU1RfVFlQRTogaWYgaXNDaGVja2VkIHRoZW4gJ01ZJyBlbHNlICdBTEwnXHJcbiAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICBjb2xsZWN0Tm90TXlTdHVkZW50c0RlcGVuZGVuY2llcyA9IC0+XHJcbiAgICAgIGRlcGVuZGVuY2llcyA9IHt9XHJcbiAgICAgICQuZWFjaChub3RNeVN0dWRlbnRzLCAoa2V5LCBub3RNeVN0dWRlbnQpIC0+XHJcbiAgICAgICAgaXRlbURlcGVuZGVuY2llcyA9ICQobm90TXlTdHVkZW50KS5kYXRhKCdkZXBlbmRlbmNlJylcclxuICAgICAgICBpdGVtRGVwZW5kZW5jaWVzID0gaXRlbURlcGVuZGVuY2llcy5zcGxpdCgnICcpXHJcblxyXG4gICAgICAgIGZvciBkZXBlbmRlbmNlIGluIGl0ZW1EZXBlbmRlbmNpZXNcclxuICAgICAgICAgIGRlcGVuZGVuY2llc1tkZXBlbmRlbmNlXSA9IDBcclxuICAgICAgKVxyXG5cclxuICAgICAgcmV0dXJuIGRlcGVuZGVuY2llc1xyXG5cclxuICAgIGlmIGlzQ2hlY2tlZFxyXG4gICAgICBkZXBlbmRlbmNpZXMgPSBjb2xsZWN0Tm90TXlTdHVkZW50c0RlcGVuZGVuY2llcygpXHJcblxyXG4gICAgICAkLmVhY2gobXlTdHVkZW50cywgKGtleSwgbXlTdHVkZW50KSAtPlxyXG4gICAgICAgIGl0ZW1EZXBlbmRlbmNpZXMgPSAkKG15U3R1ZGVudCkuZGF0YSgnZGVwZW5kZW5jZScpXHJcbiAgICAgICAgaXRlbURlcGVuZGVuY2llcyA9IGl0ZW1EZXBlbmRlbmNpZXMuc3BsaXQoJyAnKVxyXG5cclxuICAgICAgICBmb3IgZGVwZW5kZW5jZSBpbiBpdGVtRGVwZW5kZW5jaWVzXHJcbiAgICAgICAgICBpZiBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoZGVwZW5kZW5jZSlcclxuICAgICAgICAgICAgZGVsZXRlIGRlcGVuZGVuY2llc1tkZXBlbmRlbmNlXVxyXG4gICAgICApXHJcblxyXG4gICAgICBjaGVja1VzZXJJdGVtc0RlcGVuZGVuY2llcyhkZXBlbmRlbmNpZXMpXHJcblxyXG4gICAgICBub3RNeVN0dWRlbnRzLmhpZGUoKVxyXG4gICAgICBteVN0dWRlbnRzLnNob3coKVxyXG4gICAgZWxzZVxyXG4gICAgICAkLmVhY2goY29sbGVjdE5vdE15U3R1ZGVudHNEZXBlbmRlbmNpZXMoKSwgKGRlcGVuZGVuY2UpIC0+XHJcbiAgICAgICAgJChkZXBlbmRlbmNlKS5zaG93KClcclxuICAgICAgKVxyXG5cclxuICAgICAgc3R1ZGVudHMuc2hvdygpXHJcblxyXG4gICAgIyDQlNC70Y8g0L7QtNC90L7QstGA0LXQvNC10L3QvdC+0Lkg0YDQsNCx0L7RgtGLIFwi0JzQvtC40YUg0YHRgtGD0LTQtdC90YLQvtCyXCIg0Lgg0L/QvtC40YHQutCwXHJcbiAgICBpZiBzZWFyY2gubGVuZ3RoIGFuZCBzZWFyY2gudmFsKCkubGVuZ3RoID4gMFxyXG4gICAgICBzZWFyY2gua2V5dXAoKVxyXG5cclxuICBteVN0dWRlbnRzU3dpdGNoZXIuY2hhbmdlKClcclxuICAkKHdpbmRvdykuc2Nyb2xsKClcclxuXHJcbiAgIyDQn9GA0LjQutGA0LXQv9C40YLRjCDQutC90L7Qv9C60Lgg0Log0L3QuNC30YMg0Y3QutGA0LDQvdCwXHJcbiAgYnRuID0gJCgnI2J0bi1zdGljaycpXHJcbiAgYnRuLmRhdGEgJ3RvcCcsIGJ0bi5vZmZzZXQoKS50b3BcclxuICBmaXJzdFJvdyA9ICQoJy5zdHVkZW50cy1hcHBsaWNhdGlvbi10YWJsZV9fYm9keS1yb3cnKVsxXVxyXG4gICQod2luZG93KS5zY3JvbGwgLT5cclxuICAgIGlmIGZpcnN0Um93XHJcbiAgICAgIHNjcm9sbEJvdHRvbSA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKVxyXG4gICAgICBpZiBzY3JvbGxCb3R0b20gPj0gYnRuLmRhdGEoJ3RvcCcpIG9yIHNjcm9sbEJvdHRvbSA8ICQoZmlyc3RSb3cpLm9mZnNldCgpLnRvcFxyXG4gICAgICAgIGJ0bi5yZW1vdmVDbGFzcyAnZml4ZWQnXHJcbiAgICAgIGVsc2UgaWYgc2Nyb2xsQm90dG9tIDwgYnRuLmRhdGEoJ3RvcCcpXHJcbiAgICAgICAgaWYgc2Nyb2xsQm90dG9tID4gJChmaXJzdFJvdykub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgICBidG4uYWRkQ2xhc3MgJ2ZpeGVkJ1xyXG4gICQod2luZG93KS5zY3JvbGwoKVxyXG4iXX0=
