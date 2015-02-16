define(function (require) {

	var Backbone = require('backbone'),
		Vars = require('pres/models/vars'),
		AppEvent = require('pres/events/app-event'),
		SlideView = require('pres/views/slide-view'),
		SlideBasicView;

	require('tweenmax');
	require('snap');

	SlideBasicView = SlideView.extend({

		initialize: function () {
			this.s = Snap('#gsap-code-svg');
			this.circle = this.s.select('#gsap-code-circle');
			this.xstring = $('#gsap-code-x');
			this.ystring = $('#gsap-code-y');
			this.x = 1024 / 2;
			this.y = 768 / 4;
				
			SlideView.prototype.initialize.call(this);
		},

		resolve: function () {
			var slides = Vars.get('slides'),
				currentSlide = Vars.get('currentSlide'),
				view = slides.get(currentSlide).get('view');
						
			if (view == this) {
				this.active = true;
				clearInterval(this.interval);
				
				this.x = Math.round(window.innerWidth / 2);
				this.y = Math.round(window.innerHeight / 4);
				
				this.circle.transform('translate(' + this.x + ', ' + this.y + ')');
				this.xstring.text(this.x);
				this.ystring.text(this.y);
								
				TweenMax.to(this.circle, 0.5, {snap: {opacity: 0.7}, onComplete: function () {
					this.update();
					this.interval = setInterval(this.update.bind(this), 2000);
				}.bind(this)});
			}
		},

		update: function () {
			this.x = Math.round(100 + Math.random() * (1024 - 200));
			this.y = Math.round(100 + Math.random() * (768 - 200));
			
			this.xstring.text(this.x);
			this.ystring.text(this.y);
			TweenMax.to(this.circle, 1, {snap: {tx: this.x, ty: this.y}});
		},

		desolve: function () {
			if (this.active) {
				this.active = false;
				clearInterval(this.interval);
			}
		}
		
	});

	return SlideBasicView;
});