var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
app.use("/", express.static(path.join(__dirname, 'build')));

// 创建服务端
http.createServer(app).listen('9000', function() {
	console.log('Server Started');
});