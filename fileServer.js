if (typeof require !== 'undefined') XLSX = require('xlsx');
var http = require('http'),
    path = require('path'),
    url = require('url');

var server = http.createServer(function (request, response) {
    var urlStr = url.parse(request.url, true, false);
    var query = urlStr.query;
    var filePath = query.filepath;
    var callback = query.callback;
    
    if (filePath) {
        console.log('FILE PATH: ' + filePath);
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(200);
        var workbook = XLSX.readFile(filePath);
        response.end(callback + '(' + JSON.stringify(workbook) + ')');
    } else {
        response.writeHead(404);
        response.end('File not found');
    }
}).listen(9090, "0.0.0.0", function () {
    console.log('Server started at: http://0.0.0.0:9090');
});