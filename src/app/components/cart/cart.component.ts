import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { DetailedCart } from '../../services/cart.service';
import { selectCart } from '../../reducers';
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
  constructor(private store: Store) {}
  detailedCart: Observable<DetailedCart>;

  ngOnInit() {
    this.detailedCart = this.store.select(selectCart);
  }
}
