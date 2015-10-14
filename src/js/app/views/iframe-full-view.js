/*global define $*/
define(function (require) {

	var Backbone = require('backbone'),
		Vars = require('pres/models/vars'),
		AppEvent = require('pres/events/app-event'),
		SlideView = require('pres/views/slide-view'),
		IframeFullView;

	IframeFullView = SlideView.extend({

		resolve: function () {
			var slides = Vars.get('slides'),
				currentSlide = Vars.get('currentSlide'),
				view = slides.get(currentSlide).get('view'),
				z;

			if (view == this) {
				this.active = true;
				this.iframe = $('<iframe>');
				this.iframe.css('opacity', '0');
				view.$el.append(this.iframe);

				if (view.$el.data('zoom')) {
						z = view.$el.data('zoom');
						this.iframe.attr('width', window.innerWidth / z + 'px');
						this.iframe.attr('height', window.innerHeight / z + 'px');
						this.iframe.attr('style', 'width: ' + window.innerWidth / z + 'px; height: ' + window.innerHeight / z + 'px; transform: scale(' + z + '); transform-origin: top left;');
				}

				this.iframe.attr('src', view.$el.data('src'));
				this.iframe.load(function () {
					this.iframe.css('opacity', '1');
				}.bind(this));

				AppEvent.trigger('stopanimation');
			}
		},

		desolve: function () {
			if (this.active) {
				this.active = false;
				this.iframe.remove();
				AppEvent.trigger('startanimation');
			}
		}

	});

	return IframeFullView;
});
