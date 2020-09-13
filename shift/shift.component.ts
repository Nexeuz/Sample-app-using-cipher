import { Component } from '@angular/core';
import { ShiftValueService } from '../shiftvalue.service';

@Component({
  selector: 'shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent {

  public shift;
  constructor(public service: ShiftValueService) { }

  onChange(newShift) {
    this.service.changeShiftValue(Number(newShift));
  }
}
