const express = require('express');

class Server {
  constructor() {
    const port = process.env.PORT || 3001;
    const app = express();
    const http = require('http');
    const server = http.createServer(app);
    const SocketIo = require("socket.io");
    const io = new SocketIo.Server(server, {
      cors: {
        origin: "github.dev",
      },
    });

    app.use(express.static(__dirname + '/build'));

    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/build/index.html');
    });

    app.use((req, res) => {
      res.sendFile(__dirname + '/build/index.html');
    });

    io.on('connection', (socket) => {
      console.log('a user connected');
    });

    this.app = app;
    this.server = server;
    this.io = io;
    this.port = port;
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`)
    });

    return this.io;
  }
}

module.exports = Server;