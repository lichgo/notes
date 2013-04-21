var app = app || {};

$(function() {
	app.topApp = new app.AppView();

	var tag = document.createElement('script');
	tag.type = 'text/javascript';
	tag.src = 'https://www.youtube.com/iframe_api';
	var fst = $('script')[0];
	fst.parentNode.insertBefore(tag, fst);

	app.playVideo = function(videoId) {
		app.ytplayer = new YT.Player('ytplayer', {
			height: 512,
			width: 840,
			videoId: videoId,
			events: {
				onReady: function(e) {
					e.target.playVideo();
					app.playVideo = function(videoId) {
						this.ytplayer.loadVideoById(videoId);
					};
				}
			}
		});
	};

	app.getPlayerCurrentTime = function() {
		if (!this.ytplayer) return 0;
		return Math.ceil(this.ytplayer.getCurrentTime());
	}

});