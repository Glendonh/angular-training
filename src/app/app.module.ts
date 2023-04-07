import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'zone.js/dist/zone';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ShopComponent,
    ProductDetailsComponent,
    RouterModule.forRoot(routes),
  ],
  declarations: [AppComponent, NavbarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
