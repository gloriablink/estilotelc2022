Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@gloriablink 
gloriablink
/
estilotelc2022
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
estilotelc2022/style.js /
@gloriablink
gloriablink Update style.js
Latest commit 17fe1d4 20 minutes ago
 History
 1 contributor
140 lines (112 sloc)  4.57 KB
   
(function (blink) {
	'use strict';

	var estilotelc2022Style = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	estilotelc2022Style.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_estilotelc2022',
		extraPlugins: ['image2'],
		customColors: '8cc63f,2abb9c,c2615b,ff3f21,983220',
		ckEditorStyles: {
			name: 'estilotelc2022',
			styles: [
				{ name: 'Título 1', element: 'h4', attributes: { 'class': 'bck-title1'} },
				{ name: 'Título 2', element: 'h4', attributes: { 'class': 'bck-title2'} },
				{ name: 'Título 3', element: 'h4', attributes: { 'class': 'bck-title3'} },

				{ name: 'Default', element: 'ol', attributes: { 'class': 'bck-ol' } },
				{ name: 'Default', element: 'ul', attributes: { 'class': 'bck-ul' } },

				{ name: 'Lista ordenada 1', element: 'ol', attributes: { 'class': 'bck-ol-1' } },

				//BK-15873 Quitamos el estilo versalitas, ya que lo hereda de basic

				{ name: 'Imagen derecha', element: 'img', attributes: { 'class': 'bck-img right' } },
				{ name: 'Imagen izquierda', element: 'img', attributes: { 'class': 'bck-img left' } },

				{ name: 'Caja Simple', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-simple' } },

				{ name: 'Tabla', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table'} },
				{ name: 'Tabla centrada', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table-center'} },
				{ name: 'Celda 1', element: 'td', attributes: { 'class': 'bck-td'} }
			]
		},

		init: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(this);
			this.addActivityTitle();
			if(window.esWeb) return;
			this.removeFinalSlide();
			this.formatCarouselindicators();
			this.addSlideNavigators();
		},

		removeFinalSlide: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.removeFinalSlide.call(this, true);
		},

		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html() + ' > ' + blink.courseInfo.unit;
			})
		},

		formatCarouselindicators: function () {
			var $navbarBottom = $('.navbar-bottom'),
				$carouselIndicators = $('.slider-indicators').find('li');

			$navbarBottom.find('li').tooltip('destroy');

			var dropDown = '' +
					'<div class="dropdown">' +
						'<button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">' +
							'Índice' +
							'<span class="caret"></span>' +
						'</button>' +
						'<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">';

			$navbarBottom.find('li').tooltip('destroy');

			var navigatorIndex = 0;
			for (var index = 0; index < window.secuencia.length; index++) {
				var slide = eval('t'+index+'_slide'),
					slideTitle = slide.title;

				if (slide.isConcatenate) continue;

				dropDown += '<li role="presentation"><a role="menuitem">' + (navigatorIndex+1) + '. ' + stripHTML(slideTitle) + '</a></li>';
				$navbarBottom.find('li').eq(navigatorIndex).html('<span title="'+ stripHTML(slideTitle) +'">'+(navigatorIndex+1)+'</span>');
				navigatorIndex++;

			};

			dropDown += '' +
						'</ul>' +
					'</div>';

			$navbarBottom
				.attr('class', 'estilotelc2022-navbar')
				.wrapInner('<div class="navbar-content"></div>')
				.find('ol')
					.before(dropDown)
					.wrap('<div id="top-navigator"/>')
					.end()
				.find('.dropdown').find('li')
					.on('click', function (event) {
						$navbarBottom.find('ol').find('li').eq($(this).index()).trigger('click');
					});

			if (!blink.hasTouch) {
				$navbarBottom
					.find('ol').find('span')
						.tooltip({
							placement: 'bottom',
							container: 'body'
						});
			}
		},

		//BK-15873 Quitamos la funcion getEditorStyles para que la herede de basic
	};

	estilotelc2022Style.prototype = _.extend({}, new blink.theme.styles.basic(), estilotelc2022Style.prototype);

	blink.theme.styles.estilotelc2022 = estilotelc2022Style;

})( blink );

$(document).ready(function () {
    $('.item').find('.header').find('.title')
		.filter(function () {
			return $(this).find('.empty').length;
		}).hideBlink();

    $('.item').find('.header').find('.title')
		.filter(function () {
			return !$(this).find('.empty').length;
		})
		.each(function () {
			var $header = $(this).find('h3');
			$header.length && $header.html($header.html().replace(' ', ''));
		});
});
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
