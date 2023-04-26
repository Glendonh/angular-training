import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'zone.js/dist/zone';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGateService } from './services/auth-gate.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './effects/products.effects';

const routes: Routes = [
  { path: 'shop', component: ShopComponent, canActivate: [AuthGateService] },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGateService],
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGateService] },
  { path: 'login', component: SignInComponent },
  {
    path: '',
    redirectTo: '/shop',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ShopComponent,
    CartComponent,
    SignInComponent,
    ProductDetailsComponent,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([ProductsEffects]),
  ],
  providers: [AuthService, AuthGateService],
  declarations: [AppComponent, NavbarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
