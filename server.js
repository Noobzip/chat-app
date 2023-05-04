const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const morgan = require('morgan');

app.use(morgan('dev'));

io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  socket.on('message', (message) => {
    console.log('Mensagem recebida:', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

http.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});