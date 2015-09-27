// input[type="file"] - вывод названия картинки

	var getNameForImg = (function() {

		var _fieldForName,
			change = function(id) {
				_fieldForName = $('#' + id).siblings('span').attr('id');
				$('#' + id).on('change', function() {
					_getName($(this).val());
					//console.log($(this));
				});
			},
			_getName = function(str) {
			    if (str.lastIndexOf('\\')){
			        var i = str.lastIndexOf('\\')+1;
			    }
			    else{
			        var i = str.lastIndexOf('/')+1;
			    }
			    var filename = str.slice(i);
			    var uploaded = $('#' + _fieldForName);
			    uploaded.text(filename);
			}

		return {
	        init: function(id) {
	            change(id);
	        }
		}

	}());

//*****
// Popup



	//addPproject.init;

	var popup = (function() {

		var start = function(buttonClass) {
				_setUpListeners(buttonClass);
			},
			_setUpListeners = function(buttonClass) {
				_centerPopup();
				_showPopup(buttonClass);

				$('.popup_overlay, .popup_close').on('click', popup.close);
			},
			_centerPopup = function() {
				var popupHeight = $('.popup').innerHeight(),
					popupWidth = $('.popup').width();

				$('.popup').css({
					'margin-top' : (- popupHeight / 2) + 'px',
					'margin-left' : (- popupWidth / 2) + 'px'
				});
			},
			_showPopup = function(buttonClass) {
				$('.' + buttonClass).on('click', function(e) {
					ie8SafePreventEvent(e);
					$('.popup_overlay').fadeIn(800);
					$('.popup').addClass('active_popup');
					//$('#upload').siblings('#fileformlabel');
				});
			},
			closePopup = function() {
				$('.popup_overlay').fadeOut(800);
			 	$('.popup').removeClass('active_popup');
			 	_clearPopup();
			},
			_clearPopup = function() {
				$('.tooltip, .server_mes').hide();
				$('input, textarea, #fileformlabel').removeClass('error').removeClass('success');
				$('.fileform').css({
					'border' : '1px solid #48cbe8'
				});
				$('#upload').siblings('#fileformlabel').text('');
				var inputs = $('form').find('input, textarea');
				$.each(inputs, function() {
					$(this).val('');
				});
			 }

		return {
			init: function(buttonClass) {
				start(buttonClass);
			},
			close: function() {
				closePopup();
			}
		};

	})();

//******* ie8 preventDefault
	function ie8SafePreventEvent(e) {
	    if (e.preventDefault) {
	        e.preventDefault()
	    } else {
	        e.stop()
	    };

	    e.returnValue = false;
	    e.stopPropagation();
	}
//Tooltips && Validator



var addPproject = (function() {

	var start = function() {
			_setUpListeners();
		},
		_setUpListeners = function() {
			_addProjectToPage();
		},
		_addProjectToPage = function() {
			var projectName = $('#project_name').val(),
				projectUrl = $('#project_url').val(),
				projectText = $('#project_text').val(),
				projectImg = $('#fileformlabel').text();

			$('#add_project').before('<div class="work_block apennded"><div class="work_block_img"><img src="img/sites/' + projectImg + '" class="work_block_img_site" alt=""><div class="img_overlay"><a href="https://' + projectUrl + '" class="img_overlay_name">' + projectName + '</a></div></div><a href="https://' + projectUrl + '" class="mini_italic">' + projectUrl + '</a><p class="work_block_p">' + projectText + '</p></div>')
		}

	return {
        init: function() {
			start();
		}
	}

}());





// Popups

var Popups = (function(){
	var	popups = $('.popup1');

  var start = function() {
    _setUpListeners();
  },
  _setUpListeners = function() {

	    $('.popup1__close, .popup1__overlay').on('click', function(e){
				if($(this).closest('.popup1').attr('id') !== 'preload') {
		      e.preventDefault();
		      _close();
				}
	    });

  },
  _close = function() {
		popups.fadeOut(300);
	}

	return {
    init: start,

		open: function(id) {
			var	reqPopup = popups.filter(id);

			reqPopup.fadeIn(300);
		},
		close: function(id) {
			var	reqPopup = popups.filter(id);

			reqPopup.fadeOut(300);
		}
	}
}());

