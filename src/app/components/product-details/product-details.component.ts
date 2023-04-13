import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';

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
    private _productService: ProductService
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

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this._productService.getProductById(params.get('id')).subscribe((res) => {
        this.product = res;
      });
    });
  }
}
