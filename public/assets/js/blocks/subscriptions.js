$(function() {
	var subForm =  document.forms.subscriptions_form,
		checkAll = $(subForm.elements.all);

		checkAll.on("change", function() {
			if(this.checked) {
				$(subForm.elements).each(function(){
					this.checked = true;
				});
			} else {
				$(subForm.elements).each(function(){
					this.checked = false;
				});
			}
		});
});