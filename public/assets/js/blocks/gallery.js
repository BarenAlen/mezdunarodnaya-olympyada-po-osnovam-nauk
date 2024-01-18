$(function() {
  return $('.gallery-item-card--photo, .gallery-item-card--video').fancybox({
    helpers: {
      title: {
        type: 'inside'
      }
    },
    padding: 0,
    beforeShow: function() {
      var alt;
      alt = this.element.find('img').attr('alt');
      this.inner.find('img').attr('alt', alt);
      return this.title = (alt ? alt : '') + ("<div class=\"fancybox-counter\">" + (this.index + 1) + "/" + this.group.length + "</div>");
    }
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tzL2dhbGxlcnkuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzIjpbImJsb2Nrcy9nYWxsZXJ5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxDQUFBLENBQUUsU0FBQTtTQUNELENBQUEsQ0FBRSxzREFBRixDQUF5RCxDQUFDLFFBQTFELENBQ0M7SUFBQSxPQUFBLEVBQ0M7TUFBQSxLQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU0sUUFBTjtPQUREO0tBREQ7SUFHQSxPQUFBLEVBQVMsQ0FIVDtJQUlBLFVBQUEsRUFBWSxTQUFBO0FBQ1gsVUFBQTtNQUFBLEdBQUEsR0FBTSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxLQUFkLENBQW9CLENBQUMsSUFBckIsQ0FBMEIsS0FBMUI7TUFDTixJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWSxLQUFaLENBQWtCLENBQUMsSUFBbkIsQ0FBd0IsS0FBeEIsRUFBK0IsR0FBL0I7YUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTLENBQUksR0FBSCxHQUFZLEdBQVosR0FBcUIsRUFBdEIsQ0FBQSxHQUE0QixDQUFBLGtDQUFBLEdBQWtDLENBQUMsSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFWLENBQWxDLEdBQThDLEdBQTlDLEdBQWlELElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBeEQsR0FBK0QsUUFBL0Q7SUFIMUIsQ0FKWjtHQUREO0FBREMsQ0FBRiIsInNvdXJjZXNDb250ZW50IjpbIiQgLT5cclxuXHQkKCcuZ2FsbGVyeS1pdGVtLWNhcmQtLXBob3RvLCAuZ2FsbGVyeS1pdGVtLWNhcmQtLXZpZGVvJykuZmFuY3lib3goXHJcblx0XHRoZWxwZXJzOlxyXG5cdFx0XHR0aXRsZTpcclxuXHRcdFx0XHR0eXBlOiAnaW5zaWRlJ1xyXG5cdFx0cGFkZGluZzogMFxyXG5cdFx0YmVmb3JlU2hvdzogLT5cclxuXHRcdFx0YWx0ID0gQGVsZW1lbnQuZmluZCgnaW1nJykuYXR0cignYWx0JylcclxuXHRcdFx0QGlubmVyLmZpbmQoJ2ltZycpLmF0dHIoJ2FsdCcsIGFsdClcclxuXHRcdFx0QHRpdGxlID0gKGlmIGFsdCB0aGVuIGFsdCBlbHNlICcnKSArIFwiPGRpdiBjbGFzcz1cXFwiZmFuY3lib3gtY291bnRlclxcXCI+I3tAaW5kZXggKyAxfS8je0Bncm91cC5sZW5ndGh9PC9kaXY+XCJcclxuXHQpXHJcbiJdfQ==