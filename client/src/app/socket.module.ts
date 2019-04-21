import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgModule } from '@angular/core';

const config: SocketIoConfig = {
  url: '',
  options: {
    reconnect: true,
    transport: 'polling'
  }
};

@NgModule({
  imports: [SocketIoModule.forRoot(config)],
  exports: [SocketIoModule]
})
export class SocketModule {}
