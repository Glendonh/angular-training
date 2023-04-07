import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [CurrencyPipe],
})
export class ProductCardComponent {
  @Input() product;
  constructor(private _router: Router) {}
  onSelect(id: number) {
    console.log('Selected', id);
    this._router.navigate(['product/', this.product.id]);
  }
}
