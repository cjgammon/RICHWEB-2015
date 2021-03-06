/*global define $*/
define(function (require) {

	var Backbone = require('backbone'),
		Vars = require('pres/models/vars'),
		AppEvent = require('pres/events/app-event'),
		SlideView = require('pres/views/slide-view'),
		IframeView;

	require('tweenmax');

	IframeView = SlideView.extend({

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
						this.iframe.attr('style', 'width: ' + window.innerWidth / z + 'px; height: ' + window.innerHeight / z + 'px; transform: scale(' + z + ')');
				}

				this.iframe.attr('src', view.$el.data('src'));
				this.iframe.load(function () {
					this.iframe.css('opacity', '1');
				}.bind(this));

				$('.iframe-clickarea').remove();
				this.clickarea = $('<div>');
				this.clickarea.addClass('iframe-clickarea');
				this.clickarea.bind('click', this.handle_clickarea_CLICK.bind(this));
				this.$el.append(this.clickarea);

				AppEvent.trigger('stopanimation');
			}
		},

		handle_clickarea_CLICK: function (e) {
			e.stopPropagation();

			this.clickarea.addClass('focus');
			this.iframe.addClass('focus');
			this.iframe.focus();

			this.$el.bind('click', this.handle_el_CLICK.bind(this));
		},

		handle_el_CLICK: function (e) {
			e.stopPropagation();

			this.clickarea.removeClass('focus');
			this.iframe.removeClass('focus');

			this.$el.unbind('click', this.handle_el_CLICK.bind(this));
		},

		desolve: function () {
			if (this.active) {
				this.active = false;
				this.clickarea.removeClass('focus');
				this.clickarea.remove();

				this.iframe.removeClass('focus');

				this.$el.unbind('click', this.handle_el_CLICK.bind(this));
				this.clickarea.remove();

				this.iframe.remove();
			}
		}

	});

	return IframeView;
});
