/*global define*/
define(function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('pres/models/vars'),
		UserEvent = require('pres/events/user-event'),
		AppEvent = require('pres/events/app-event'),
		SlideView = require('pres/views/slide-view'),
		VideoView;
		
	VideoView = SlideView.extend({
		
		resolve: function () {
			var slides = Vars.get('slides'),
				currentSlide = Vars.get('currentSlide'),
				view = slides.get(currentSlide).get('view');
			
			if (view == this) {	
				this.active = true;

				this.container = document.createElement('div');
				this.container.id = "youtube-" + view.$el.attr('id');
				view.$el.append(this.container);
				
				this.t = view.$el.data('start') || 0;
				
				this.player = new YT.Player(this.container.id, {
					height: '315',
					width: '100%',
					videoId: view.$el.data('video'),
					playerVars: {
						autohide: 1,
						modestbranding: 1,
						autoplay: 1,
						start: this.t
					}
				});
				
				AppEvent.trigger('stopanimation');
			}
		},
		
		desolve: function () {
			if (this.active) {
				this.active = false;
			
				try{
					this.player.stopVideo();
				} catch (e) {};
				
				this.player.destroy();
				this.container.remove();
			
				AppEvent.trigger('startanimation');
			}
		}
		
	});
	
	return VideoView;
});

