import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { LanguageService } from '../../services/language/language.service';
import { MenuRestaurantService } from '../../services/menurestaurant/menurestaurant.service';

@Component({
  selector: 'page-option-restaurant',
  templateUrl: './option-restaurant.page.html',
  styleUrls: ['./option-restaurant.page.scss'],
})
export class OptionRestaurantPage implements OnInit {

  language: any;
  DataQr: any;
  ListMenu: any;
  loading: any;
  error: any;
  background: any = '../../assets/images/logo.png';

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private Menu: MenuRestaurantService,
    public languageP: LanguageService,
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
   
    this.Menu.setResto(this.DataQr);
    this.loading = 1;
    this.language = this.languageP.language;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loading = 1;
    this.Menu.ListMenu(this.DataQr.sit_id).then(data => {
      this.ListMenu = data;
      this.Menu.getResto(this.ListMenu.restaurant)
        .then(resto => {
          if (resto['logo']) {
            this.background = `http://ec2-3-130-111-166.us-east-2.compute.amazonaws.com/${resto['logo']}`;
          }
        })
        .catch(err => console.log(err))
      this.loading = 0;
    })
    .catch(err => {
      console.log("error");
      this.loading = 0;
      this.error = 1;
    });
  }

  GoMenu() {
    let DataQr: NavigationExtras = {
      state: {
        sit_id: this.DataQr.sit_id 
      }
    };
    this.router.navigate(['qr-scanner'], DataQr);
  }

  OpenMenu() {
    let DataQr: NavigationExtras = {
      state: {
        sit_id: this.DataQr.sit_id 
      }
    };
    this.router.navigate(['categories'], DataQr);
  }

  OpenStatusOrder() {
    let DataQr: NavigationExtras = {
      state: {
        sit_id: this.DataQr.sit_id 
      }
    };
    this.router.navigate(['order-confirmation'], DataQr);
  }

  async CallWaiter() {
    let loader = await this.loadingCtrl.create({
      message: "requesting the waiter",
    });

    await loader.present();

    this.Menu.CallWaiter(this.DataQr.sit_id).then(() => {
      loader.dismiss();
      this.presentToast("request sent successfully");
    }).catch(err => {
      loader.dismiss();
      this.presentToast("Este restaurante no posee mozos");    
    });
  }

  async presentToast(text) {
    const alert = await this.alertCtrl.create({
      header: text,
      buttons: ['Dismiss']
    });
    await alert.present();
  }

}
