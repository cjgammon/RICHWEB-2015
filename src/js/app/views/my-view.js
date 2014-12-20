/*global define*/
define(function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('pres/models/vars'),
		AppEvent = require('pres/events/app-event'),
		SlideView = require('pres/views/slide-view'),
		InOutView;
	
	require('snap');
	require('tweenmax');
	require('snapplugin');
	
	InOutView = SlideView.extend({
		
		resolve: function () {
			var slides = Vars.get('slides'),
				currentSlide = Vars.get('currentSlide'),
				view = slides.get(currentSlide).get('view');
			
			if (view == this) {	
				this.step = 0;
				this.active = true;

				AppEvent.trigger('stopanimation');
				
				this.s = Snap('#me-ill');
				this.guy = this.s.select('#me-character');
				this.guy.attr({transform: 'translate(0, 200)'});
				
				this.circle1 = this.s.select('#me-circle-1');
				this.circle1.attr({r: 0});
				
				this.circle2 = this.s.select('#me-circle-2');
				this.circle2.attr({r: 0});
				
				this.h2 = this.$el.find('h2');
				this.h4 = this.$el.find('h4');
				TweenMax.set(this.h2, {opacity: 0, y: 10});
				TweenMax.set(this.h4, {opacity: 0, y: 10});
				
				this.animIn();
			}
		},
		
		desolve: function () {
			if (this.active) {
				this.active = false;
				AppEvent.trigger('startanimation');
			}
		},
		
		animIn: function () {
			var tl = new TimelineMax();
			tl.add(TweenMax.to(this.circle1, 0.5, {snap: {r: 118}, ease: Quad.easeOut}));
			tl.add(TweenMax.to(this.circle2, 0.5, {snap: {r: 103}, ease: Quad.easeOut}), 0.2);
			tl.add(TweenMax.to(this.guy, 1, {snap: {ty: 0}, ease: Back.easeOut}));
			tl.add(TweenMax.to(this.h2, 0.2, {opacity: 1, y: 0, ease: Quad.easeOut}), '-=1');
			tl.add(TweenMax.to(this.h4, 0.2, {opacity: 1, y: 0, ease: Quad.easeOut}), '-=0.8');
		},
		
		animOut: function () {
			var tl = new TimelineMax({onComplete: this.animOutComplete});
			tl.add(TweenMax.to(this.guy, 0.5, {snap: {ty: 200}, ease: Back.easeIn}));
			tl.add(TweenMax.to(this.h2, 0.2, {opacity: 0, y: 10, ease: Quad.easeIn}), 0);
			tl.add(TweenMax.to(this.h4, 0.2, {opacity: 0, y: 10, ease: Quad.easeIn}), 0);
			tl.add(TweenMax.to(this.circle2, 0.2, {snap: {r: 0}, ease: Quad.easeIn}));
			tl.add(TweenMax.to(this.circle1, 0.2, {snap: {r: 0}, ease: Quad.easeIn}), '-=0.1');
		},
		
		animOutComplete: function () {
			AppEvent.trigger('next');
		},

        trigger: function () {
            this.step += 1;
            
            if (this.step < 2) {
				this.animOut();
            } else {
		        AppEvent.trigger('next');
            }
        }
		
	});
	
	return InOutView;
});

