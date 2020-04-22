import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NavController,
  AlertController,
  ToastController,
  MenuController,
  LoadingController
} from '@ionic/angular';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { UsersService } from '../../services/users/users.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  language: any;
  selectOption: any;

  constructor(
    public nav: NavController,
    public forgotCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public usersProvider: UsersService,
    private googlePlus: GooglePlus,/* 
    private fb: Facebook, */
    public languageP: LanguageService,
    public router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.menu.swipeGesture(false);

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidEnter() {
    this.checkUser();
  }

  ngOnInit() {
    this.language = this.languageP.language;
    this.selectOption = this.language;
  }

  async checkUser() {
    let loader = await this.loadingCtrl.create({
      message: 'Checking user...'
    });

    await loader.present();

    this.usersProvider.checkForUser()
      .then(data => {
        loader.dismiss();
        if (data[0] !== null) {
          this.router.navigateByUrl('/home');
        } else {
          return false;
        }
      })
      .catch(err => {
        loader.dismiss();
        if (err.detail) {
          this.presentToast(err.detail);
        }
      });
  }

  /***********************************
   * FUNCION PARA CAMBIAR EL IDIOMA
   ************************************/

  changeLanguage(event: CustomEvent) {
    this.languageP.switchLanguage(event.detail.value).then(() => {
      this.router.navigateByUrl('/login');
      this.ngOnInit();
    });
  }

  /*************************************
   *    FUNCION PARA LLAMAR SERVICIO LOGUIN
   ************************************/
  async login() {
    let loader = await this.loadingCtrl.create({
      message: "Checking user..."
    });

    await loader.present();

    this.usersProvider
      .login(this.loginForm.value)
      .then(() => {
        loader.dismiss();
        this.router.navigateByUrl('/home');
      })
      .catch(err => {
        loader.dismiss();
        this.presentToast("Invalid username or password");
      });
  }

  /*************************************
   *    FUNCION PARA RECUPERAR PASS
   ************************************/
  async forgotPass() {
    let forgot = await this.forgotCtrl.create(<any>{
      header: "Forgot Password?",
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: "email",
          placeholder: "Email",
          type: "email"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Send",
          handler: (data) => {
            this.usersProvider
              .RecoverPass(data.email)
              .then(() => {
                this.presentToast(
                  "your password was sent successfully ah your email"
                );
              })
              .catch(err => {
                this.presentToast("Please Verify Your Email");
              });
          }
        }
      ]
    });
    await forgot.present();
  }

  async presentToast(text) {
    let toast = await this.toastCtrl
      .create({
        message: text,
        duration: 3000,
        position: "bottom"
      });
    await toast.present();
  }

  /*************************************
   *    FUNCION PARA GOOGLE PLUS
   ************************************/
  LoginGoogle() {
    /**.login({
      'webClientId':'XXXXXX.apps.googleusercontent.com',
      'offline': true
      }) */

    this.googlePlus
      .login({})
      .then(res => {
        console.log("11111");
        console.log(JSON.stringify(res));
        console.log("222222");
      })
      .catch(err => {
        console.error("33333");
        console.error(err);
        console.error("44444");
      });
  }

  /*************************************
   *    FUNCION PARA FACEBOOK
   ************************************/

  LoginFacebook() {
    /* this.fb
      .login(["public_profile", "user_friends", "email"])
      .then((res: FacebookLoginResponse) =>
        console.log("Logged into Facebook!", res)
      )
      .catch(e => console.log("Error logging into Facebook", e));
    */
  } 
}
