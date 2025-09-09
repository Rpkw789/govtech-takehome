const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // "/time" endpoint
  if (req.url === "/time") {
    const time = new Date();
    const msg = {
      serverTime: time.toISOString(),
    }
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(msg));
  }

  // "/" endpoint
  else {
    res.statusCode = 200;
    const msg = 'Hello Node!\n'
    res.end(msg);
  }

});


server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

module.exports = server;
