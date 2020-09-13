import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { ShiftValueService } from '../shiftvalue.service';
import {CipherService} from '../cipher.service';

@Component({
  selector: 'ciphertext',
  templateUrl: './ciphertext.component.html'
})
export class CiphertextComponent implements OnInit, OnChanges {

  ciphertext: string;
  @Input() cipherDisplayText = '';
  @Output() textDisplayText: EventEmitter<string> = new EventEmitter<string>();
  plainDisplayText = '';
  _shift: number;
  constructor(public service: ShiftValueService,
              private CipherService: CipherService) {
  }


  getShift() {
    this.service.currentShiftValue
      .subscribe(it => {
        this._shift = it;
      });
  }


  convertToPlaintext(newCiphertext) {
    let result = '';
    this._shift = (26 - Number(this._shift)) % 26;
    result = this.convertToCipher(this.ciphertext);
    this.plainDisplayText = result;
     return result;
  }

  ngOnInit() {
    this.getShift();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cipherDisplayText.currentValue) {
     this.ciphertext =  this.convertToCipher(changes.cipherDisplayText.currentValue);
    }
  }

  convertToCipher(newPlaintext) {
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
    return  result;
  }

  change($event: string) {
    this.textDisplayText.emit($event);
  }
}
