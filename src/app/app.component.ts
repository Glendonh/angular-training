import 'zone.js/dist/zone';
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <app-navbar [name]="name"></app-navbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  name = 'Extra Fake Store';
}
