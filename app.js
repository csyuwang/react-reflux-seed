var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.use("/", express.static(path.join(__dirname, 'build')));

// 创建服务端
http.createServer(app).listen(port, function() {
	console.log('Server Started');
});