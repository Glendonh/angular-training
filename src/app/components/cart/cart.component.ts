import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Cart, DetailedCart } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CartDetailsComponent } from '../cart-details/cart-details.component';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, CartDetailsComponent],
})
export class CartComponent implements OnInit {
  constructor(private _cartService: CartService) {}
  detailedCart: Observable<DetailedCart>;

  ngOnInit() {
    this.detailedCart = this._cartService.getDetailedCartById(1);
  }
}
