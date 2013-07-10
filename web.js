var
fs = require('fs'),
express = require('express'),
app = {
	buffer: null,
	port: process.env.PORT || 5000,
	express: express.createServer(express.logger()),
	onIndexRead: function (err, data) {
		if (err) {
			console.log("can't read index file!");
			console.log(err);
			return;
		}
		this.buffer = data.toString();
		this.startServer();
	},
	onGetRoot: function(request, response) {
	  response.send(this.buffer);
	},
	startServer: function () {
		this.express.get('/', this.onGetRoot.bind(this));
		this.express.listen(this.port, console.log.bind(console, "Listening on " + this.port));
	}
};

fs.readFile('index.html', app.onIndexRead.bind(app));

