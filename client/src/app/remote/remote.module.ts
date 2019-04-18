import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteComponent } from './remote.component';
import { GameService } from '../game.service';

@NgModule({
  declarations: [RemoteComponent],
  imports: [CommonModule]
})
export class RemoteModule {}
