import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Component({
  standalone: true,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [CommonModule, ProductCardComponent],
})
export class ShopComponent implements OnInit {
  constructor(private _productService: ProductService) {}
  products: Product[] = [];

  ngOnInit() {
    console.log('init');
    this._productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }
}
