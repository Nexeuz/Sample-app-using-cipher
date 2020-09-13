import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ShiftValueService {
  private shiftSource = new BehaviorSubject<number>(null);
  currentShiftValue = this.shiftSource.asObservable() as Observable<number>;
  constructor() {}

  changeShiftValue(shift: number) {
    this.shiftSource.next(shift);
  }
}
