import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { UsersService } from '../../services/users/users.service';
import { OrdersService } from '../../services/orders/orders.service';
import { MenuRestaurantService } from '../../services/menurestaurant/menurestaurant.service';
import { LanguageService } from '../../services/language/language.service';

/**
 * Checkout Page
 * Migration to Ionic 5
 * Created by Leon : 8/4/20
 */

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  language: any;
  DataQR: any;
  checkInfo: any[] = [];
  subTotal: any;
  valueDiscount: any;
  discountTotal: any;
  currentDate: any;
  valueIvaTax: any;
  ivaTaxTotal: any;
  total: any;
  reduction: boolean;

  constructor(
    public navCtrl: NavController,
    private ordersP: OrdersService,
    public viewCtrl: ModalController,
    public toastCtrl: ToastController,
    private usersP: UsersService,
    private menuP: MenuRestaurantService,
    public languageP: LanguageService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.subTotal = 0;
    this.valueDiscount = 0.1; // 10%
    this.valueIvaTax = 0; // 0%
    this.ivaTaxTotal = 0;
    this.discountTotal = 0;
    this.discountTotal = 0;
    this.reduction = false;
    this.currentDate = new Date();
    this.DataQR = this.menuP.dataQR;
    this.language = this.languageP.language;

    /*********************************************
     * CARGAR OBJETOS DEL PEDIDOS ALMACENADOS EN EL PROVIDER
     ********************************************/

    Object.keys(this.ordersP.cart).map(key => {
      if (this.ordersP.cart[key]) {
        this.subTotal +=
          this.ordersP.cart[key].price * this.ordersP.cart[key].quantity;
        this.checkInfo.push(this.ordersP.cart[key]);
      }
    });

    this.discountTotal = this.subTotal * this.valueDiscount;
    this.ivaTaxTotal = this.subTotal * this.valueIvaTax;
    this.total = this.subTotal - this.discountTotal + this.ivaTaxTotal;

    /*********************************************
     *                    FIN
     ********************************************/
  }

  ngOnInit() {
  }

  /*********************************************
   * CANCELAR ORDEN Y VOLVER AL MENU
   ********************************************/
  cancelOrder() {
    this.ordersP.cart = {};
    this.viewCtrl.dismiss();
  }

  /*********************************************
   *                    FIN
   ********************************************/

  /************************************************************
   *                  ABRIR RECIBO DE PAGO
   ***********************************************************/

  ConfirmOrder() {
    console.log(this.ordersP.cart)
    this.ordersP
      .Confirm(this.usersP.token)
      .then(data => {
        this.viewCtrl.dismiss();
        this.presentToast("Se ha creado una orden");
        let DataQR: NavigationExtras = {
          state: {
            sit_id: this.DataQR.sit_id 
          }
        };
        this.router.navigate(['order-confirmation'], DataQR);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /************************************************************
   *                          FIN
   ***********************************************************/

  async presentToast(data: any) {
    let toast = await this.toastCtrl.create({
      message: data,
      duration: 1500,
      position: 'bottom'
    });
  
    await toast.present();
  }
}