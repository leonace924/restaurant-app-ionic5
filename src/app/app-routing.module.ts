import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

/**
 * App Routing Module
 * Migration to Ionic 5
 * Created by Leon : 8/4/20
 */
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'qr-scanner',
    loadChildren: () => import('./pages/qr-scanner/qr-scanner.module').then( m => m.QrScannerPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'general-menu',
    loadChildren: () => import('./pages/general-menu/general-menu.module').then( m => m.GeneralMenuPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'option-restaurant',
    loadChildren: () => import('./pages/option-restaurant/option-restaurant.module').then( m => m.OptionRestaurantPageModule)
  },
  {
    path: 'order-confirmation',
    loadChildren: () => import('./pages/order-confirmation/order-confirmation.module').then( m => m.OrderConfirmationPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'create-orders',
    loadChildren: () => import('./pages/create-orders/create-orders.module').then( m => m.CreateOrdersPageModule)
  },
  {
    path: 'payment-checkout',
    loadChildren: () => import('./pages/payment-checkout/payment-checkout.module').then( m => m.PaymentCheckoutPageModule)
  },
  {
    path: 'payment-options',
    loadChildren: () => import('./pages/payment-options/payment-options.module').then( m => m.PaymentOptionsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
