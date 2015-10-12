define(function (require) {
	
	var Vars = require('pres/models/vars'),
		BgCover;
	
	require('tweenmax');
	
	BgCover = function () {
		var instance = this,
			delta = 0,
			slide;
		
		instance.init = function (ctx, color) {
			instance.alive = true;
			instance.ctx = ctx;
			instance.width = window.innerWidth;
			instance.height = window.innerHeight;
			instance.mask = {};
			instance.mask.x = 0;
			instance.mask.y = -instance.height;
			instance.mask.w = 0;
			instance.mask.h = 0;
			
			instance.lineWidth = 100;
			instance.x = -instance.lineWidth;
			
			slide = Vars.get('slides').at(Vars.get('currentSlide'));
			instance.color = slide.get('view').$el.data('color');
			
			instance.tween = TweenMax.to(instance.mask, 0.6, {
				y: 0, 
				ease: Sine.easeInOut,
				onUpdate: instance.render
			});
			
		};
		
		instance.render = function () {
			if (instance.alive) {
								
				instance.ctx.save();
				
				////////
				instance.ctx.save();
				instance.ctx.translate(instance.mask.x, instance.mask.y);
				
				instance.ctx.beginPath();				
                instance.ctx.moveTo(0, 0);
                instance.ctx.lineTo(instance.width, 0);
                instance.ctx.lineTo(instance.width, instance.height);

                for (i = 0; i < 20; i += 1) {
                    var height = i % 2 === 0 ? 0 : 50;
                    instance.ctx.lineTo(instance.width - ((instance.width / 20) * i), instance.height + height);
                }

                instance.ctx.lineTo(0, instance.height);
                instance.ctx.lineTo(0, 0);

				instance.ctx.closePath();
				
				instance.ctx.restore();
				//////
					
				instance.ctx.clip();
				
				instance.ctx.fillStyle = instance.color;
				instance.ctx.fillRect(0, 0, instance.width, instance.height);
				
				instance.ctx.restore();
			}	
		};
		
		this.destroy = function () {
			delta = null;
			
			instance.mask = null;
			instance.tween = null;
			instance.tween2 = null;
			instance.alive = null;
			
			instance.init = null;
			instance.render = null;
		};
	}
	
	return BgCover;
	
});
