var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer((req, res) => {
    var q = url.parse(req.url, true);
    var filename =
      q.pathname === "/" ? "index.html" : "." + q.pathname + ".html";
    console.log(q.pathname);

    fs.readFile(filename, (err, data) => {
      if (err) {
        console.error(err);
        fs.readFile("404.html", (err404, data404) => {
          //   if (err404) {
          //     res.writeHead(404, { "Content-Type": "text/plain" });
          //     return res.write("404 not found");
          //   }
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(data404);
          return res.end();
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  })
  .listen(8080);
