import { Component, OnInit } from '@angular/core';
import { GameService, GameState, GameInfo } from '../game.service';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.scss']
})
export class RemoteComponent implements OnInit {
  state: Observable<GameState>;
  info: GameInfo;

  constructor(private gameService: GameService, private socket: Socket) {
    this.state = this.gameService.state;
  }

  async startGame() {
    this.gameService.startGame('');
    this.info = await this.gameService.getInfo();
  }

  correct() {
    this.gameService.answer('Correct');
  }

  skip() {
    this.gameService.answer('Skip');
  }

  async ngOnInit() {
    this.info = await this.gameService.getInfo();
    console.log(this.info);
    this.state.subscribe(state => {
      if (this.info && state && state.count >= this.info.count) {
        this.gameService.end().then(console.log);
        this.info = null;
      }
    });
  }
}
