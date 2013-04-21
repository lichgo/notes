var app = app || {};

app.NoteView = Backbone.View.extend({
	tagName: 'li',

	template: _.template( $('#note-template').html() ),

	events: {
		'dblclick .editable': 'edit',
		'click .save': 'saveAndClose',
		'click .remove': 'remove'
	},

	initialize: function() {
		console.log('Init a note.');

		//With this, when finish 'edit', the view can be updated too.
		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		console.log('Rendering a note.');
		this.$el.html( this.template( this.model.toJSON() ) );
		this.$inputTime = this.$('input.time');
		this.$textareaContent = this.$('textarea.content');
		return this;
	},

	edit: function() {
		console.log('editting');
		this.$el.addClass('editing');
	},

	saveAndClose: function() {
		var valTime = this.$inputTime.val(),
			valContent = this.$textareaContent.val();

		if(valTime && valContent) {
			this.model.save({
				'time': valTime,
				'content': valContent
			});
		}

		this.$el.removeClass('editing');
	},

	remove: function() {
		app.removedItemEl = this.$el;
		this.model.destroy();
	}
});