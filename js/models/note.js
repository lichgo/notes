var app = app || {};

app.Note = Backbone.Model.extend({
	defaults: {
		video: 'All',
		time: 0,
		content: ''
	}
});