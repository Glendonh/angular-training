import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../services/product.service';
import { selectProducts } from '../../reducers';

@Component({
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [CommonModule, ProductCardComponent],
})
export class ShopComponent implements OnInit {
  constructor(private _store: Store) {}
  products: Observable<Product[]>;

  ngOnInit() {
    this.products = this._store.select(selectProducts)
  }
}
