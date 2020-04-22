import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { UsersService } from '../../services/users/users.service';
import { OrdersService } from '../../services/orders/orders.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'page-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {

  language: any;
  previousUrl: string;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private ordersP: OrdersService,
    private usersP: UsersService,
    public languageP: LanguageService,
    public router: Router
  ) {
    this.language = this.languageP.language;
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.usersP.getUserDetails()
    .then(res => {
      // console.log(res);
    })
    .catch(err => console.error(err))
  }

  async presentAlert(data) {
    let alert = await this.alertCtrl.create({
      header: data,
      subHeader: 'qr-text',
      buttons: ['Dismiss']
    });
    await alert.present();
  }

  scan() {
    //this.http.save_history(this.dataCodeQr);
    /*let test ='{"zmyq":"Ymdoae Mxhmdql","qymux":"ymdoaepmhupmxhmdql@symux.oay","btazq":"1782162380","z_fuowqf":"8","pmfq":"06\/09\/76","mbb":"OUR Adxmzpa","otgdot":"OUR Adxmzpa","qhqzf":"ftue ue m fqef","up_dqrqdqzoq":"ot_7RQo4lXcXwoz2vf8Ovxz5ITw","efmfge":"egooqqpqp","xmef1":"1818","ndmzp":"Huem","razpae":"odqpuf","yqzemvq pqx Euefqym":"Bmkyqzf oaybxqfq.","yagzf":"78000","pqeodubfuaz":"Oaybdm pq 8 qzfdmpme bmdm qx qhqzfa: ftue ue m fqef","gdx":"tffbe:\/\/bmk.efdubq.oay\/dqoqubfe\/moof_7R6rUdXcXwoz2vf8\/ot_7RQo4lXcXwoz2vf8Ovxz5ITw\/dobf_Rw3WSxidUhwPHtojlAgvyXzxqajGRSp","up_mffqzpqp":"7234274246","zmyqFuow":"Ymdoae Mxhmdql","qymuxFuow":"ymdoaepmhupmxhmdql@symux.oay","btazqFuow":"1782162380"}';
    this.dataCodeQr = this.desencrypte(test);
    //console.log(this.dataCodeQr);
    this.dataCodeQr.status = (this.dataCodeQr.status == "succeeded") ? "Exitoso" : "Ocurrió un error en la operación";
    this.http.save_attended(this.dataCodeQr.id_attended, this.dataCodeQr.id_reference).then((data)=>{
      this.http.attended_to_event(this.dataCodeQr.id_reference).then((data)=>{
        this.users_event = data;
      });
    });*/

    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData.text != null) {
        //console.log(JSON.stringify(barcodeData.text))
        let DataQr: NavigationExtras = {
          state: {
            sit_id: parseInt(JSON.parse(barcodeData.text).sit_id) 
          }
        };
        this.ordersP.sit = DataQr.state.sit_id;
        if (this.ordersP.sit) {
          this.router.navigate(['option-restaurant'], DataQr);
        }
      }
    })
    .catch(err => {
      
      let DataQr: NavigationExtras = { 
        state: { sit_id: 4 }
      };

      this.ordersP.sit = DataQr.state.sit_id;
      this.router.navigate(['option-restaurant'], DataQr);
      //this.router.navigateByUrl('/qr-scanner');
    });
  }
}
