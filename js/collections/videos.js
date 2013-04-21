var app = app || {};

var VideoList = Backbone.Collection.extend({
	model: app.Video,

	localStorage: new Backbone.LocalStorage('ka-videos')
});

app.Videos = new VideoList();