const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Користувач підключився');
  
    socket.on('join room', ({ nickname, room }) => {
      socket.join(room);
      socket.nickname = nickname;
      socket.room = room;
  
      socket.emit('chat message', `Ласкаво просимо, ${nickname}! Ви в кімнаті ${room}.`);
  
      socket.broadcast.to(room).emit('chat message', `${nickname} приєднався до кімнати.`);
    });
  
    socket.on('chat message', (msg) => {
      const messageWithNickname = `${socket.nickname}: ${msg}`;
      io.to(socket.room).emit('chat message', messageWithNickname);
    });

    socket.on('leave room', ({ nickname, room }) => {
      socket.leave(room);
      io.to(room).emit('chat message', `${nickname} покинув кімнату.`);
    });
  
    socket.on('disconnect', () => {
      if (socket.room && socket.nickname) {
        io.to(socket.room).emit('chat message', `${socket.nickname} вийшов з кімнати.`);
      }
      console.log('Користувач відключився');
    });
  });

server.listen(3000, () => {
  console.log('Сервер запущено на порту 3000');
});
