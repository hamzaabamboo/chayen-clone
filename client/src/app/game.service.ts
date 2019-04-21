import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  state$ = this.socket.fromEvent<GameState>('state');
  info$ = this.socket.fromEvent<GameInfo>('info');

  constructor(private socket: Socket) {}

  startGame(bank: string) {
    this.socket.emit('start', bank);
  }

  answer(answer: Answer) {
    if (answer === 'Correct') {
      this.socket.emit('correct');
    } else if (answer === 'Skip') {
      this.socket.emit('skip');
    }
  }

  getInfo(): Promise<GameInfo> {
    return this.socket.fromOneTimeEvent<GameInfo>('info');
  }
  async end(): Promise<GameScore> {
    this.socket.emit('end');
    const score = await this.socket.fromOneTimeEvent<GameScore>('score');
    return score;
  }
}

export type Answer = 'Correct' | 'Wrong' | 'Skip';

export interface GameState {
  currentWord: string;
  score: number;
  count: number;
}

export interface GameScore {
  score: number;
  count: number;
}

export interface GameInfo {
  count: number;
  bank: string;
}
