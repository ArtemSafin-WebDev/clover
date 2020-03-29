function isSubmit(form){
	submit = form.find('input[type=submit]');
	if(submit.length == 0){
		submit = form.find('button[type=submit]');
		if(submit.length == 0){
			return false
		}else{
			return submit;
		}
	}
}
function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};
$(document).on('change', '.f-file-input[type=file]', function() {
	var textContainer = $(this).closest('.f-file-area').find('.js-set-number');
	var html = '';
	
	if($(this)[0].files[0] != 'undefined' && $(this)[0].files[0] != undefined){
		for(i=0;i<$(this)[0].files.length;i++){
			html += '<div class="f-file-msgItem">'+
				'<i class="icon icon-doc-text"></i>'+
				'<div class="f-file-msgItemTitle">'+$(this)[0].files[i].name+'</div>'+
				'<div class="f-file-msgItemSize">'+bytesToSize($(this)[0].files[i].size)+'</div>'+
			'</div>';
		}
		if($(this).attr('submit') == 'disabled'){
			button = isSubmit($(this).closest('form'));
			if(button){
				if($(this)[0].files.length == 0){
					button.prop("disabled", true);
				}else{
					button.prop("disabled", false);
				}
			}
		}
	}
	textContainer.html(html);


	
});
$(document).on('clearValue', '.f-file-input[type=file]', function() {
	item = $(this).closest('.f-file-area').find('.js-set-number').find('.f-file-msgItem');
	if(item.length != 0){
		$(this).replaceWith($(this).val('').clone(true));
		item.remove();
	}
		
});



