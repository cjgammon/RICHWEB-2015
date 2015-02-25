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
			instance.width = 0;
			instance.height = 0;
			win = {width: window.innerWidth, height: window.innerHeight};
			instance.x = win.width / 2;
			instance.y = win.height / 2;
			
			slide = Vars.get('slides').at(Vars.get('currentSlide'));
			instance.color = slide.get('view').$el.data('color');
			
			instance.tween = TweenMax.to(instance, 0.4, {
				width: win.width, 
				height: win.height, 
				ease: Quad.easeOut,
				onUpdate: instance.render
			});
		};
		
		instance.render = function () {
			if (instance.alive) {
				
				instance.ctx.fillStyle = instance.color;
				
				instance.ctx.beginPath();				
				instance.ctx.fillRect(instance.x - (instance.width / 2), instance.y - (instance.height / 2), instance.width, instance.height);
				instance.ctx.closePath();
				
			}	
		};

		this.destroy = function () {
			delta = null;
			
			instance.mask = null;
			instance.tween = null;
			instance.alive = null;
			
			instance.init = null;
			instance.render = null;
		};
	}
	
	return BgCover;
	
});