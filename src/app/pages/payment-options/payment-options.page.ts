import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, ModalController, LoadingController } from '@ionic/angular';
import { OrdersService } from '../../services/orders/orders.service';
import { LanguageService } from '../../services/language/language.service';
import { MenuRestaurantService } from '../../services/menurestaurant/menurestaurant.service';

@Component({
  selector: 'page-payment-options',
  templateUrl: './payment-options.page.html',
  styleUrls: ['./payment-options.page.scss'],
})
export class PaymentOptionsPage implements OnInit {

  language: any;
  orders: any;
  sitId: any;
  loader: any = null;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public viewCtrl: ModalController, 
    private ordersProv: OrdersService, 
    public languageP: LanguageService,
    private Menu: MenuRestaurantService, 
    public loadingCtrl: LoadingController,
    public router: Router
  ) {
    // Leon check this after API
    // this.orders = this.navParams.get('orders');
    // this.sitId = this.navParams.get('sitId');
    this.language = this.languageP.language;
  }

  ngOnInit() {
  }

  async goToCheckout() {

    let loader = await this.loadingCtrl.create({
      message: "requesting the waiter",
    });

    await loader.present();

    this.Menu.CallWaiter(this.sitId).then(() => {
      loader.dismiss();
      this.router.navigateByUrl('/payment-checkout');
    }).catch(err => {
      loader.dismiss();
      this.presentToast("Este Restaurante no posee Mozos");    
    });
    
  }
  

  MercadoPago() {
    this.loader = true;
    this.ordersProv.MercadoPagoPayment(this.orders)
      .then(data => {
        this.loader = false;
        this.router.navigateByUrl('/payment-checkout');
      })
      .catch(error => {
        this.loader = false;
        this.presentToast(error.detail);
      })
  }

  async presentToast(text) {
    let toast = await this.toastCtrl.create({
      message: text,
      position: 'bottom',
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await toast.present();
  }
}