// Плагин для tooltips

 $.fn.tooltip = function(options) {
    options = {
        position: options.position || 'right',
        content : options.content || 'Tooltip',
    };

    var markup = '<div class="tooltip tooltip_' + options.position + '">' +
                    '<div class="tooltip__inner">' + options.content + '</div>' +
                 '</div>';

    var $this = this,
        body = $('body'),
        elemLength = $('.tooltipstered').length;
    var thisElemNumber;



    if(!$this.is("[data-elem-number]")) {
      $this.attr('data-elem-number', elemLength);
    }


    if(!$this.hasClass('tooltipstered')) {
      thisElemNumber = $this.data('elem-number');
      $this
        .addClass('tooltipstered')
        .attr('data-tooltip-position', options.position);
        body.append(markup);
        _positionIt($this, body.find('.tooltip').last(), options.position);
    }

    $this.on('mousedown', function() {
    	$('[data-tooltip-number = ' + thisElemNumber +']').remove();
      $this.removeClass('tooltipstered').removeClass('error');
    });

    $('[type="reset"]').on('click', function() {
      $('[data-elem-number]').removeClass('tooltipstered').removeClass('error');
      $('[data-tooltip-number]').remove();
    });

    $(window).resize(function() {
    	$('.tooltipstered').each(function() {
    		var position = $(this).data('tooltip-position'),
            resizedTooltipNumber = $(this).data('elem-number'),
            resizedTooltip = $('[data-tooltip-number = ' + resizedTooltipNumber +']');
    		_positionIt($(this), resizedTooltip, position);
    	});
    });

    function _positionIt(elem, tooltip, position) {
        if(!tooltip.is("[data-tooltip-number]")) {
          tooltip.attr('data-tooltip-number', thisElemNumber);
        }

        var elemWidth = elem.outerWidth(true),
            elemHeight = elem.outerHeight(true),
            topEdge = elem.offset().top,
            bottomEdge = topEdge + elemHeight,
            leftEdge = elem.offset().left,
            rightEdge = leftEdge + elemWidth+1;

        var tooltipWidth = tooltip.outerWidth(true),
            tooltipHeight = tooltip.outerHeight(true),
            leftCentered = (elemWidth / 2) - (tooltipWidth / 2),
            topCentered = (elemHeight / 2) - (tooltipHeight / 2);

        var positions = {};

        switch(position) {
            case 'right' :
                positions = {
                    left: rightEdge + 8,
                    top: topEdge + topCentered
                };
                break;
            case 'top' :
                positions = {
                    left: leftEdge + leftCentered,
                    top: topEdge - tooltipHeight
                };
                break;
            case 'bottom' :
                positions = {
                    left: leftEdge + leftCentered,
                    top: bottomEdge
                };
                break;
            case 'left' :
                positions = {
                    left: leftEdge - tooltipWidth - 8,
                    top: topEdge + topCentered
                };
                break;
        }

        tooltip
            .offset(positions)
            .css({
                'opacity': 1
            });
    }
};

// Валидатор


