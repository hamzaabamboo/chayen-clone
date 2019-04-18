import { Socket } from 'socket.io';
import { Game } from '../../game';

let game: Game = null;

export const socketHandler = (socket: Socket) => {
  socket.emit('state', game && game.state);
  socket.emit('info', game && game.info);

  socket.on('hello', (name: string) => {
    console.log(`Hello ${name}`);
  });

  socket.on('start', (bank: string) => {
    game = new Game(bank);
    game.setWord();
    socket.emit('state', game.state);
    socket.emit('info', game.info);
  });

  socket.on('correct', () => {
    game.answer('Correct');
    socket.emit('state', game.state);
  });

  socket.on('skip', () => {
    game.answer('Skip');
    socket.emit('state', game.state);
  });

  socket.on('end', () => {
    const score = game.end();
    socket.emit('score', score);
    socket.emit('state', null);
    socket.emit('info', null);
    game = null;
  });
};
