import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'page-create-orders',
  templateUrl: './create-orders.page.html',
  styleUrls: ['./create-orders.page.scss'],
})
export class CreateOrdersPage implements OnInit {

  data: any;
  count = 1;
  rec = true;
  totalPrice: any;
  additional: any = "";
  dish_image: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ModalController,
    private ordersP: OrdersService
  ) {
    /************************************************
     *RECIBIR DATOS Y PRECARGAR INFORMACION DEL PEDIDO
     ************************************************/

    //  Leon check after API
    //let orders = navParams.get("orders");
    // this.dish_image = [];
    // this.data = orders;
    // this.dish_image = orders.dish_dimage;
    // if (this.ordersP.cart[orders.pk]) {
    //   this.count = parseInt(this.ordersP.cart[orders.pk].quantity);
    //   this.additional = this.ordersP.cart[orders.pk].additional;
    // }

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
