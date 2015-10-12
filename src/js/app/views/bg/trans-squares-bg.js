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
            instance.colors = [];
            instance.squares = [];
            instance.squareSize = 100;
			
			slide = Vars.get('slides').at(Vars.get('currentSlide'));
			instance.color = slide.get('view').$el.data('color');
			
            instance.tl = new TimelineMax({onUpdate: instance.render});

            var _x = -instance.squareSize / 2,
                _y = -instance.squareSize / 2,
                k = 0;

            //populate colors
            for (i = 0; i < 10; i += 1) {
			    instance.colors.push(ColorLuminance(instance.color, -i * 0.05));
            }

            //populate squares
            for (i = 0; i < (instance.width / instance.squareSize) + 1; i += 1) {
                for (j = 0; j < (instance.height / instance.squareSize) + 1; j += 1) {
                    
                    instance.squares.push({x: _x, y: _y, s: 0});
                    instance.tl.add(new TweenMax.to(instance.squares[k], 0.4, {s: 1, ease: Quad.easeOut}), k * 0.01);

                    k += 1;
                    _x += instance.squareSize;
                    if (_x > instance.width) {
                        _x = 0;
                        _y += instance.squareSize;
                    }
                }
            }
		};

		instance.render = function () {
			if (instance.alive) {
				instance.drawSquares();
			}	
		};
		
        instance.drawSquares = function () {
            for (i = 0; i < instance.squares.length; i += 1) {
                instance.ctx.save();

                instance.ctx.translate(instance.squares[i].x, instance.squares[i].y);
                instance.ctx.translate(instance.squareSize / 2, instance.squareSize / 2);
                instance.ctx.scale(instance.squares[i].s, instance.squares[i].s);
                instance.ctx.translate(-instance.squareSize / 2, -instance.squareSize / 2);

                instance.ctx.fillStyle = instance.color;
                instance.ctx.fillRect(0, 0, instance.squareSize, instance.squareSize);
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


        function randomColor() {
            return instance.colors[Math.floor(Math.random() * instance.colors.length)];
        }

		this.destroy = function () {
			delta = null;
			
			instance.tl = null;
			instance.alive = null;
			
			instance.init = null;
			instance.render = null;
		};
	};
	
	return BgCover;
	
});
