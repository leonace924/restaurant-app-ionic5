import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms';
import {
  NavController,
  AlertController,
  ToastController,
  MenuController,
  LoadingController
} from '@ionic/angular';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private DataRegister: FormGroup;

  constructor(
    public nav: NavController,
    public forgotCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public usersProvider: UsersService,
    public router: Router,
    private googlePlus: GooglePlus,
    /* private fb: Facebook */
  ) {

    this.DataRegister = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Username: ['', Validators.required],
      Email: ['',[Validators.required, Validators.email]],
      password: new FormControl('',[Validators.required,
        ]),
      passwordConfirmation: ['', Validators.required],
      Phone: ['', Validators.required]
    });    


    /**************************************************
      FUNCION PARA QUE LAS CONTRASEÑAS SEAN IGUALES
    **************************************************/

    this.DataRegister.controls['passwordConfirmation'].setValidators([
      Validators.required,
      this.
      Different.bind(this.DataRegister)
    ]);
    this.DataRegister.controls['password'].setValidators([
      Validators.required,
      this.
      Different.bind(this.DataRegister)
    ]);
  }

  ngOnInit() {
  }

  Different() {
    let DataRegister: any = this;
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,}$/;

      if (DataRegister.controls['passwordConfirmation'].value === DataRegister.controls['password'].value && regex.test(DataRegister.controls['password'].value)) {
        DataRegister.controls['passwordConfirmation'].status = "VALID";
        DataRegister.controls['password'].status = "VALID";
      } else {
        DataRegister.controls['passwordConfirmation'].status = "INVALID";
        DataRegister.controls['password'].status = "INVALID";
      }
  }

  /****************************************************
  FIN DE LA FUNCION PARA QUE LAS CONTRASEÑAS SEAN IGUALES
  *****************************************************/

  /*************************************
   FUNCION PARA LLAMAR SERVICIO REGISTER
  ************************************/
  async register(form: NgForm) {
    let loader = await this.loadingCtrl.create({
      message: "Checking user...",
    });

    await loader.present();

    this.usersProvider.register(this.DataRegister.value).then(() => {
      loader.dismiss();
      this.router.navigateByUrl('/login');
    }).catch(err => {
      loader.dismiss();
      this.presentToast("error when registering user");
    });

  }

  // go to login page
  login() {
    this.router.navigateByUrl('/login');
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


  /* LoginFacebook(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    .catch(e => console.log('Error logging into Facebook', e));
  } */

  async presentToast(text) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }
}
