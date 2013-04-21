var app = app || {};

app.VideoView = Backbone.View.extend({
	tagName: 'li',

	template: _.template( $('#video-template').html() ),

	events: {
		'click .video-title': 'showVideo',
		'click .btn-remove-video': 'removeVideo'
	},

	render: function() {
		console.log('Render a video.');
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},

	showVideo: function() {
		app.currentVideoId = this.model.get('youtube_id');
		app.topApp.$currentVideoTitle.html(this.model.get('translated_title'));
		app.playVideo(app.currentVideoId);
		//show notes
		app.topApp.$noteListContainer.html('');
		app.Notes.each(function(note) {
			if (note.get('video') == app.currentVideoId) {
				var noteView = new app.NoteView({ model: note });
				app.topApp.$noteListContainer.append(noteView.render().el);
			}
		});
	},

	removeVideo: function(e) {
		app.removedItemEl = this.$el;
		this.model.destroy();
	}
});