$.fn.customAccordion = function(){
	function change(e){
		e.preventDefault();
		var self = $(this).closest('.accordion');
		var section = $(this).closest('.accordion-section');
		var overflow = section.find('.accordion-section-body');

		if(overflow.hasClass('show')){
			$(this).removeClass('--active');
			overflow.removeClass('show').slideUp(350);
		}else{
			self.find('.accordion-section-body.show').removeClass('show').slideUp(350);


			$(this).addClass('--active');

			self.find('.accordion-section').each(function(){
				if($(this).index() != section.index()){
					$(this).find('.accordion-section-toggle').removeClass('--active')
				}
			})


			overflow.toggleClass('show').slideToggle(350);
		}
	}

	$(this).find('.accordion-section-body').append($('<div>', {
		'class':'accordion-back icon-up-open'
	}).bind('touched click', change))
	$(this).find('.accordion-section-toggle').each(function(){
		$(this).bind('touched click', change);

		if($(this).hasClass('--active')){
			$(this).closest('.accordion-section').find('.accordion-section-body').addClass('--open show');
		}
	})



}