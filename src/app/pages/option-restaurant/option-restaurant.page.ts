import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, NavParams, ViewController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { MenuRestaurantService } from '../../services/menurestaurant/menurestaurant.service';

@Component({
  selector: 'page-option-restaurant',
  templateUrl: './option-restaurant.page.html',
  styleUrls: ['./option-restaurant.page.scss'],
})
export class OptionRestaurantPage implements OnInit {

  DataQr:any;
  ListMenu: any;
  loading: any;
  error: any;
  background:any = '../../assets/imgs/logo.png';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private Menu: MenuRestaurantService,
    public router: Router
  ) {

    this.DataQr = navParams.get("DataQr");
    this.Menu.setResto(this.DataQr);
    this.loading = 1;
  }

  ngOnInit() {
    console.log('ionViewDidLoad OptionRestaurantPage');
  }

  ionViewDidEnter(){
    this.loading = 1;
    this.Menu.ListMenu(this.DataQr.sit_id)
      .then(data => {
        this.ListMenu = data;
        this.Menu.getResto(this.ListMenu.restaurant)
          .then(resto => {
            if(resto['logo']) {
              this.background = `http://ec2-3-130-111-166.us-east-2.compute.amazonaws.com/${resto['logo']}`;
            }
          })
          .catch(err => console.log(err))
        this.loading = 0;
      })
      .catch(error => {
        console.log("error");
        this.loading = 0;
        this.error = 1;
      });
  }

  GoMenu() {
    this.navCtrl.setRoot(QrScannerPage,{DataQr:this.DataQr});
  }

  OpenMenu(){
    this.navCtrl.push( CategoriesPage,{DataQr:this.DataQr});
  }

  OpenStatusOrder(){
    this.navCtrl.push(OrderConfirmationPage, {DataQr:this.DataQr});
  }

  CallWaiter(){
    let loader = this.loadingCtrl.create({
      content: "requesting the waiter",
    });

    loader.present();

    this.Menu.CallWaiter(this.DataQr.sit_id).then(()=>{
      loader.dismiss();
      this.presentToast("request sent successfully");
    }).catch(error=>{
      loader.dismiss();
      this.presentToast("Este restaurante no posee mozos");    
    });
  }


  presentToast(text) {
    const alert = this.alertCtrl.create({
      title: text,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
