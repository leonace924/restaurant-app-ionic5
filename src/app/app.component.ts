import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController, LoadingController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { UsersService } from '../app/services/users/users.service';
import { LanguageService } from '../app/services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  language: any;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    public usersProvider: UsersService,
    public languageP: LanguageService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public router: Router
  ) {
    this.language = this.languageP.language;

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  OpenPage(page: any) {
    this.router.navigateByUrl(page);
    this.menuCtrl.close();
  }

  async logout() {    
    let loader = await this.loadingCtrl.create({
      message: "Ending session...",
    });
    await loader.present();

    this.usersProvider.logout().then(() => {
      loader.dismiss();
      this.menuCtrl.close();
      this.router.navigateByUrl('/login');
    }).catch(err => {
      loader.dismiss();
      this.presentToast("An error occurred while logging out");
    });
  }

  async presentToast(text) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }
}