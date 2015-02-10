/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var App,
		Backbone = require('backbone'), 
		BgView = require('app/views/bg-view'),
		NotesView = require('pres/views/notes-view'),
		SlideBasicView = require('app/views/slide-basic-view'),
		SequenceView = require('app/views/sequence-view'),
		InOutView = require('app/views/inout-view'),
		VideoView = require('app/views/video-view'),
		YoutubeView = require('app/views/youtube-view'),
		IframeView = require('app/views/iframe-view'),
		IframeFullView = require('app/views/iframe-full-view'),
		MyView = require('app/views/my-view'),
		GSAPCodeView = require('app/views/gsap-code-view'),
        AppBase = require('pres/views/app-base');

    App = AppBase.extend({
		BASE_VIEW: SlideBasicView,
		
		SLIDEVIEW_LIST: [
			{cl: 'iframe-full', view: IframeFullView},
			{cl: 'iframe', view: IframeView},
			{cl: 'video', view: VideoView},
			{cl: 'youtube', view: YoutubeView},
			{cl: 'in-out', view: InOutView},
			{cl: 'sequence', view: SequenceView},
			{id: 'me', view: MyView},
			{id: 'gsap-code', view: GSAPCodeView}
		],
	
        initialize: function () {
            if (this.passTest() !== true) {
				return;
			}

            AppBase.prototype.initialize.call(this);

            this.notesView = new NotesView();

			this.bg = new BgView();
			this.render();
        },

		passTest: function () {	
			if (Modernizr.flexbox !== true) {
				return false;
			} else if (Modernizr.touch === true) {
				$('video').each(function () {
					$(this).attr({
						'src': $(this).data('src')
					});
				});
				return false;
			} else {
				return true;
			}
        },

        render: function () {
            AppBase.prototype.render.call(this);

	        if (this.bg) {
			    this.bg.render();
            }
        }
    });

	return new App();
});
