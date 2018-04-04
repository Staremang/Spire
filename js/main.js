/**
 * anchor.js - jQuery Plugin
 * Jump to a specific section smoothly
 *
 * @dependencies	jQuery v1.5.0 http://jquery.com
 * @author			Cornel Boppart <cornel@bopp-art.com>
 * @copyright		Author
 
 * @version		1.0.5 (02/11/2014)
 */

(function ($) {
	
	window.anchor = {
		
		/**
		 * Default settings
		 *
		 */
		settings: {
			transitionDuration: 2000,
			transitionTimingFunction: 'swing',
			labels: {
				error: 'Couldn\'t find any section'
			}
		},

		/**
		 * Initializes the plugin
		 *
		 * @param	{object}	options	The plugin options (Merged with default settings)
		 * @return	{object}	this	The current element itself
		 */
		init: function (options) {
			// Apply merged settings to the current object
			$(this).data('settings', $.extend(anchor.settings, options));

			return this.each(function () {
				var $this = $(this);

				$this.unbind('click').click(function (event) {
					event.preventDefault();
					anchor.jumpTo(
						anchor.getTopOffsetPosition($this),
						$this.data('settings')
					);
				});
			});
		},

		/**
		 * Gets the top offset position
		 *
		 * @param	{object}	$object				The root object to get sections position from
		 * @return	{int}		topOffsetPosition	The top offset position
		 */
		getTopOffsetPosition: function ($object) {
			var href = $object.attr('href'),
				$section = $($(href).get(0)),
				documentHeight = $(document).height(),
				browserHeight = $(window).height();

			if (!$section || $section.length < 1) {
				throw new ReferenceError(anchor.settings.labels.error);
			}

			if (($section.offset().top + browserHeight) > documentHeight) {
				return documentHeight - browserHeight;
			} else {
				return $section.offset().top;
			}
		},
		
		/**
		 * Jumps to the specific position
		 *
		 * @param	{int}		topOffsetPosition	The top offset position
		 * @param	{object}	settings			The object specific settings
		 * @return	{void}
		 */
		jumpTo: function (topOffsetPosition, settings) {
			var $viewport = $('html, body');

			$viewport.animate(
				{scrollTop: topOffsetPosition},
				settings.transitionDuration,
				settings.transitionTimingFunction
			);

				// Stop the animation immediately, if a user manually scrolls during the animation.
			$viewport.bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(event){
				if (event.which > 0 || event.type === 'mousedown' || event.type === 'mousewheel') {
					$viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
				}
			});
		}

	};

	$.fn.anchor = function (method) {
			// Method calling logic
		if (anchor[method]) {
			return anchor[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return anchor.init.apply(this, arguments);
		} else {
			return $.error('Method ' + method + ' does not exist on jQuery.anchor');
		}
	};

})(jQuery);

if (typeof ymaps !== "undefined" && typeof addr !== "undefined") {
	ymaps.ready(init);
	var yaMap;
	function init() {
		ymaps.geocode(addr, {
			results: 1
		}).then(function (res) {

			var coords = res.geoObjects.get(0).geometry.getCoordinates(),
				myPlacemark = new ymaps.Placemark(coords);
			yaMap = new ymaps.Map("map",{
				center: coords,
				zoom: 17,
				controls: ['zoomControl', 'fullscreenControl']
			});

			yaMap.geoObjects.add(myPlacemark);
		});
	}
}

