/*global define $ requestAnimationFrame*/

define(function (require) {
	
	var App,
		jsondata = require('text!graphics.json'),
		Component = require('app/component');
		
	require('tweenmax');

    App = function () {
		var json,
			comp;
			
		fps = fps || 60;
		TweenMax.ticker.fps(fps);
	
		json = JSON.parse(jsondata);
    	window.comp = new Component(json, '#mysvg');
    };

	return new App();
});
