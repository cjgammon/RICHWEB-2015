/*global define THREE $ TweenMax*/
define(function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('pres/models/vars'),
		UserEvent = require('pres/events/user-event'),
		AppEvent = require('pres/events/app-event'),
		currentSlide,
		MaskView;
	
    require('snap');

	MaskView = Backbone.View.extend({

		initialize: function () {
				
			this.maskSVG = Snap('#mask');
			this.bgSVG = Snap('#bg');

			//this.canvas = this.$el[0];
			//this.ctx = this.canvas.getContext('2d');
			//this.resize();
			//UserEvent.on('resize', this.resize, this);
		},
		
        /*
		render: function () {
			var currentView,
				slide;
			
			if (currentSlide !== Vars.get('currentSlide')) {
				slide = Vars.get('slides').at(Vars.get('currentSlide'));
				
				this.handleNormalSlide();
			}
		
			if (currentBg) {
				currentBg.render();
			}
		},
		
		handleNormalSlide: function () {
			var slide = Vars.get('slides').at(Vars.get('currentSlide'));
			
			if (typeof(currentSlide) !== 'undefined' && currentBg) {
				currentBg.destroy();
			}
			
			currentSlide = Vars.get('currentSlide');
			currentView = this.getCurrentView(slide);
			
			if (currentView) {
				currentBg = null;
				currentBg = new currentView();
				currentBg.init(this.ctx);
			} else {
				currentBg = null;
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			}
			
		},

		getCurrentView: function (slide) {
			var transition = slide.get('view').$el.data('trans');
					
			if (transition) {
				return BG_ARRAY[parseInt(transition)];
			} else if (slide.get('view').$el.data('color')) {
				return BG_ARRAY[0];
			}
		},

		resize: function () {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			this.render();
		}
        */
	});
		
	return MaskView;
});
