const http = require('http');
const WebSocket = require('ws');
const url = require('url');

const httpServer = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);

  if (reqUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Application is running\n');
  } else if (reqUrl.pathname === '/websocket') {
    const wsClient = new WebSocket('ws://devopstestsocket.insurancedekho.com');

    wsClient.on('open', () => {
      console.log('WebSocket connection established with devopstestsocket.insurancedekho.com');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('WebSocket connection established\n');
    });

    wsClient.on('message', (data) => {
      console.log('Received WebSocket message:', data);
    });

    wsClient.on('close', (code, reason) => {
      console.log(`WebSocket connection closed with code ${code}: ${reason}`);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

httpServer.listen(8081, () => {
  console.log('HTTP server is listening on port 8081');
});
