var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#app',

	events: {
		'click #new-note-submit': 'addNewNote',
		'focus #new-note-time': 'autoInsertTime',
		'click #new-video-submit': 'addNewVideoList'
	},

	initialize: function() {
		console.log('Init the app view.');
		this.$noteListContainer = $('#note-list');
		this.$videoListContainer = $('#video-list');
		this.$fieldNewTime = this.$('#new-note-time');
		this.$fieldNewContent = this.$('#new-note-content');
		this.$fieldNewKeyword = this.$('#new-video-list');
		this.$currentVideoTitle = this.$('#current-video-title');

		//Without this, results cannot be displayed
		this.listenTo(app.Notes, 'add', this.addOneNote);
		this.listenTo(app.Notes, 'destroy', this.removeOne);
		this.listenTo(app.Videos, 'add', this.addOneVideo);
		this.listenTo(app.Videos, 'destroy', this.removeOne);

		//fetch(): The collection will add all notes (then fire 'add' event)
		//fetch: get data from storage. without it, collection is empty.
		app.Notes.fetch();
		app.Videos.fetch();
	},

	render: function() {
		console.log('Rendering the app view.');
	},

	addNewNote: function() {
		var newTime = this.$fieldNewTime.val().trim(),
			newContent = this.$fieldNewContent.val().trim();

		if (!newTime || !newContent) return false;

		//Collection create(): 1.save a note; 2.add to the collection
		//So it also trigger the 'add' event of the collection
		app.Notes.create({
			'video': app.currentVideoId,
			'time': newTime,
			'content': newContent
		});

		this.$fieldNewTime.val('');
		this.$fieldNewContent.val('');
	},

	addNewVideoList: function() {
		var keyword = this.$fieldNewKeyword.val().trim();
		if (!keyword) return false;

		$.getJSON('http://www.khanacademy.org/api/v1/playlists/' + escape(keyword) + '/videos', function() {
			console.log('Fetching API data from KA...');
		}).done(function(data) {
			console.log('Saving a list of videos.');
			$.each(data, function(i, item) {
				app.Videos.create(item);
			})
		}).fail(function() {
			console.log('Error and failed. Try again...');
		});
	},

	addOneNote: function(note) {
		if (!app.currentVideoId) return;
		//When 'add' event of collection is triggered, add the view instance into the container
		var note = new app.NoteView({ model: note });
		this.$noteListContainer.append(note.render().el);
	},

	addOneVideo: function(video) {
		var video = new app.VideoView({ model: video });
		this.$videoListContainer.append(video.render().el);
	},

	removeOne: function() {
		app.removedItemEl.remove();
	},

	autoInsertTime: function() {
		this.$fieldNewTime.val(app.getPlayerCurrentTime());
	}
});