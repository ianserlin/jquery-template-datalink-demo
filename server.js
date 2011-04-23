var http = require('http');
var fs = require('fs');

// JS cache
var demo_js = "demo.js";
var cached_demo;
var cached_jquery;
var cached_tmpl;
var cached_datalink;

// HTML cache
var html_template = "index.html";
var cached_html = "";

// simplify loading a file into a cached variable
function readFile( filename, cache ){

}

// auto reload the html template
fs.watchFile(html_template, function (current, previous) {
	fs.readFile(html_template, function (error, data) {
	  if (error) throw error;
		cached_html = data;
	});
});

// auto reload the demo js file
fs.watchFile(demo_js, function (current, previous) {
	fs.readFile(demo_js, function (error, data) {
	  if (error) throw error;
		cached_demo = data;
	});
});

// cache files to be served
fs.readFile('jquery-1.5.2.js', function (error, data) {
  if (error) throw error;
	cached_jquery = data;
});
fs.readFile('jquery.tmpl.js', function (error, data) {
  if (error) throw error;
	cached_tmpl = data;
});
fs.readFile('jquery.datalink.js', function (error, data) {
  if (error) throw error;
	cached_datalink = data;
});
fs.readFile(demo_js, function (error, data) {
  if (error) throw error;
	cached_demo = data;
});
fs.readFile(html_template, function (error, data) {
  if (error) throw error;
	cached_html = data;
});

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	var responseBody = "";
	// hacktabulous router
	switch( request.url ){
		case '/':
			responseBody = cached_html;
			break;
		case '/jquery-1.5.2.js':
			responseBody = cached_jquery;
			break;
		case '/jquery.tmpl.js':
			responseBody = cached_tmpl;
			break;
		case '/jquery.datalink.js':
			responseBody = cached_datalink;
			break;
		case '/demo.js':
			responseBody = cached_demo;
			break;
	}
	response.write( responseBody );
	response.end();
}).listen(1337, "127.0.0.1");

console.log("Server running at http://127.0.0.1:1337/ #thatsabingo!");