import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = {
  url: `/`,
  options: {}
};

@NgModule({
  imports: [SocketIoModule.forRoot(config)],
  exports: [SocketIoModule]
})
export class SocketModule {}
