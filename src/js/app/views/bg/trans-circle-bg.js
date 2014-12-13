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
			instance.x = window.innerWidth / 2;
			instance.y = window.innerHeight / 2;
			instance.r = 0;
			
			slide = Vars.get('slides').at(Vars.get('currentSlide'));
			instance.color = slide.get('view').$el.data('color');
			
			instance.tween = TweenMax.to(instance, 1, {
				r: window.innerWidth, 
				ease: Quad.easeOut,
				onUpdate: instance.render
			});
		};
		
		instance.render = function () {
			if (instance.alive) {
				instance.ctx.fillStyle = instance.color;
				instance.ctx.beginPath();
				instance.ctx.arc(instance.x, instance.y, instance.r, 0, 2 * Math.PI, false);
				instance.ctx.fill();
				instance.ctx.closePath();
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