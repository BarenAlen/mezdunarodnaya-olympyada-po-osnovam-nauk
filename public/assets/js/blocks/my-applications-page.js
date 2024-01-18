$(function() {
  var checkApplicationsCounts, decreaseApplicationsCounts, decreaseWrapperCounts, tableFooters, tables, windowHeight;
  decreaseWrapperCounts = function(wrapper, isMy) {
    var counters;
    if (isMy == null) {
      isMy = true;
    }
    counters = wrapper.find('.js-counter');
    if (counters) {
      return $.each(counters, function(key, counter) {
        var anotherTeacherCounter, counterText;
        anotherTeacherCounter = $(counter).find('[data-another-teacher="true"]');
        if (anotherTeacherCounter && anotherTeacherCounter.length > 0) {
          counterText = anotherTeacherCounter.text().trim().split(' / ');
          if (isMy) {
            counterText[0] = Math.max(0, parseInt(counterText[0]) - 1);
          } else {
            counterText[1] = Math.max(0, parseInt(counterText[1]) - 1);
          }
          return anotherTeacherCounter.text(counterText[0] + ' / ' + counterText[1]);
        } else {
          return $(counter).text(Math.max(0, parseInt($(counter).text()) - 1));
        }
      });
    }
  };
  decreaseApplicationsCounts = function(settings, isMy) {
    var currentDisciplineWrapper, currentGradeWrapper, gradeWrappers, stageWrappers;
    if (isMy == null) {
      isMy = true;
    }
    stageWrappers = $('.js-filter_wrapper').filter('[data-stage-id="' + settings.stage + '"]');
    if (stageWrappers) {
      gradeWrappers = stageWrappers.filter('[data-grade-id="' + settings.grade + '"]');
      if (gradeWrappers) {
        currentGradeWrapper = gradeWrappers.not('[data-discipline-id]');
        if (currentGradeWrapper) {
          decreaseWrapperCounts(currentGradeWrapper, isMy);
        }
        currentDisciplineWrapper = gradeWrappers.filter('[data-discipline-id="' + settings.discipline + '"]');
        if (currentDisciplineWrapper) {
          return decreaseWrapperCounts(currentDisciplineWrapper, isMy);
        }
      }
    }
  };
  checkApplicationsCounts = function(settings) {
    var currentDisciplineWrapper, currentGradeWrapper, disciplineStudentApplications, gradeStudentApplications, gradeWrappers, isDeleteDiscipline, isDeleteGrade, stageWrappers, studentApplications;
    studentApplications = $('.js-student_application').filter('[data-stage-id="' + settings.stage + '"]');
    gradeStudentApplications = studentApplications.filter('[data-grade-id="' + settings.grade + '"]');
    isDeleteGrade = false;
    isDeleteDiscipline = false;
    if (gradeStudentApplications && gradeStudentApplications.length > 0) {
      disciplineStudentApplications = gradeStudentApplications.filter('[data-discipline-id="' + settings.discipline + '"]');
      isDeleteDiscipline = !disciplineStudentApplications || disciplineStudentApplications.length <= 0;
    } else {
      isDeleteGrade = true;
    }
    if (isDeleteDiscipline || isDeleteGrade) {
      stageWrappers = $('.js-filter_wrapper').filter('[data-stage-id="' + settings.stage + '"]');
      if (stageWrappers) {
        gradeWrappers = stageWrappers.filter('[data-grade-id="' + settings.grade + '"]');
        if (gradeWrappers) {
          if (isDeleteGrade) {
            currentGradeWrapper = gradeWrappers.not('[data-discipline-id]');
            if (currentGradeWrapper && currentGradeWrapper.length === 1) {
              currentGradeWrapper.slideUp(300);
            }
          }
          if (isDeleteDiscipline) {
            currentDisciplineWrapper = gradeWrappers.filter('[data-discipline-id="' + settings.discipline + '"]');
            if (currentDisciplineWrapper && currentDisciplineWrapper.length === 1) {
              return currentDisciplineWrapper.slideUp(300);
            }
          }
        }
      }
    }
  };
  $('.js-checkbox-agree').on('click', function() {
    var stageID;
    stageID = $(this).data('stage-id');
    return $('#btn_agree_' + stageID).attr('disabled', !$(this).prop('checked'));
  });
  $('.js-btn-agree').on('click', function(e) {
    var block, data, preloader;
    e.preventDefault();
    $(this).attr('disabled', true);
    block = $(this).parent('.applications__pane');
    if (block && block.length > 0) {
      preloader = $(this).preloader('show');
      data = {
        STAGE_ID: $(this).data('stage-id')
      };
      return $.post('/cabinet/application/list/agreeSendAwards.php', data, function(response) {
        preloader.hide();
        if (response === 'OK') {
          return block.slideUp(300);
        }
      });
    }
  });
  $('.js-delete_application').on('click', function(e) {
    var element, preloader, studentApplication;
    e.preventDefault();
    element = $(this);
    studentApplication = element.closest('.js-student_application');
    preloader = studentApplication.preloader('show');
    return $.get(element.attr('href'), {}, function() {
      var settings;
      settings = {
        stage: element.data('stage-id'),
        grade: element.data('grade-id'),
        discipline: element.data('discipline-id')
      };
      decreaseApplicationsCounts(settings, element.data('another-teacher') !== true);
      studentApplication.slideUp(300, function() {
        studentApplication.remove();
        return checkApplicationsCounts(settings);
      });
      return preloader.hide();
    });
  });
  $('.js-clear_score').on('click', function(e) {
    var element, messageText, preloader, scoreElement;
    e.preventDefault();
    element = $(this);
    scoreElement = element.closest('.js-student_score');
    preloader = scoreElement.preloader('show');
    messageText = element.data('message-text');
    if (confirm(messageText)) {
      return $.post(element.attr('href'), {}, function() {
        preloader.hide();
        return scoreElement.html('—');
      });
    }
  });
  tables = $('.my-applications-table');
  tableFooters = tables.find('.my-applications-table__foot');
  windowHeight = $(window).height();
  return $(window).scroll(function() {
    var scrollTop;
    scrollTop = $(window).scrollTop();
    if (tables.length > 0) {
      return $.each(tables, function(key) {
        var tableButton, tableFooter, tableFooterOffset, tableOffset;
        tableFooter = $(tableFooters[key]);
        tableOffset = $(this).offset().top - scrollTop;
        tableFooterOffset = tableFooter.offset().top - scrollTop;
        tableButton = $(this).next();
        if (tableButton.length > 0 && tableButton.hasClass('btn-list') && tableOffset <= 0 && tableFooterOffset >= windowHeight) {
          return tableButton.addClass('fixed');
        } else {
          return tableButton.removeClass('fixed');
        }
      });
    }
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tzL215LWFwcGxpY2F0aW9ucy1wYWdlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlcyI6WyJibG9ja3MvbXktYXBwbGljYXRpb25zLXBhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUEsQ0FBRSxTQUFBO0FBQ0EsTUFBQTtFQUFBLHFCQUFBLEdBQXdCLFNBQUMsT0FBRCxFQUFVLElBQVY7QUFDdEIsUUFBQTs7TUFEZ0MsT0FBTzs7SUFDdkMsUUFBQSxHQUFXLE9BQU8sQ0FBQyxJQUFSLENBQWEsYUFBYjtJQUVYLElBQUcsUUFBSDthQUNFLENBQUMsQ0FBQyxJQUFGLENBQU8sUUFBUCxFQUFpQixTQUFDLEdBQUQsRUFBTSxPQUFOO0FBQ2YsWUFBQTtRQUFBLHFCQUFBLEdBQXdCLENBQUEsQ0FBRSxPQUFGLENBQVUsQ0FBQyxJQUFYLENBQWdCLCtCQUFoQjtRQUV4QixJQUFHLHFCQUFBLElBQTBCLHFCQUFxQixDQUFDLE1BQXRCLEdBQStCLENBQTVEO1VBQ0UsV0FBQSxHQUFjLHFCQUFxQixDQUFDLElBQXRCLENBQUEsQ0FBNEIsQ0FBQyxJQUE3QixDQUFBLENBQW1DLENBQUMsS0FBcEMsQ0FBMEMsS0FBMUM7VUFFZCxJQUFHLElBQUg7WUFDRSxXQUFZLENBQUEsQ0FBQSxDQUFaLEdBQWlCLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBVCxFQUFZLFFBQUEsQ0FBUyxXQUFZLENBQUEsQ0FBQSxDQUFyQixDQUFBLEdBQTJCLENBQXZDLEVBRG5CO1dBQUEsTUFBQTtZQUdFLFdBQVksQ0FBQSxDQUFBLENBQVosR0FBaUIsSUFBSSxDQUFDLEdBQUwsQ0FBUyxDQUFULEVBQVksUUFBQSxDQUFTLFdBQVksQ0FBQSxDQUFBLENBQXJCLENBQUEsR0FBMkIsQ0FBdkMsRUFIbkI7O2lCQUtBLHFCQUFxQixDQUFDLElBQXRCLENBQTJCLFdBQVksQ0FBQSxDQUFBLENBQVosR0FBaUIsS0FBakIsR0FBeUIsV0FBWSxDQUFBLENB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QUFBLE1BQUE7aUJBS0ssV0FBVyxDQUFDLFdBQVosQ0FBd0IsT0FBeEIsRUFMTDs7TUFQYSxDQUFmLEVBREY7O0VBSmUsQ0FBakI7QUEvSUEsQ0FBRiIsInNvdXJjZXNDb250ZW50IjpbIiQgLT5cclxuICBkZWNyZWFzZVdyYXBwZXJDb3VudHMgPSAod3JhcHBlciwgaXNNeSA9IHRydWUpIC0+XHJcbiAgICBjb3VudGVycyA9IHdyYXBwZXIuZmluZCgnLmpzLWNvdW50ZXInKVxyXG5cclxuICAgIGlmIGNvdW50ZXJzXHJcbiAgICAgICQuZWFjaChjb3VudGVycywgKGtleSwgY291bnRlcikgLT5cclxuICAgICAgICBhbm90aGVyVGVhY2hlckNvdW50ZXIgPSAkKGNvdW50ZXIpLmZpbmQoJ1tkYXRhLWFub3RoZXItdGVhY2hlcj1cInRydWVcIl0nKVxyXG5cclxuICAgICAgICBpZiBhbm90aGVyVGVhY2hlckNvdW50ZXIgYW5kIGFub3RoZXJUZWFjaGVyQ291bnRlci5sZW5ndGggPiAwXHJcbiAgICAgICAgICBjb3VudGVyVGV4dCA9IGFub3RoZXJUZWFjaGVyQ291bnRlci50ZXh0KCkudHJpbSgpLnNwbGl0KCcgLyAnKVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZiBpc015XHJcbiAgICAgICAgICAgIGNvdW50ZXJUZXh0WzBdID0gTWF0aC5tYXgoMCwgcGFyc2VJbnQoY291bnRlclRleHRbMF0pIC0gMSlcclxuICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY291bnRlclRleHRbMV0gPSBNYXRoLm1heCgwLCBwYXJzZUludChjb3VudGVyVGV4dFsxXSkgLSAxKVxyXG5cclxuICAgICAgICAgIGFub3RoZXJUZWFjaGVyQ291bnRlci50ZXh0KGNvdW50ZXJUZXh0WzBdICsgJyAvICcgKyBjb3VudGVyVGV4dFsxXSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAkKGNvdW50ZXIpLnRleHQoTWF0aC5tYXgoMCwgcGFyc2VJbnQoJChjb3VudGVyKS50ZXh0KCkpIC0gMSkpXHJcbiAgICAgIClcclxuXHJcbiAgZGVjcmVhc2VBcHBsaWNhdGlvbnNDb3VudHMgPSAoc2V0dGluZ3MsIGlzTXkgPSB0cnVlKSAtPlxyXG4gICAgc3RhZ2VXcmFwcGVycyA9ICQoJy5qcy1maWx0ZXJfd3JhcHBlcicpLmZpbHRlcignW2RhdGEtc3RhZ2UtaWQ9XCInICsgc2V0dGluZ3Muc3RhZ2UgKyAnXCJdJylcclxuXHJcbiAgICBpZiBzdGFnZVdyYXBwZXJzXHJcbiAgICAgIGdyYWRlV3JhcHBlcnMgPSBzdGFnZVdyYXBwZXJzLmZpbHRlcignW2RhdGEtZ3JhZGUtaWQ9XCInICsgc2V0dGluZ3MuZ3JhZGUgKyAnXCJdJyk7XHJcblxyXG4gICAgICBpZiBncmFkZVdyYXBwZXJzXHJcbiAgICAgICAgY3VycmVudEdyYWRlV3JhcHBlciA9IGdyYWRlV3JhcHBlcnMubm90KCdbZGF0YS1kaXNjaXBsaW5lLWlkXScpXHJcblxyXG4gICAgICAgIGlmIGN1cnJlbnRHcmFkZVdyYXBwZXJcclxuICAgICAgICAgIGRlY3JlYXNlV3JhcHBlckNvdW50cyhjdXJyZW50R3JhZGVXcmFwcGVyLCBpc015KVxyXG5cclxuICAgICAgICBjdXJyZW50RGlzY2lwbGluZVdyYXBwZXIgPSBncmFkZVdyYXBwZXJzLmZpbHRlcignW2RhdGEtZGlzY2lwbGluZS1pZD1cIicgKyBzZXR0aW5ncy5kaXNjaXBsaW5lICsgJ1wiXScpXHJcblxyXG4gICAgICAgIGlmIGN1cnJlbnREaXNjaXBsaW5lV3JhcHBlclxyXG4gICAgICAgICAgZGVjcmVhc2VXcmFwcGVyQ291bnRzKGN1cnJlbnREaXNjaXBsaW5lV3JhcHBlciwgaXNNeSlcclxuXHJcbiAgY2hlY2tBcHBsaWNhdGlvbnNDb3VudHMgPSAoc2V0dGluZ3MpIC0+XHJcbiAgICBzdHVkZW50QXBwbGljYXRpb25zID0gJCgnLmpzLXN0dWRlbnRfYXBwbGljYXRpb24nKS5maWx0ZXIoJ1tkYXRhLXN0YWdlLWlkPVwiJyArIHNldHRpbmdzLnN0YWdlICsgJ1wiXScpXHJcbiAgICBncmFkZVN0dWRlbnRBcHBsaWNhdGlvbnMgPSBzdHVkZW50QXBwbGljYXRpb25zLmZpbHRlcignW2RhdGEtZ3JhZGUtaWQ9XCInICsgc2V0dGluZ3MuZ3JhZGUgKyAnXCJdJylcclxuXHJcbiAgICBpc0RlbGV0ZUdyYWRlID0gZmFsc2VcclxuICAgIGlzRGVsZXRlRGlzY2lwbGluZSA9IGZhbHNlXHJcbiAgICBcclxuICAgIGlmIGdyYWRlU3R1ZGVudEFwcGxpY2F0aW9ucyBhbmQgZ3JhZGVTdHVkZW50QXBwbGljYXRpb25zLmxlbmd0aCA+IDBcclxuICAgICAgZGlzY2lwbGluZVN0dWRlbnRBcHBsaWNhdGlvbnMgPSBncmFkZVN0dWRlbnRBcHBsaWNhdGlvbnMuZmlsdGVyKCdbZGF0YS1kaXNjaXBsaW5lLWlkPVwiJyArIHNldHRpbmdzLmRpc2NpcGxpbmUgKyAnXCJdJylcclxuXHJcbiAgICAgIGlzRGVsZXRlRGlzY2lwbGluZSA9IG5vdCBkaXNjaXBsaW5lU3R1ZGVudEFwcGxpY2F0aW9ucyBvciBkaXNjaXBsaW5lU3R1ZGVudEFwcGxpY2F0aW9ucy5sZW5ndGggPD0gMFxyXG4gICAgZWxzZSBcclxuICAgICAgaXNEZWxldGVHcmFkZSA9IHRydWVcclxuXHJcbiAgICBpZiBpc0RlbGV0ZURpc2NpcGxpbmUgb3IgaXNEZWxldGVHcmFkZVxyXG4gICAgICBzdGFnZVdyYXBwZXJzID0gJCgnLmpzLWZpbHRlcl93cmFwcGVyJykuZmlsdGVyKCdbZGF0YS1zdGFnZS1pZD1cIicgKyBzZXR0aW5ncy5zdGFnZSArICdcIl0nKVxyXG4gIFxyXG4gICAgICBpZiBzdGFnZVdyYXBwZXJzXHJcbiAgICAgICAgZ3JhZGVXcmFwcGVycyA9IHN0YWdlV3JhcHBlcnMuZmlsdGVyKCdbZGF0YS1ncmFkZS1pZD1cIicgKyBzZXR0aW5ncy5ncmFkZSArICdcIl0nKTtcclxuICBcclxuICAgICAgICBpZiBncmFkZVdyYXBwZXJzXHJcbiAgICAgICAgICBpZiBpc0RlbGV0ZUdyYWRlXHJcbiAgICAgICAgICAgIGN1cnJlbnRHcmFkZVdyYXBwZXIgPSBncmFkZVdyYXBwZXJzLm5vdCgnW2RhdGEtZGlzY2lwbGluZS1pZF0nKVxyXG4gICAgXHJcbiAgICAgICAgICAgIGlmIGN1cnJlbnRHcmFkZVdyYXBwZXIgYW5kIGN1cnJlbnRHcmFkZVdyYXBwZXIubGVuZ3RoID09IDFcclxuICAgICAgICAgICAgICBjdXJyZW50R3JhZGVXcmFwcGVyLnNsaWRlVXAoMzAwKVxyXG4gICAgXHJcbiAgICAgICAgICBpZiBpc0RlbGV0ZURpc2NpcGxpbmVcclxuICAgICAgICAgICAgY3VycmVudERpc2NpcGxpbmVXcmFwcGVyID0gZ3JhZGVXcmFwcGVycy5maWx0ZXIoJ1tkYXRhLWRpc2NpcGxpbmUtaWQ9XCInICsgc2V0dGluZ3MuZGlzY2lwbGluZSArICdcIl0nKVxyXG4gICAgXHJcbiAgICAgICAgICAgIGlmIGN1cnJlbnREaXNjaXBsaW5lV3JhcHBlciBhbmQgY3VycmVudERpc2NpcGxpbmVXcmFwcGVyLmxlbmd0aCA9PSAxXHJcbiAgICAgICAgICAgICAgY3VycmVudERpc2NpcGxpbmVXcmFwcGVyLnNsaWRlVXAoMzAwKVxyXG5cclxuICAkKCcuanMtY2hlY2tib3gtYWdyZWUnKS5vbiAnY2xpY2snLCAoKSAtPlxyXG4gICAgc3RhZ2VJRCA9ICQodGhpcykuZGF0YSgnc3RhZ2UtaWQnKVxyXG5cclxuICAgICQoJyNidG5fYWdyZWVfJyArIHN0YWdlSUQpLmF0dHIoJ2Rpc2FibGVkJywgbm90ICQodGhpcykucHJvcCgnY2hlY2tlZCcpKVxyXG5cclxuICAkKCcuanMtYnRuLWFncmVlJykub24gJ2NsaWNrJywgKGUpIC0+XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSlcclxuICAgIFxyXG4gICAgYmxvY2sgPSAkKHRoaXMpLnBhcmVudCgnLmFwcGxpY2F0aW9uc19fcGFuZScpXHJcblxyXG4gICAgaWYgYmxvY2sgYW5kIGJsb2NrLmxlbmd0aCA+IDBcclxuICAgICAgcHJlbG9hZGVyID0gJCh0aGlzKS5wcmVsb2FkZXIoJ3Nob3cnKVxyXG5cclxuICAgICAgZGF0YSA9IHtcclxuICAgICAgICBTVEFHRV9JRDogJCh0aGlzKS5kYXRhKCdzdGFnZS1pZCcpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgICQucG9zdCgnL2NhYmluZXQvYXBwbGljYXRpb24vbGlzdC9hZ3JlZVNlbmRBd2FyZHMucGhwJywgZGF0YSwgKHJlc3BvbnNlKSAtPlxyXG4gICAgICAgIHByZWxvYWRlci5oaWRlKClcclxuXHJcbiAgICAgICAgaWYgcmVzcG9uc2UgaXMgJ09LJ1xyXG4gICAgICAgICAgYmxvY2suc2xpZGVVcCgzMDApXHJcbiAgICAgIClcclxuXHJcbiAgJCgnLmpzLWRlbGV0ZV9hcHBsaWNhdGlvbicpLm9uICdjbGljaycsIChlKSAtPlxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgZWxlbWVudCA9ICQodGhpcylcclxuICAgIHN0dWRlbnRBcHBsaWNhdGlvbiA9IGVsZW1lbnQuY2xvc2VzdCgnLmpzLXN0dWRlbnRfYXBwbGljYXRpb24nKVxyXG4gICAgXHJcbiAgICBwcmVsb2FkZXIgPSBzdHVkZW50QXBwbGljYXRpb24ucHJlbG9hZGVyKCdzaG93JylcclxuICAgIFxyXG4gICAgJC5nZXQoZWxlbWVudC5hdHRyKCdocmVmJyksIHt9LCAoKSAtPlxyXG4gICAgICBzZXR0aW5ncyA9XHJcbiAgICAgICAgc3RhZ2U6IGVsZW1lbnQuZGF0YSgnc3RhZ2UtaWQnKVxyXG4gICAgICAgIGdyYWRlOiBlbGVtZW50LmRhdGEoJ2dyYWRlLWlkJylcclxuICAgICAgICBkaXNjaXBsaW5lOiBlbGVtZW50LmRhdGEoJ2Rpc2NpcGxpbmUtaWQnKVxyXG4gIFxyXG4gICAgICBkZWNyZWFzZUFwcGxpY2F0aW9uc0NvdW50cyhzZXR0aW5ncywgKGVsZW1lbnQuZGF0YSgnYW5vdGhlci10ZWFjaGVyJykgaXNudCB0cnVlKSlcclxuICBcclxuICAgICAgc3R1ZGVudEFwcGxpY2F0aW9uLnNsaWRlVXAoMzAwLCAoKSAtPlxyXG4gICAgICAgIHN0dWRlbnRBcHBsaWNhdGlvbi5yZW1vdmUoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNoZWNrQXBwbGljYXRpb25zQ291bnRzKHNldHRpbmdzKVxyXG4gICAgICApXHJcblxyXG4gICAgICBwcmVsb2FkZXIuaGlkZSgpXHJcbiAgICApXHJcbiAgICBcclxuICAkKCcuanMtY2xlYXJfc2NvcmUnKS5vbiAnY2xpY2snLCAoZSkgLT5cclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgXHJcbiAgICBlbGVtZW50ID0gJCh0aGlzKVxyXG4gICAgc2NvcmVFbGVtZW50ID0gZWxlbWVudC5jbG9zZXN0KCcuanMtc3R1ZGVudF9zY29yZScpXHJcblxyXG4gICAgcHJlbG9hZGVyID0gc2NvcmVFbGVtZW50LnByZWxvYWRlcignc2hvdycpXHJcbiAgICBcclxuICAgIG1lc3NhZ2VUZXh0ID0gZWxlbWVudC5kYXRhKCdtZXNzYWdlLXRleHQnKVxyXG4gICAgXHJcbiAgICBpZiBjb25maXJtKG1lc3NhZ2VUZXh0KVxyXG4gICAgICAkLnBvc3QoZWxlbWVudC5hdHRyKCdocmVmJyksIHt9LCAoKSAtPlxyXG4gICAgICAgIHByZWxvYWRlci5oaWRlKClcclxuICAgICAgICBcclxuICAgICAgICBzY29yZUVsZW1lbnQuaHRtbCgn4oCUJylcclxuICAgICAgKVxyXG5cclxuICB0YWJsZXMgPSAkKCcubXktYXBwbGljYXRpb25zLXRhYmxlJylcclxuICB0YWJsZUZvb3RlcnMgPSB0YWJsZXMuZmluZCgnLm15LWFwcGxpY2F0aW9ucy10YWJsZV9fZm9vdCcpXHJcbiAgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpXHJcblxyXG4gICQod2luZG93KS5zY3JvbGwgLT5cclxuXHJcbiAgICBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKClcclxuXHJcbiAgICBpZiB0YWJsZXMubGVuZ3RoID4gMFxyXG4gICAgICAkLmVhY2godGFibGVzLCAoa2V5KSAtPlxyXG4gICAgICAgIHRhYmxlRm9vdGVyID0gJCh0YWJsZUZvb3RlcnNba2V5XSlcclxuXHJcbiAgICAgICAgdGFibGVPZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLnRvcCAtIHNjcm9sbFRvcFxyXG4gICAgICAgIHRhYmxlRm9vdGVyT2Zmc2V0ID0gdGFibGVGb290ZXIub2Zmc2V0KCkudG9wIC0gc2Nyb2xsVG9wXHJcbiAgICAgICAgdGFibGVCdXR0b24gPSAkKHRoaXMpLm5leHQoKVxyXG5cclxuICAgICAgICBpZiB0YWJsZUJ1dHRvbi5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICB0YWJsZUJ1dHRvbi5oYXNDbGFzcygnYnRuLWxpc3QnKSAmJlxyXG4gICAgICAgICAgdGFibGVPZmZzZXQgPD0gMCAmJlxyXG4gICAgICAgICAgdGFibGVGb290ZXJPZmZzZXQgPj0gd2luZG93SGVpZ2h0XHJcbiAgICAgICAgICAgIHRhYmxlQnV0dG9uLmFkZENsYXNzKCdmaXhlZCcpXHJcbiAgICAgICAgZWxzZSB0YWJsZUJ1dHRvbi5yZW1vdmVDbGFzcygnZml4ZWQnKVxyXG4gICAgICApIl19