var validateThisForm = (function() {

  var start = function() {
    _setUpListeners();

  },
  _setUpListeners = function() {
		$('form').on('submit', function(e) {
      ie8SafePreventEvent(e);

      var $this = $(this);

      if(validateThis($this)) {
			     postFormData($this);
  		}

    });

  },
	validateThis = function(form) {
	  var textType = form.find('[data-validation="text"]'),
	      mailType = form.find('[data-validation="mail"]'),
	      phoneType = form.find('[data-validation="phone"]');

	  textType.each(function() {
	    var $this = $(this),
	        emptyField = $.trim($this.val());

	    if(emptyField === '') {
	      $this.tooltip({
	        content: 'Заполните поле',
	        position: $this.data('tooltip-position')//'right'
	      });
	      $this.addClass('error');
	    } else {
	      $this.removeClass('error');
	    }
	  });

	  mailType.each(function() {
	    var $this = $(this),
	        regExp = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
	        isMail = regExp.test($this.val());

	    if(!isMail) {
	      $this.tooltip({
	        content: 'Заполните поле',
	        position: 'right'
	      });
	      $this.addClass('error');
	    } else {
	      $this.removeClass('error');
	    }
	  });

	  phoneType.each(function() {
	    var $this = $(this),
	        regExp = /[0-9]/,
	        isphone = regExp.test($this.val());

	    if(!isphone) {
	      $this.tooltip({
	        content: 'Заполните поле',
	        position: 'right'
	      });
	      $this.addClass('error');
	    } else {
	      $this.removeClass('error');
	    }
	  });

	  return form.find('.error').length === 0;
	},
	postFormData = function(form) {

		var serverAnswer = _ajaxForm(form);

		serverAnswer.done(function(ans) {
			console.log(ans);
			if( ans === 'ok' ) {
				Popups.close('#preload');
				Popups.open('#success');
				form.find('input, textarea').val('');
			} else {
				Popups.close('#preload');
				Popups.open('#error');
			};
		});

	},
	_ajaxForm = function(form) {
		var url = form.attr('action');

		if(!url) {
			console.log('set action attribute to your form, you fool!!');
		}

		var data = form.serialize();

		var result = $.ajax({
			url: url,
			type: 'POST',
			data: data,
			beforeSend: function () {
				Popups.open('#preload');
			}
		})
		.fail(function(ans) {
			console.log('проблемы PHP');
		});

		return result;

	}

  return {
    init: start
  }

}());



	//
	// var tooltips = (function() {
	// 	var valid = false;
	// 	var start = function() {
	// 			_setUpListeners();
	// 		},
	// 		_setUpListeners = function() {
	// 			$('form')
	// 				.on('submit', _checkForm) // $(this) = form
	// 				.on('keydown', '.error, .success', _removeValidator)
	// 				.on('change', '#upload', _checkForm); // $(this) = input#upload
	// 			//$('#add_new_project').on('submit', _validateProjectPhp);
	// 		},
	// 		_checkForm = function(e) {
	// 			ie8SafePreventEvent(e);
	//
	// 			var $thisCheck = $(this);
	//
	// 			_validateForm($thisCheck);
	// 			_addTooltips($thisCheck);
	//
	// 			_resetAll();
	//
	// 			if(_validateForm($thisCheck) && $thisCheck.is('form')) {
	// 				addPproject.init();
	// 				popup.close();
	// 			}
	// 		},
	// 		_validateProjectPhp = function($thisCheck) {
	//
	// 			//if(valid === false) return false;
	//
	// 			var form = $thisCheck,
	// 				url =  'add_project.php',
	// 				serverAnswer = _ajaxForm(form, url);
	//
	// 			serverAnswer.done(function(ans) {
	// 				var formSuccess = form.find('.success_mes'),
	// 					formError = form.find('.error_mes');
	// 				if(ans.status === 'OK') {
	// 					formError.hide();
	// 					//popup.close();
	// 					//formSuccess.text(ans.text).show();
	// 				} else {
	// 					formSuccess.hide();
	// 					formError.text(ans.text).show();
	// 				};
	// 			});
	// 		},
	// 		_ajaxForm = function(form, url) {
	//
	// 			//if(!valid) return false;
	//
	// 			var data = form.serialize();
	//
	// 			var result =  $.ajax({
	// 				url: url,
	// 				type: 'POST',
	// 				dataType: 'json',
	// 				data: data,
	// 			})
	// 			.fail(function(ans) {
	// 				console.log('проблемы PHP');
	// 				form.find('.error_mes').text('на сервере ошибка').show();
	// 			});
	//
	// 			return result;
	//
	// 		},
	// 		_validateForm = function($thisCheck) {
	// 			var inputs;
	// 			valid = true;
	//
	// 			if($thisCheck.is('form')) {
	// 				inputs = $('form').find('input, textarea');
	// 			} else {
	// 				inputs = $('#upload');
	// 			};
	// 			//console.log($thisCheck);
	// 			$.each(inputs, function() {
	// 				var input = $(this),
	// 					val = input.val();
	//
	// 				if(val === ""){
	// 					input.addClass('error').removeClass('success');
	// 					input.siblings('#fileformlabel').addClass('error').removeClass('success');
	// 					valid = false;
	// 					_validateProjectPhp($thisCheck);
	// 				} else {
	// 					input.removeClass('error').addClass('success');
	// 					input.siblings('#fileformlabel').removeClass('error').addClass('success');
	// 					input.siblings('.tooltip').remove();
	// 				}
	// 			});
	//
	// 			$('.fileform').css({
	// 				'border' : 'none'
	// 			});
	//
	// 			return valid;
	// 		},
	//
	// 		_removeValidator = function() {
	// 			var validator = $(this);
	// 			validator.removeClass('error').removeClass('success');
	// 			validator.siblings('.tooltip').remove();
	//
	// 		},
	// 		_addTooltips = function($thisCheck) {
	// 			var inputs = $('form').find('input, textarea');
	//
	// 			$.each(inputs, function() {
	//
	// 				var input = $(this),
	// 					tooltipText = input.data('tooltip');
	//
	// 				if(input.hasClass('error')) {
	// 					input.siblings('.tooltip').remove();
	// 					input.closest('.label').append('<div class="tooltip">' + tooltipText + '</div>');
	//
	// 					var tooltipThis = input.siblings('.tooltip'),
	// 						tooltipWidth = tooltipThis.width(),
	// 						tooltipHeight = tooltipThis.height(),
	// 						tooltipPlace = input.data('place');
	//
	// 					tooltipThis.css({
	// 						'width' : tooltipWidth + 5 + 'px',
	// 						'margin-top' : -(tooltipHeight + 12) / 2 + 'px'
	// 					});
	//
	// 					if(tooltipPlace === 'right') {
	// 						tooltipThis
	// 							.css({
	// 								'right' : -tooltipWidth - 35 + 'px',
	// 							})
	// 							.addClass('tooltip_right');
	//
	// 					} else {
	// 						tooltipThis.css({
	// 							'left' : -tooltipWidth - 35 + 'px',
	// 						});
	// 					}
	// 				}
	//
	// 			});
	// 		},
	// 		_resetAll = function() {
	// 			$('[type="reset"]').on('click', function() {
	// 				$('.tooltip').hide();
	// 				$('input, textarea, #fileformlabel').removeClass('error').removeClass('success');
	// 			});
	// 		}
	//
	// 	return {
	// 		init: function() {
	// 			start();
	//
	// 		}
	// 	}
	// })();
	//
	//
