var
fs = require('fs'),
express = require('express'),
app = {
	indexHtml: "Loading ...",
	port: process.env.PORT || 5000,
	express: express.createServer(express.logger()),
	onIndexRead: function (err, data) {
		if (err) {
			console.log("can't read index file!");
			console.log(err);
			this.indexHtml = err.toString();
			return;
		}
		console.log("index file OK!");
		this.indexHtml = data.toString();
	},
	readIndex: function () {
		this.indexHtml = "<h1>Page not yet loaded! comme back later</h1>";
		fs.readFile('index.html', this.onIndexRead.bind(this));
	},
	onGetRoot: function(request, response) {
	  response.send(this.indexHtml);
	},
	start: function () {
		// read index.html
		this.readIndex();

		// recall readIndex if file change
		fs.watchFile('index.html', this.readIndex.bind(this));

		// start http server
		this.express.get('/', this.onGetRoot.bind(this));
		this.express.listen(this.port, console.log.bind(console, "Listening on " + this.port));
	}
};

app.start();
