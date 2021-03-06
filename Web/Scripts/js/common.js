(function (window, document, jQuery, undefined) {
	'use strict';

	var common = new index();

	function index() {
		this._lFooter       = '.l-footer';
		this._mCut          = '.m-cut';
		this._pagination    = '.pagination';
		this._slideDown     = '.jq-slide-down';
		this._slideCut      = '.jq-slide-cut';
		this._arrow         = '.jq-arrow';
		this._animateSpeed  = 400;
		this._sectionIndex  = 0;
		this._sectionScroll = true;
	}

	index.prototype.checkCutLength = function() {
		if ($(common._mCut).length > 1) {
			var _str = '',
				_idx =  Math.round(projects.$b.scrollTop() / ($(common._mCut).height()));

			for (var i = 0; i < $(common._mCut).length; i++) {
				_str += '<li class="list"><button class="btn-dot jq-slide-cut"></button></li>';
			}
			$(common._pagination).find('.cut-dot').html(_str).find('> *').eq(_idx).addClass('is-curr');
		}
	}

	index.prototype.slideCut = function(n) {
		projects.$hb.animate({'scrollTop': projects.$w.height() * n}, common._animateSpeed);
		$(common._pagination).find('.cut-dot .list').removeClass('is-curr').eq(n).addClass('is-curr');
	}

	index.prototype.mousewheel = function() {
		projects.mousewheel(projects.$hb, function(e){
			if (!$(e.target).is('.sub-menu, .sub-menu *')) {
				e.preventDefault();
				e.stopPropagation();

				if (common._sectionScroll) {
					common._sectionScroll = false;
					common._sectionIndex = $(common._pagination).find('.cut-dot .list.is-curr').index();

					if ( e.deltaY < 0 ) {
						common._sectionIndex ++;
					} else {
						common._sectionIndex --;
					}

					if ( common._sectionIndex >= ( $(common._mCut).length - 1 ) ) {
						common._sectionIndex = ( $(common._mCut).length - 1 );
					} else if ( common._sectionIndex <= 0 ) {
						common._sectionIndex = 0;
					}

					common.slideCut(common._sectionIndex);

					setTimeout(function(){
						common._sectionScroll = true;
					}, common._animateSpeed);
				}
			}
		});
	}

	index.prototype.showFooter = function() {
		var _totalH  = projects.$b.height(),
			_cutH    = $(common._mCut).height(),
			_scrollH = projects.$b.scrollTop();

		if (_totalH === _cutH + _scrollH) {
			$(common._lFooter).addClass('is-show');
		} else {
			$(common._lFooter).removeClass('is-show');
		}
	}

	projects.$w.load(function(){
		common.checkCutLength();

		$('.m-datepicker').DatePicker();

		$(common._arrow).each(function(){
			var $this = $(this),
				$base = $this.parent().prev();

			$this.css('top', $base.offset().top - parseInt($('.m-header').css('top'), 10) + ($base.height() / 2) - ($this.outerHeight() / 2));
		});

		$('.btn-menu').on('click', function(){
			$(this).toggleClass('is-active');
			$(this).next('.m-menu').toggleClass('is-show');
		});

		$('.btn-sitemap').on('click', function(){
			$(this).toggleClass('is-active');
			$(this).prev('.sitemap-wrap').toggleClass('is-show');
		});

		$(common._slideDown).on('click', function(){
			common.slideCut(1);
		});

		$(common._slideCut, common._pagination).on('click', function(){
			common.slideCut($(this).parent('.list').index());
		});
	});

	projects.$d.ready(function(){
		if ( projects.device() === 'PC' ) {
			common.mousewheel();
			common.showFooter();
		}

		projects.owlCarousel(projects._owl);
	});

	projects.$w.on('scroll' , function(){
		if ( projects.device() === 'PC') {
			common.mousewheel();
			common.showFooter();
		}
	});
}(window, document, $));