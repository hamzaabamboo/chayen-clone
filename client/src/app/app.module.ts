import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SocketModule } from './socket.module';
import { RemoteModule } from './remote/remote.module';
import { HomeService } from './home/home.service';
import { GameService } from './game.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SocketModule,
    RemoteModule
  ],
  providers: [GameService, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
