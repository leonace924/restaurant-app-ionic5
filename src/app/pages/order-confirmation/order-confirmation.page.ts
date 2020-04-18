import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController, AlertController, ToastController, ActionSheetController, Platform } from '@ionic/angular';
import { OrdersService } from '../../services/orders/orders.service';
import { LanguageService } from '../../services/language/language.service';
import { MenuRestaurantService } from '../../services/menurestaurant/menurestaurant.service';

@Component({
  selector: 'page-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  language: any;
  DataQr: any;
  confirmOrder = < any > [];
  loading: number = 0;
  interval: any;

  constructor(
    public nav: NavController,
    public platform: Platform,
    private Menu: MenuRestaurantService,
    private Order: OrdersService,
    public languageP: LanguageService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.DataQr = {
          sit_id: this.router.getCurrentNavigation().extras.state.sit_id
        };
      }
    });

    this.confirmOrder = [];
    this.loading = 1;
    this.language = this.languageP.language;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loading = 1;
    this.interval = setInterval(() => {
      this.getOrders();
    }, 5000)
  }

  getOrders() {
    let getOrders = [];

    this.Menu.ConfirmOrder(this.DataQr.sit_id)
    .then((data:any) => {
      getOrders = data;
      this.Menu.getDishesInfo(this.DataQr.sit_id)
      .then((dishes:any) => {
        this.confirmOrder = dishes.map(dish => {
          return getOrders.map(order => {
            if (dish['pk'] == order.fk_dish) {
              order.price = parseFloat(dish['price']) * order.quantity;
              order.dish_name = dish['name'];
            }
            return order;
          })
        });
        this.loading = 0;
      })
      .catch(err => {
        this.loading = 0;
        console.log(err)
      });
    }).catch(err => {
      this.loading = 0;
      console.log(err);
    });
  }

  ionViewWillLeave() {
    clearInterval(this.interval);
  }

  GoMenu() {
    let DataQr: NavigationExtras = {
      state: {
        sit_id: this.DataQr.sit_id 
      }
    };
    this.router.navigate(['option-restaurant'], DataQr);
  }

  PayAllOrders(orders) {
    const orderIds = [];

    orders.forEach(element => {
      orderIds.push({pk: element.id})
    });
    
    console.log(orderIds)
    // this.nav.push(PaymentOptionsPage, {orders : orderIds, sitId: this.DataQr.sit_id});
  }

  async ConfirmOrder(order) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Que Desea Hacer?',
      buttons: [/* {
          text: 'Pedir Cuenta',
          icon: !this.platform.is('ios') ? 'checkmark-circle-outline' : null,
          handler: () => {
            this.nav.push(PaymentOptionsPage, {dishId : order.id, sitId: this.DataQr.sit_id});
          }
        }, */
        {
          text: 'Cancelar Pedido',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            this.CancelOrder(order.id)
          }
        },
        {
          text: 'Cerrar',
          role: 'Exit', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'arrow-round-back' : null,
          handler: () => {
            console.log('Exit clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }

  async CancelOrder(order_id) {
    const confirm = await this.alertCtrl.create({
      header: 'Cancelar Orden?',
      message: 'Por favor escriba un comentario diciendo porque cancelo la orden',
      inputs: [
        {
          name: 'extra_commentary',
          placeholder: 'Comentario'
        },
      ],
      buttons: [
        {
          text: 'Salir',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Cancelar Orden',
          handler: data => {
            this.Order.CancelOrder(order_id, data.extra_commentary)
              .then(data => {
                this.presentToast(data['detail']);
                this.presentToast("Orden Cancelada");
                /* this.GoMenu(); */
              })
              .catch(error => {
                this.presentToast(error.statusText);
              })
          }
        }
      ]
    });

    await confirm.present();
  }

  async presentToast(data: any) {
    let toast = await this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'bottom'
    });
  
    await toast.present();
  }
}
