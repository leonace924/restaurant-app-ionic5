import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { URL_SERVICE } from '../../config/url.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  cart = {};
  sit: number;
  resto_id: number;

  constructor(public http: HttpClient, private userProvider: UsersService, private browser: InAppBrowser) {}

  /*******************************************************
   *            CONFIRMAR ORDEN DE COMPRA
   *******************************************************/
  Confirm(token) {
    let orders = [];

    //CONSTRUIMOS OBJETO QUE ENVIAREMOS A LA API
    Object.keys(this.cart).map(number => {
      let order = {
        fk_sit: this.sit,
        fk_dish: this.cart[number].fk_dish,
        status: 1,
        quantity: this.cart[number].quantity,
        extra_commentary: this.cart[number].additional
          ? this.cart[number].additional
          : "-"
      };
      orders.push(order);
    });

    //ENVIAMOS ARRAY DE OBJETO A LA API PARA CREAR LAS ORDENES
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + "/ordenes/";

      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " + token
        })
      };

      let RecoverPass = this.http.post(url, { ordenes: [...orders] }, options);
      RecoverPass.subscribe(
        data => {
          console.log(data);
          resolve(data);
          this.cart = [];
        },
        onerror => {
          reject(onerror);
        }
      );
    });
  }

  /*******************************************************
   *                        FIN
   *******************************************************/
   
  /*****************************************************
   *            CANCELAR ORDEN DE COMPRA
   *****************************************************/
  CancelOrder(order_id, commentary:any = "") {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + `/ordenes/${order_id}/cancelar-orden/`;

      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " + this.userProvider.token
        })
      };

      let cancelOrder = this.http.put(url, {extra_commentary: commentary}, options);
      cancelOrder.subscribe(
        (data: any) => {
          //console.log(data)
          resolve(data);
        },
        onerror => {
          //console.log(onerror)
          reject(onerror);
        }
      );
    });
  }
  /*******************************************************
   *                        FIN
   *******************************************************/

  /*****************************************************
   *            CANCELAR ORDEN DE COMPRA
   *****************************************************/
  MercadoPagoPayment(orderArray:any = []) {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + `/pagar-orden/`;
      const payment_orders = orderArray;
      console.log(orderArray);
      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " + this.userProvider.token
        })
      };

      let mercadoPago = this.http.post(url, {payment_orders}, options);
      mercadoPago.subscribe(
        (data: any) => {
          //console.log(data)
          // window.open(data.init_point);
          const browser = this.browser.create(data.url_modo_prueba, '_blank', 'location=yes');
          browser.on('loadstart').subscribe((event)=> {
            const closeUrl = '';
            const eventUrl = event.url;
            if(eventUrl.includes(closeUrl)) {
              browser.close();       //This will close InAppBrowser Automatically when closeUrl Started
            }
          });
          resolve(data);
        },
        onerror => {
          //console.log(onerror)
          reject(onerror);
        }
      );
    });
  }
}
