define(function (require) {
	
	var Vars = require('pres/models/vars'),
		BgCover;
	
	require('tweenmax')
	
	BgCover = function () {
		var instance = this,
			slide;
		
		instance.init = function (ctx, color) {
			instance.ctx = ctx;
			instance.x = window.innerWidth / 2;
			instance.y = window.innerHeight / 2;
			instance.r = 0;
			
			slide = Vars.get('slides').at(Vars.get('currentSlide'));
			instance.color = slide.get('view').$el.data('color');

			instance.render();
		};
		
		this.render = function () {
			instance.ctx.fillStyle = instance.color;
			instance.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
		};
		
		this.destroy = function () {
			instance.init = null;
			
			instance.render = null;
		};
	}
	
	return BgCover;
	
});