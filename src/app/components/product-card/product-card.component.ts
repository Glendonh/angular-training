import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../services/product.service';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [CurrencyPipe],
})
export class ProductCardComponent {
  @Input() product: Product;
  constructor(private _router: Router) {}
  onSelect(id: number) {
    this._router.navigate(['product/', this.product.id]);
  }
}
