import { Socket, Server } from 'socket.io';
import { Game } from '../../game';
import { words } from '../../game/words';

let game: Game = null;

export const socketHandler = (io: Server) => (socket: Socket) => {
  socket.emit('state', game && game.state);
  socket.emit('info', game && game.info);

  socket.on('hello', (name: string) => {
    console.log(`Hello ${name}`);
  });

  socket.on('start', (bank: string) => {
    console.log('start na');
    game = new Game(bank);
    game.setWord();
    io.sockets.emit('state', game.state);
    io.sockets.emit('info', game.info);
  });

  socket.on('correct', () => {
    if (!game) return;
    game.answer('Correct');
    io.sockets.emit('state', game.state);
  });

  socket.on('skip', () => {
    if (!game) return;
    game.answer('Skip');
    io.sockets.emit('state', game.state);
  });

  socket.on('banks', () => {
    console.log('Bank !');
    socket.emit('banks', Object.keys(words));
  });

  socket.on('end', () => {
    if (!game) return;
    const score = game.end();
    io.sockets.emit('score', score);
    io.sockets.emit('state', null);
    io.sockets.emit('info', null);
    game = null;
  });
};
