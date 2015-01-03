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
			this.x = window.innerWidth / 2;
			this.y = window.innerHeight / 4;
				
			SlideView.prototype.initialize.call(this);
		},
		
		resolve: function () {
			var slides = Vars.get('slides'),
				currentSlide = Vars.get('currentSlide'),
				view = slides.get(currentSlide).get('view');
						
			if (view == this) {
				this.active = true;
				clearInterval(this.interval);
				
				this.x = window.innerWidth / 2;
				this.y = window.innerHeight / 4;
				
				this.circle.transform('translate(' + this.x + ', ' + this.y + ')');
				TweenMax.to(this.circle, 1, {snap: {opacity: 0.7}});
				this.xstring.text(this.x);
				this.ystring.text(this.y);
				
				this.interval = setInterval(this.update.bind(this), 2000);
			}
		},

		update: function () {
			var eases = [Back.easeOut, Quad.easeOut, Circ.easeInOut, Quint.easeIn],
				r = Math.floor(Math.random() * eases.length);
			
			TweenMax.to(this.circle, 1, {snap: {tx: this.x, ty: this.y}});
			this.xstring.text(this.x);
			this.ystring.text(this.y);
			
			this.x = Math.round(50 + Math.random() * window.innerWidth - 100);
			this.y = Math.round(50 + Math.random() * window.innerHeight - 100);
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