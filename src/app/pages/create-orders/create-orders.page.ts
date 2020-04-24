import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { OrdersService } from '../../services/orders/orders.service';
import { LanguageService } from '../../services/language/language.service';

/**
 * CreateOrdersPage
 * Migration to Ionic 5
 * Updated by Leon : 24/04/20
 */

@Component({
  selector: 'page-create-orders',
  templateUrl: './create-orders.page.html',
  styleUrls: ['./create-orders.page.scss'],
})
export class CreateOrdersPage implements OnInit {

  language: any;
  data: any;
  count = 1;
  rec = true;
  totalPrice: any;
  additional: any = "";
  dish_image: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ModalController,
    private ordersP: OrdersService,
    public languageP: LanguageService,
    private route: ActivatedRoute,
    public router: Router
  ) {

    this.language = this.languageP.language;
    
    /************************************************
     *RECIBIR DATOS Y PRECARGAR INFORMACION DEL PEDIDO
     ************************************************/

    //  Leon check after API
    let orders;
    
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        orders = this.router.getCurrentNavigation().extras.state.orders
      }
    });

    this.dish_image = [];
    this.data = orders;
    this.dish_image = orders.dish_dimage;
    if (this.ordersP.cart[orders.pk]) {
      this.count = parseInt(this.ordersP.cart[orders.pk].quantity);
      this.additional = this.ordersP.cart[orders.pk].additional;
    }

    /************************************************
     *                FIN
     ************************************************/
  }

  ngOnInit() {
  }

  /************************************************
   *        AGREGAR O SUBSTRAER PLATOS
   ************************************************/
  //Funcion De Sumar Y Restar En El Pedido
  add() {
    this.count += 1;
    //this.managePrice(this.data.price, this.count)
  }

  sub() {
    this.count = this.count == 1 ? 1 : (this.count -= 1);
    //this.managePrice(this.data.price, this.count)
  }

  /************************************************
   *                FIN
   ************************************************/

  /************************************************
   *        AGREGAR AL PEDIDO
   ************************************************/
  AddCar() {
    this.ordersP.cart[this.data.pk] = {
      name: this.data.name,
      fk_dish: this.data.pk,
      price: this.data.price,
      quantity: this.count,
      additional: this.additional,
      dish_dimage: this.data.dish_dimage
    };

    this.viewCtrl.dismiss();
  }

  /************************************************
   *                   FIN
   ************************************************/

  closeModal() {
    //CERRAR PAGINA
    this.navCtrl.pop();
  }

}
