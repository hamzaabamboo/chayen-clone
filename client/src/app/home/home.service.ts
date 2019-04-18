import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: HomeService
})
export class HomeService {
  constructor(private socket: Socket) {}

  sayHi() {
    this.socket.emit('hello', 'Ham');
    console.log('hi');
  }
}
