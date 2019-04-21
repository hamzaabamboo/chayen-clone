import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SocketModule } from './socket.module';
import { RemoteModule } from './remote/remote.module';
import { HomeService } from './home/home.service';
import { GameService } from './game.service';
import { SensorService } from './sensor.service';
import { WINDOW_PROVIDERS } from './window.service';
import { APIInterceptor } from './utils/api.interceptor';
import { WordsService } from './remote/words.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketModule,
    HttpClientModule,
    HomeModule,
    RemoteModule
  ],
  providers: [
    HomeService,
    WINDOW_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    GameService,
    SensorService
    // WordsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
