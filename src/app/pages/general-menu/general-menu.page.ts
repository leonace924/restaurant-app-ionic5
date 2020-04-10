import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { OrdersService } from '../../services/orders/orders.service';
import { MenuRestaurantService } from '../../services/menurestaurant/menurestaurant.service';

@Component({
  selector: 'page-general-menu',
  templateUrl: './general-menu.page.html',
  styleUrls: ['./general-menu.page.scss'],
})
export class GeneralMenuPage implements OnInit {

  category: any;
  resto_id: any;
  sit_id: any;
  MenuRestaurant: any = [];
  searchItems: any;
  menus = "dishes";
  orders: any;
  totalPrice: number;
  rec = true;
  CheckoutItems: any = [];
  loading: number = 0;
  error: number = 0;

  constructor(
    public navCtrl: NavController,
    private Menu: MenuRestaurantService,
    public modalCtrl: ModalController,
    private ordersP: OrdersService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    //RECIBIENDO LOS VALORES DE LA CATEGORIA PASDOS POR PARAMETROS

    //  Leon check after API
    // this.category = navParams.get("category");
    // this.resto_id = navParams.get("resto");
    // this.sit_id = navParams.get("sit_id");

    console.log(this.category);
    this.initializeItems();
    this.totalPrice = 0;
  }

  ngOnInit() {
  }

  /************************************************************
   * ABRIR PAGINA DE PEDIDOS Y ENVIAMOS LOS DETALLES
   ***********************************************************/

  OpenOrders(option) {
    //  Leon check after API
    // let pageCreateOrder = this.navCtrl.push(CreateOrdersPage, {
    //   orders: option
    // });
  }

  /************************************************************
   *                          FIN
   ***********************************************************/

  CanActivate() {
    //FUNCION CICLO DE VIDA IONIC

    /************************************************************
     * LISTAR PLATOS O BEBIDAS DE LA CATEGORIA SELECCIONADA
     ***********************************************************/
    this.loading = 1;
    console.log(this.category);
    this.Menu.GetMenu(
      this.sit_id,
      this.category.id,
      this.category.menu,
      this.resto_id
    )
      .then(data => {
        this.MenuRestaurant = data;
        this.loading = 0;
        this.initializeItems();
      })
      .catch(error => {
        this.loading = 0;
        this.error = 1;
      });

    /************************************************************
     *                          FIN
     ***********************************************************/

    /************************************************************
     * REVISAR OBJECTO DE PEDIDOS Y HACER EL CALCULO PARA EL PRECIO TOTAL
     ***********************************************************/

    this.totalPrice = 0;
    Object.keys(this.ordersP.cart).map(key => {
      //console.log(key);
      if (this.ordersP.cart[key]) {
        this.totalPrice +=
          this.ordersP.cart[key].price * this.ordersP.cart[key].quantity;
      }
    });

    /************************************************************
     *                          FIN
     ***********************************************************/
  }

  /************************************************************
   *                  ABRIR RECIBO DE PAGO
   ***********************************************************/

  openCheck() {
    this.router.navigateByUrl('checkout');
  }

  /************************************************************
   *                          FIN
   ***********************************************************/

  /************************************************************
   *                    BARRA DE BUSQUEDA
   ***********************************************************/
  initializeItems() {
    this.searchItems = this.MenuRestaurant;
  }

  onSearch(event) {
    this.initializeItems();

    let val = event.target.value;

    if (val && val.trim() != "") {
      this.searchItems = this.searchItems.filter(
        seachItem =>
          seachItem.name.toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
  }

  /************************************************************
   *                          FIN
   ***********************************************************/

}
