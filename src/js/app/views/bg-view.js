/*global define THREE $ TweenMax*/
define(function (require) {

	var Backbone = require('backbone'),
		Vars = require('pres/models/vars'),
		UserEvent = require('pres/events/user-event'),
		AppEvent = require('pres/events/app-event'),
		CutBg = require('app/views/bg/trans-cut-bg'),
		CircleBg = require('app/views/bg/trans-circle-bg'),
		ArcBg = require('app/views/bg/trans-arc-bg'),
		RectBg = require('app/views/bg/trans-rect-bg'),
		StripeBg = require('app/views/bg/trans-stripes-bg'),
		StripeZig = require('app/views/bg/trans-stripes-zig-bg'),
		ZigBg = require('app/views/bg/trans-zig-bg'),
		ColorSquaresBg = require('app/views/bg/trans-squares-color-bg'),
		SquaresBg = require('app/views/bg/trans-squares-bg'),
		TerrainBg = require('app/views/bg/terrain-bg'),
		BG_ARRAY = [CutBg, CircleBg, ArcBg, RectBg, StripeBg, StripeZig, ZigBg, SquaresBg, ColorSquaresBg],
		currentSlide,
		isTerrain,
		currentBg,
		BgView;

	BgView = Backbone.View.extend({

		initialize: function () {

			this.$el = $('#bg');
			this.canvas = this.$el[0];
			this.$webglEl = $('#bg-3d');
			this.webglCanvas = this.$webglEl[0];
			this.ctx = this.canvas.getContext('2d');

			this.addRenderer();

			this.resize();
			UserEvent.on('resize', this.resize, this);
		},

		addRenderer: function () {
			this.renderer = new THREE.WebGLRenderer({canvas: this.webglCanvas, antialias: true});
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.renderer.setClearColor(0x000000);
		},

		render: function () {
			var currentView,
				slide;

			if (currentSlide !== Vars.get('currentSlide')) {
				slide = Vars.get('slides').at(Vars.get('currentSlide'));

				if (typeof(slide.get('view').$el.data('pos')) !== 'undefined') {
					this.handleTerrainSlide();
				} else {
					this.handleNormalSlide();
				}
			}

			if (currentBg) {
				currentBg.render();
			}
		},

		handleTerrainSlide: function () {
			if (!isTerrain) {
				if (typeof(currentSlide) !== 'undefined' && currentBg) {
					currentBg.destroy();
				}

				clearTimeout(this.to); //cancel delayed hide
				this.$el.hide();
				this.$webglEl.show();

				currentSlide = Vars.get('currentSlide');

				currentBg = null;
				currentBg = new TerrainBg();
				currentBg.init(this.renderer);
				isTerrain = true;

				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			}

			return;
		},

		handleNormalSlide: function () {

			var slide = Vars.get('slides').at(Vars.get('currentSlide'));

			if (typeof(currentSlide) !== 'undefined' && currentBg) {
				currentBg.destroy();
			}

			this.$el.show();

			//delay hide to allow transition

			if (isTerrain) {
				this.to = setTimeout(function () {
					this.$webglEl.hide();
				}.bind(this), 2000);
			} else {
				this.$webglEl.hide();
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

			isTerrain = false;
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
	});

	return BgView;
});
