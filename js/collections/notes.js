var app = app || {};

var NoteList = Backbone.Collection.extend({
	model: app.Note,

	localStorage: new Backbone.LocalStorage('ka_notes'),

	getNotesByVideo: function(videoId) {
		return this.filter(function(note) {
			return (note.get('video') == videoId);
		});
	},

	getNoteNumber: function() {
		return this.length;
	}
});

app.Notes = new NoteList();