$(document).ready(function () {
	$("[data-fancybox]").fancybox({
		margin : [0, 0]
	});

	$('a[data-anchor]').anchor({
		transitionDuration : 1000
	});

	$('input[type=tel]').inputmask({
		'mask': '+7 (999) 999-99-99'
	})

	$('input[type=email]').inputmask({
		'alias': 'email'
	})


	
	document.addEventListener('mouseleave', handleMouseleave);
	
	function handleMouseleave (e) {
		if (e.clientY > 20) return;
		$.fancybox.open($('#stop-popup-form'));
		document.removeEventListener('mouseleave', handleMouseleave);
	}
	
	
	if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
		$('.section-hero__video').hide();
//		$('.section-hero__video-overlay').hide();
	}

	
	
	
	
	$('[data-menu-btn]').click(function() {
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$('[data-menu]').removeClass('active');
			document.body.style.overflow = 'auto';
		} else {
			$(this).addClass('open');
			$('[data-menu]').addClass('active');
			document.body.style.overflow = 'hidden';
		}
	})
	$('[data-menu]').find('a').click(function () {
		document.querySelector('[data-menu]').classList.remove('active');
		document.querySelector('[data-menu-btn]').classList.remove('open');
		document.body.style.overflow = 'auto';
	})


	
	
	
	
	
	// interview-form
	// guest-visit-form
	// call-me-form
	// guest-visit-form-m
	// thanks-and-gift-form
	// stop-popup

	$('form').on('submit', function (e) {
		e.preventDefault();
		var data = $(this).serialize(),
			id = $(this).attr('id'),
			sentForms = JSON.parse(localStorage.getItem('sentForms'));


//			console.log(data);

		if (!sentForms || sentForms == '') {
			sentForms = {
				"interview": false,
				"guestVisit": false,
				"gift": false,
				"callMe": false
			}
		}


		if (id == 'interview-form') {
			if (sentForms.interview) {
				alert('Вы уже проходили опрос!');
				return;
			} else {
				sentForms.interview = true;
			}

		} else if (id == 'guest-visit-form' || id == 'guest-visit-form-m') {
			if (sentForms.guestVisit) {
				alert('Вы уже записались на гостевой визит!');
				$.fancybox.close();
				return;
			} else {
				sentForms.guestVisit = true;
			}

//		} else if (id == 'call-me-form') {
//			if (sentForms.callme) {
//				alert('Вы уже отправляли эти данные!');
//				$.fancybox.close();
//				return;
//			} else {
//				sentForms.callme = true;
//			}

		} else if (id == 'thanks-and-gift-form') {
			if (sentForms.gift) {
				alert('Вы уже приглашали друга!');
				$.fancybox.close();
				return;
			} else {
				sentForms.gift = true;
			}

		}

		var submitBtn = $(this).find('button[type="submit"]'),
			submitBtnText = submitBtn.text();
		
		
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			beforeSend: function () {
				submitBtn.attr('disabled', '');
				submitBtn.text('Отправка...');
			},
			error: function (error) {
				alert('Ошибка ' + error.status + '. Повторите позднее.');
				submitBtn.removeAttr('disabled');
				submitBtn.text(submitBtnText);
			},
			success: function (data) {
				submitBtn.removeAttr('disabled');
				submitBtn.text(submitBtnText);
				
				data = JSON.parse(data);
				if (data.sended) {

					if (id == 'interview-form') {
						$('#gift-parent-name').val($('#6-step-name').val());
						
						$.fancybox.open($('#thanks-and-gift'));

						if (typeof yaMetrika != 'undefined') {
							yaMetrika.reachGoal('karta');
						}

					} else if (id == 'guest-visit-form') {

						$('#gift-parent-name').val($('#guest-visit-form__name').val());
						$.fancybox.open($('#thanks-and-gift'));

						if (typeof yaMetrika != 'undefined') {
							yaMetrika.reachGoal('gostevoi');
						}

					} else if (id == 'call-me-form') {

						if (typeof yaMetrika != 'undefined') {
							yaMetrika.reachGoal('zvonok');
						}

						$.fancybox.close();
						$.fancybox.open($('#thanks'));

					} else if (id == 'guest-visit-form-m') {

						if (typeof yaMetrika != 'undefined') {
							yaMetrika.reachGoal('gostevoi');
						}

						$.fancybox.close();

						$('#gift-parent-name').val($('#guest-visit-m-form__name').val());
						$.fancybox.open($('#thanks-and-gift'));

					} else if (id == 'thanks-and-gift-form') {

						if (typeof yaMetrika != 'undefined') {
							yaMetrika.reachGoal('podarok');
						}

						$.fancybox.close();
						$.fancybox.open($('#thanks'));
					} else if (id == 'stop-popup-form') {

						if (typeof yaMetrika != 'undefined') {
							yaMetrika.reachGoal('popup');
						}
						$.fancybox.close();
					}

					gtag('event', 'sendforms', { 'event_category': 'zayavka', 'event_action': 'podtverdit'});
					localStorage.setItem('sentForms', JSON.stringify(sentForms));

				} else {
					alert (data.message);
				}

			}
		});
	});

	
	
	
	

	var lastStep = 1;
	$('#bonus-1').addClass('active');
	$('[data-step="1"]').addClass('active');
	$('[data-step-scale="1"]').addClass('active');
	$('.step__container').height($('[data-step="1"]').outerHeight());
	
	$('[data-interview-to]').click(function() {
		var to = $(this).attr('data-interview-to');
		
		var checked = true;
		for (var i = 1; i < to; i++) {
			$('[data-step="' + i + '"]').find('input').each(function (i, input) {
				if (!input.checkValidity()) {
					checked = false;
				}
			})
		}
		
		if (!checked) {
//			$('#interview-form').find('[type="submit"]').click();
			alert('Выберите ответ!')
			return;
		}
		
		if (lastStep < to) {
			lastStep = to;
		}
		
		$('[data-step-scale]').removeClass('active');
		for (var i = 1; i <= to; i++) {
			$('[data-step-scale="' + i + '"]').addClass('active');
		}
		
		$('[data-step]').removeClass('active');
		$('[data-step="' + to + '"]').addClass('active');
		$('.step__container').height($('[data-step="' + to + '"]').outerHeight());
		
		if (lastStep == 2) {
			$('.step__discount-count').text('4000 р');
			$('#bonus-2').addClass('active');
		} else if (lastStep == 3) {
			$('.step__discount-count').text('6000 р');
			$('#bonus-3').addClass('active');
		} else if (lastStep == 4) {
			$('.step__discount-count').text('8000 р');
			$('#bonus-4').addClass('active');
		} else if (lastStep == 5) {
			$('.step__discount-count').text('10000 р');
			$('#bonus-5').addClass('active');
		}
	})
	
	
	
	
	

	
	$('.gallery-slider').addClass('owl-carousel owl-carousel_no-dots owl-theme');
	$('.gallery-slider').owlCarousel({ 
		loop: true,
		nav: false,
		navText: [ '', '' ],
		items: 1,
		onInitialized: sliderChange,
		onTranslated: sliderChange,
		responsive : {
			768 : {
				nav: true
			}
		}
	})
	function sliderChange (e) {

		var owlItems	= e.item.count,
			item			= e.item.index,
			calcItem	= Math.floor(item - (e.item.count / 2) + 1);

		if (calcItem === 0) {
			calcItem = owlItems;
		}
		if (calcItem > owlItems) {
			calcItem = 1;
		}

//				console.log($(e.target).find('.owl-item.active').children().attr('alt'));
//			console.log(calcItem + '/' + owlItems + " " + $(e.target).find('.owl-item.active').children().attr('alt'));

//				var index = e.item.index + 1,
//					count = e.item.count;
		if (calcItem < 10) {
			calcItem = '0' + String(calcItem);
		}
		if (owlItems < 10) {
			owlItems = '0' + String(owlItems);
		}
		$('.gallery__index').html(calcItem);
		$('.gallery__count').html(owlItems);
		$('.gallery__title').html($('.owl-item.active').find('img').attr('alt'));

	}
})