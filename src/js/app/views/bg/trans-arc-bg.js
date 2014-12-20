define(function (require) {
	
	var Vars = require('pres/models/vars'),
		BgCover;
	
	require('tweenmax')
	
	BgCover = function () {
		var instance = this,
			delta = 0,
			slide;
		
		instance.init = function (ctx, color) {
			instance.alive = true;
			instance.ctx = ctx;
			
			instance.points = [
				{x: 0, y: 0},
				{x: window.innerWidth / 2, y: 0},
				{x: window.innerWidth, y: 0}
			];
			
			slide = Vars.get('slides').at(Vars.get('currentSlide'));
			instance.color = slide.get('view').$el.data('color');

			instance.timeline = new TimelineMax({onUpdate: instance.render});
			instance.timeline.add(TweenMax.to(instance.points[0], 0.5, {y: window.innerHeight, ease: Circ.easeIn}), 0);
			instance.timeline.add(TweenMax.to(instance.points[1], 0.5, {y: window.innerHeight, ease: Circ.easeOut}), 0);
			instance.timeline.add(TweenMax.to(instance.points[2], 0.5, {y: window.innerHeight, ease: Circ.easeIn}), 0);
		};

		instance.render = function () {						
			if (instance.alive) {
				instance.ctx.fillStyle = instance.color;
				instance.ctx.beginPath();
				
				instance.ctx.moveTo(window.innerWidth, 0);
				instance.ctx.lineTo(0, 0);
				instance.ctx.lineTo(instance.points[0].x, instance.points[0].y);
				instance.ctx.quadraticCurveTo(instance.points[1].x, instance.points[1].y, instance.points[2].x, instance.points[2].y);
				
				instance.ctx.closePath();
				
				instance.ctx.fill();
			}	
		};
		
		this.destroy = function () {
			delta = null;
			
			instance.tween = null;
			instance.alive = null;
			
			instance.init = null;
			instance.render = null;
		};
	}
	
	return BgCover;
	
});