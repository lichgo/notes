var app = app || {};

var noteRouter = Backbone.Router.extend({
	routes: {
	},

	handler: function() {

	}
});

app.NoteRouter = new noteRouter();
Backbone.history.start();