 $(document).ready(function() {

 	"use strict";

// Меню в адаптиве
	$('.mini_menu').on('click', function(e) {
		e.preventDefault();
		$('.nav').toggleClass('active_nav');
	});
//*****

//Запуск модулей

	if($('#upload').length) {
	    getNameForImg.init('upload');
    }

    if($('.popup').length) {
	    popup.init('work_block_img_Add');
    }

    if($('.popup').length) {
      Popups.init();
    }

    // if($('form').length) {
   // 		tooltips.init();
   // 	}

   if($('form').length) {
    Popups.init();
    validateThisForm.init();
   }


});
