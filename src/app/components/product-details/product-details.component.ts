import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProductService, Product } from '../../services/product.service';
import { CartActions } from 'src/app/actions/cart.actions';

@Component({
  standalone: true,
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [CurrencyPipe, CommonModule],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _productService: ProductService,
    private _store: Store
  ) {}
  product: Product;
  qty: number = 1;
  increaseQty() {
    this.qty++;
  }
  decreaseQty() {
    if (this.qty > 1) {
      this.qty--;
    }
  }
  addToCart() {
    this._store.dispatch(CartActions.addToCart({
      productId: this.product.id,
      quantity: this.qty
    }));
    this.qty = 1;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this._productService.getProductById(params.get('id')).subscribe((res) => {
        this.product = res;
      });
    });
  }
}
