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
				view.$el.append(this.iframe);
				this.iframe.attr('src', view.$el.data('src'));

				AppEvent.trigger('stopanimation');
				
				this.animIn();
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
			
		},
		
		animOut: function () {
			
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

