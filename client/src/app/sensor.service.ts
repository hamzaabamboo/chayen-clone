import { Injectable, Inject } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { WINDOW } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  gyro$: Observable<Orientation>;
  motion$: Observable<Motion>;

  constructor(@Inject(WINDOW) public window: Window) {
    this.motion$ = fromEvent<DeviceMotionEvent>(window, 'devicemotion').pipe(
      map<DeviceMotionEvent, Orientation>(e => {
        return e.rotationRate;
      })
    );
    this.gyro$ = fromEvent<DeviceOrientationEvent>(
      window,
      'deviceorientation'
    ).pipe(
      map<DeviceOrientationEvent, Orientation>(({ alpha, beta, gamma }) => ({
        alpha,
        beta,
        gamma
      }))
    );
  }
}

export interface Orientation {
  alpha: number;
  beta: number;
  gamma: number;
}

export interface Motion {
  alpha: number;
  beta: number;
  gamma: number;
}
