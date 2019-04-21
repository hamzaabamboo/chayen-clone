import { Component, OnInit } from '@angular/core';
import { SensorService, Motion, Orientation } from '../sensor.service';
import { Observable, Subscription } from 'rxjs';
import { GameService, GameState, GameInfo, GameScore } from '../game.service';

const COOLDOWN = 1000;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  motion$: Observable<Motion>;
  gyro$: Observable<Orientation>;
  gyro: Orientation;
  motion: Motion;
  prev: number;
  gameState: GameState;
  gameInfo: GameInfo;
  score: GameScore;
  gameState$: Observable<GameState>;
  localGameState?: LocalGameState;
  localState: PlayingState;
  isDown: boolean;
  gameSubscription: Subscription;
  count = 0;
  sum = 0;

  constructor(private sensor: SensorService, private game: GameService) {
    this.motion$ = this.sensor.motion$;
    this.gyro$ = this.sensor.gyro$;

    this.motion = { alpha: 0, beta: 0, gamma: 0 };
    this.gameState$ = this.game.state$;
    this.localState = 'Nothing';
  }

  start() {
    this.localState = 'Playing';
    this.gameSubscription = this.motion$.subscribe(o => {
      this.sum += o.gamma;
      if (this.count === 7) {
        const dx = this.sum / 7;
        if (this.localState === 'Playing') {
          if (dx * this.localGameState.orientation > 50) {
            this.game.answer('Correct');
            this.localState = 'Correct';
            if (this.gameState.count !== this.gameInfo.count - 1) {
              setTimeout(() => (this.localState = 'Playing'), COOLDOWN);
            }
          } else if (dx * this.localGameState.orientation < -50) {
            this.game.answer('Skip');
            this.localState = 'Skip';
            if (this.gameState.count !== this.gameInfo.count - 1) {
              setTimeout(() => (this.localState = 'Playing'), COOLDOWN);
            }
          }
        }
        this.count = 0;
        this.sum = 0;
      } else {
        this.count++;
      }
    });
  }

  async ngOnInit() {
    this.motion$.subscribe(m => {
      this.motion = m;
    });
    this.gyro$.subscribe(o => {
      this.gyro = o;
      this.localGameState = {
        orientation: Math.sign(this.gyro.gamma) > 0 ? -1 : 1
      };
    });
    this.gameState$.subscribe(async state => {
      this.gameState = state;
      if (this.gameInfo && state && state.count >= this.gameInfo.count) {
        this.score = await this.game.end();
        this.localState = 'Score';
        this.gameSubscription.unsubscribe();
      }
      if (this.localState === 'Nothing' && state) {
        this.localState = 'Waiting';
        this.gameInfo = await this.game.getInfo();
      } else if (!state) {
        setTimeout(() => (this.localState = 'Nothing'), COOLDOWN);
        this.clearGame();
      }
    });
    this.gameInfo = await this.game.getInfo();
  }

  clearGame() {
    this.gameState = null;
    this.gameInfo = null;
    this.localGameState = null;
    this.score = null;
  }
}

type PhoneOrientation = 1 | -1;
type PlayingState = 'Waiting' | 'Playing' | 'Nothing' | ResponseText | 'Score';
type ResponseText = 'Correct' | 'Skip';

interface LocalGameState {
  orientation?: PhoneOrientation;
}
