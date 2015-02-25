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
			instance.width = window.innerWidth;
			instance.height = window.innerHeight;
			instance.mask = {};
			instance.mask.x = instance.width / 2;
			instance.mask.y = instance.height / 2;
			instance.mask.w = 0;
			instance.mask.h = 0;
			
			instance.lineWidth = 100;
			instance.x = -instance.lineWidth;
			
			slide = Vars.get('slides').at(Vars.get('currentSlide'));
			instance.color = slide.get('view').$el.data('color');
			
			instance.tween = TweenMax.to(instance.mask, 0.6, {
				w: instance.width * 1.4, 
				h: instance.width * 1.4, 
				ease: Sine.easeOut,
			});
			
			instance.tween2 = TweenMax.to(instance, 5, {
				x: -instance.lineWidth * 3,
				ease: Linear.easeNone,
				onUpdate: instance.render,
				repeat: -1
			});
			
		};
		
		instance.render = function () {
			if (instance.alive) {
								
				instance.ctx.save();
				
				////////
				instance.ctx.save();
			
				instance.ctx.translate(instance.mask.x, instance.mask.y);
				instance.ctx.rotate(45 * Math.PI / 180);	
				instance.ctx.translate(-instance.mask.w / 2, -instance.mask.h / 2);
				
				instance.ctx.beginPath();				
				instance.ctx.rect(0, 0, instance.mask.w, instance.mask.h);
				instance.ctx.closePath();
				
				instance.ctx.restore();
				//////
					
				instance.ctx.clip();
				
				instance.ctx.fillStyle = instance.color;
				instance.ctx.fillRect(0, 0, instance.width, instance.height);
				
				instance.drawStripes();
				
				instance.ctx.restore();
			}	
		};
		
		function ColorLuminance(hex, lum) {

			// validate hex string
			hex = String(hex).replace(/[^0-9a-f]/gi, '');
			if (hex.length < 6) {
				hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
			}
			lum = lum || 0;

			// convert to decimal and change luminosity
			var rgb = "#", c, i;
			for (i = 0; i < 3; i++) {
				c = parseInt(hex.substr(i*2,2), 16);
				c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
				rgb += ("00"+c).substr(c.length);
			}

			return rgb;
		}
		
		instance.drawStripes = function () {
			var i,
				_x = 0,
				lineWidth = instance.lineWidth,
				count = Math.round(instance.width / lineWidth) + 2;			
			
			instance.ctx.save();
			
			instance.ctx.translate(instance.x, 0);
			
			instance.ctx.fillStyle = "none";
			instance.ctx.strokeStyle = ColorLuminance(instance.color, -0.05);
			instance.ctx.lineWidth = lineWidth;
			
			for (i = 0; i < count; i += 1) {
				instance.ctx.beginPath();
				instance.ctx.moveTo(_x, -lineWidth);
				instance.ctx.lineTo(_x + lineWidth * 3, instance.height + lineWidth);
				instance.ctx.closePath();
				instance.ctx.stroke();
				_x += lineWidth * 2;
			}
			
			instance.ctx.restore();
		}
		
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