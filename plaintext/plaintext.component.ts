import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { ShiftValueService } from '../shiftvalue.service';
@Component({
  selector: 'plaintext',
  templateUrl: './plaintext.component.html'
})
export class PlaintextComponent implements OnInit, OnChanges {

  plaintext: string;
  cipherDisplayText = '';
  private _shift: number;
  @Input() plainDisplayText: string;
  @Output() plainCiphertext: EventEmitter<string> = new EventEmitter<string>();
  constructor(public service: ShiftValueService) {
  }

  ngOnInit(): void {
    this.getShift();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.plainDisplayText.currentValue) {
      this.plaintext =  this.convertToText(changes.plainDisplayText.currentValue);
    }
  }


  getShift() {
    this.service.currentShiftValue
      .subscribe(it => {
      this._shift = it;
    });
  }

  convertToText(it) {
    let result = '';
    this._shift = (26 - Number(this._shift)) % 26;
    result = this.convertToCiphertext(it);
    return result;
  }

  convertToCiphertext(newPlaintext) {
    let result = '';
    // loop through each caharacter in the text
    for (let i = 0; i < newPlaintext.length; i++) {

      // get the character code of each letter
      const c = newPlaintext.charCodeAt(i);

      // handle uppercase letters
      if (c >= 65 && c <=  90) {
        result += String.fromCharCode((c - 65 + Number(this._shift)) % 26 + 65);

        // handle lowercase letters
      }else if (c >= 97 && c <= 122) {
        result += String.fromCharCode((c - 97 + Number(this._shift)) % 26 + 97);

        // its not a letter, let it through
      }else {
        result += newPlaintext.charAt(i);
      }
    }
    this.cipherDisplayText = result;
    return  result;
  }

  change($event: string) {
    this.plainCiphertext.emit($event);
  }
}
