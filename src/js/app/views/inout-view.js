/*global define*/
define(function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('pres/models/vars'),
		AppEvent = require('pres/events/app-event'),
		SlideView = require('pres/views/slide-view'),
		InOutView;
		
	InOutView = SlideView.extend({
		
		resolve: function () {
			var slides = Vars.get('slides'),
				currentSlide = Vars.get('currentSlide'),
				view = slides.get(currentSlide).get('view');
			
			if (view == this) {	
				this.step = 0;
				this.active = true;
								
				this.iframe = $('<iframe>');
				this.iframe[0].allowTransparency = "true";
				view.$el.append(this.iframe);
				this.iframe.attr('src', view.$el.data('src'));
				this.iframe.load(this.animIn.bind(this));
				
				AppEvent.trigger('stopanimation');
				
			}
		},
		
		desolve: function () {
			if (this.active) {
				this.active = false;
				this.iframe.remove();
				AppEvent.trigger('startanimation');
			}
		},
		
		animIn: function () {
			this.iframe[0].contentWindow.animIn();            
		},
		
		animOut: function () {
			this.iframe[0].contentWindow.animOut(this.animOutComplete);            
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

