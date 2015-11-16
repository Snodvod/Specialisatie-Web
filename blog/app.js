var ejs = require('ejs')
  , fs = require('fs')
  , http = require('http');

var filename = './template/students.ejs';

var students = [
  {name: 'Ino Van Winckel',  age: 21},
  {name: 'Levi Van Winckel', age: 16},
  {name: 'Frank Peeters', age: 37}
];

var server = createServer(function (req, res) {
  if (req.url == '/') {
    fs.readFile(filename, function (err, data) {
      var template = data.toString();
      var context = {students: students, cache: cache, filename: filename};
      var cache = process.env.NODE_ENV === 'production';
      var output = ejs.render(template, context);
      res.setHeader('Content-type', 'text/html');
      res.end(output);
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(8000);