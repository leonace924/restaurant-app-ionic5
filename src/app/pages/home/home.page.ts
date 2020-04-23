import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { UsersService } from '../../services/users/users.service';

/**
 * HomePage
 * Migration to Ionic 5
 * Created by Leon : 08/04/20
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public usersProvider: UsersService,
    public router: Router
  ) {
    this.menu.swipeGesture(true);
  }

  ionViewDidEnter() {
    this.usersProvider.getUserDetails()
    .then(response => {
      // console.log(response);
    })
    .catch(err => console.error(err))
  }
}
