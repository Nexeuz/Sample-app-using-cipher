import { Component } from '@angular/core';

@Component({
  selector: 'cipher-app',
  template: `
            <shift></shift>
            <div class="inputArea">
              <plaintext [plainDisplayText]="textDisplayText"
                         (plainCiphertext)=" plainCiphertext = $event">
              </plaintext>
              <ciphertext [cipherDisplayText]="plainCiphertext"
                          (textDisplayText)="textDisplayText = $event">
              </ciphertext>
            </div>
            `
})
export class AppComponent {
  plainCiphertext: string;
  textDisplayText: string;
}
