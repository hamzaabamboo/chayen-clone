import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  banks$ = this.socket.fromEvent<string[]>('banks');

  constructor(private socket: Socket, private http: HttpClient) {}

  getWordBanks() {
    // return this.http.get<string[]>('/words/banks').toPromise();
    this.socket.emit('banks');
  }
}
