import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  NavController,
  MenuController,
} from '@ionic/angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public router: Router
  ) {
    this.menu.swipeGesture(true);
  }

  OpenMenu(){
    //this.router.navigateByUrl('/login');
    //this.navCtrl.push(MenuPage)
  }

  OpenPage(){
    //this.navCtrl.push(QrScannerPage);
  }

}
