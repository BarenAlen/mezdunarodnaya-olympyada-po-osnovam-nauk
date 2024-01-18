$(function() {
  var form, modalInstruction, promptInstruction;
  form = $('.js-applications_add_form');
  $('.js-send_disciplines_approve').on('click', function() {
    $(this).closest('.confirmation-pane').fadeOut(300);
    return $.cookie('approve_disciplines_date[]', $(this).data('stage-id'));
  });
  promptInstruction = '#promptInstruction';
  modalInstruction = $('.js-modal_instruction');
  $('.cabinet__main').on('click', '.clear_prompt', function() {
    return $.cookie('dont_show_apply_application_instruction', 'Y', {
      expires: 240
    });
  }).on('click', '.js-show_modal_instruction', function() {
    var modal;
    $.cookie('dont_show_apply_application_instruction', 'Y', {
      expires: 240,
      path: '/'
    });
    modal = modalInstruction.modal({
      stopPropagation: modalInstruction.find('.modal__instruction')
    });
    return modal.show();
  });
  form.on('change', '.js-group_by', function() {
    return form.submit();
  });
  return $('.image a').fancybox({
    helpers: {
      title: {
        type: 'inside'
      }
    },
    padding: 0
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tzL2FwcGxpY2F0aW9uLWVkaXQtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXMiOlsiYmxvY2tzL2FwcGxpY2F0aW9uLWVkaXQtcGFnZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxDQUFFLFNBQUE7QUFDQSxNQUFBO0VBQUEsSUFBQSxHQUFPLENBQUEsQ0FBRSwyQkFBRjtFQUVQLENBQUEsQ0FBRSw4QkFBRixDQUFpQyxDQUFDLEVBQWxDLENBQXFDLE9BQXJDLEVBQThDLFNBQUE7SUFDNUMsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLE9BQVIsQ0FBZ0Isb0JBQWhCLENBQXFDLENBQUMsT0FBdEMsQ0FBOEMsR0FBOUM7V0FFQSxDQUFDLENBQUMsTUFBRixDQUFTLDRCQUFULEVBQXVDLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsVUFBYixDQUF2QztFQUg0QyxDQUE5QztFQUtBLGlCQUFBLEdBQW9CO0VBQ3BCLGdCQUFBLEdBQW1CLENBQUEsQ0FBRSx1QkFBRjtFQUVuQixDQUFBLENBQUUsZ0JBQUYsQ0FDRSxDQUFDLEVBREgsQ0FDTSxPQUROLEVBQ2UsZUFEZixFQUNnQyxTQUFBO1dBQzVCLENBQUMsQ0FBQyxNQUFGLENBQVMseUNBQVQsRUFBb0QsR0FBcEQsRUFBeUQ7TUFBQyxPQUFBLEVBQVMsR0FBVjtLQUF6RDtFQUQ0QixDQURoQyxDQUdFLENBQUMsRUFISCxDQUdNLE9BSE4sRUFHZSw0QkFIZixFQUc2QyxTQUFBO0FBQ3pDLFFBQUE7SUFBQSxDQUFDLENBQUMsTUFBRixDQUFTLHlDQUFULEVBQW9ELEdBQXBELEVBQXlEO01BQUMsT0FBQSxFQUFTLEdBQVY7TUFBZSxJQUFBLEVBQU0sR0FBckI7S0FBekQ7SUFFQSxLQUFBLEdBQVEsZ0JBQWdCLENBQUMsS0FBakIsQ0FBdUI7TUFDN0IsZUFBQSxFQUFpQixnQkFBZ0IsQ0FBQyxJQUFqQixDQUFzQixxQkFBdEIsQ0FEWTtLQUF2QjtXQUdSLEtBQUssQ0FBQyxJQUFOLENBQUE7RUFOeUMsQ0FIN0M7RUFXQSxJQUFJLENBQUMsRUFBTCxDQUFRLFFBQVIsRUFBa0IsY0FBbEIsRUFBa0MsU0FBQTtXQUNoQyxJQUFJLENBQUMsTUFBTCxDQUFBO0VBRGdDLENBQWxDO1NBR0EsQ0FBQSxDQUFFLFVBQUYsQ0FBYSxDQUFDLFFBQWQsQ0FBdUI7SUFDckIsT0FBQSxFQUNFO01BQUEsS0FBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFFBQU47T0FERjtLQUZtQjtJQUlyQixPQUFBLEVBQVMsQ0FKWTtHQUF2QjtBQXpCQSxDQUFGIiwic291cmNlc0NvbnRlbnQiOlsiJCAtPlxyXG4gIGZvcm0gPSAkKCcuanMtYXBwbGljYXRpb25zX2FkZF9mb3JtJylcclxuXHJcbiAgJCgnLmpzLXNlbmRfZGlzY2lwbGluZXNfYXBwcm92ZScpLm9uICdjbGljaycsICgpIC0+XHJcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJy5jb25maXJtYXRpb24tcGFuZScpLmZhZGVPdXQoMzAwKVxyXG5cclxuICAgICQuY29va2llKCdhcHByb3ZlX2Rpc2NpcGxpbmVzX2RhdGVbXScsICQodGhpcykuZGF0YSgnc3RhZ2UtaWQnKSk7XHJcblxyXG4gIHByb21wdEluc3RydWN0aW9uID0gJyNwcm9tcHRJbnN0cnVjdGlvbidcclxuICBtb2RhbEluc3RydWN0aW9uID0gJCgnLmpzLW1vZGFsX2luc3RydWN0aW9uJyk7XHJcblxyXG4gICQoJy5jYWJpbmV0X19tYWluJylcclxuICAgIC5vbiAnY2xpY2snLCAnLmNsZWFyX3Byb21wdCcsICgpIC0+XHJcbiAgICAgICQuY29va2llKCdkb250X3Nob3dfYXBwbHlfYXBwbGljYXRpb25faW5zdHJ1Y3Rpb24nLCAnWScsIHtleHBpcmVzOiAyNDB9KVxyXG4gICAgLm9uICdjbGljaycsICcuanMtc2hvd19tb2RhbF9pbnN0cnVjdGlvbicsICgpIC0+XHJcbiAgICAgICQuY29va2llKCdkb250X3Nob3dfYXBwbHlfYXBwbGljYXRpb25faW5zdHJ1Y3Rpb24nLCAnWScsIHtleHBpcmVzOiAyNDAsIHBhdGg6ICcvJ30pXHJcblxyXG4gICAgICBtb2RhbCA9IG1vZGFsSW5zdHJ1Y3Rpb24ubW9kYWwoe1xyXG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbjogbW9kYWxJbnN0cnVjdGlvbi5maW5kKCcubW9kYWxfX2luc3RydWN0aW9uJylcclxuICAgICAgfSlcclxuICAgICAgbW9kYWwuc2hvdygpXHJcblxyXG4gIGZvcm0ub24gJ2NoYW5nZScsICcuanMtZ3JvdXBfYnknLCAoKSAtPlxyXG4gICAgZm9ybS5zdWJtaXQoKVxyXG5cclxuICAkKCcuaW1hZ2UgYScpLmZhbmN5Ym94KHtcclxuICAgIGhlbHBlcnM6XHJcbiAgICAgIHRpdGxlOlxyXG4gICAgICAgIHR5cGU6ICdpbnNpZGUnXHJcbiAgICBwYWRkaW5nOiAwXHJcbiAgfSkiXX0=
