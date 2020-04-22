import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, Validators, FormBuilder, FormGroup,  FormControl } from '@angular/forms';
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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private registerForm: FormGroup;
  language: any;

  constructor(
    public nav: NavController,
    public forgotCtrl: AlertController,
    public menu: MenuController,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public usersProvider: UsersService,
    public languageP: LanguageService,
    public router: Router,
    private googlePlus: GooglePlus,
    /* private fb: Facebook */
  ) {
    this.language = this.languageP.language;

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: new FormControl('',[Validators.required,
        ]),
      passwordConfirmation: ['', Validators.required],
      phone: ['', Validators.required]
    });

    /**************************************************
      FUNCION PARA QUE LAS CONTRASEÑAS SEAN IGUALES
    **************************************************/

   this.registerForm.controls['passwordConfirmation'].setValidators([
      Validators.required,
      this.
      Different.bind(this.registerForm)
    ]);
    this.registerForm.controls['password'].setValidators([
      Validators.required,
      this.
      Different.bind(this.registerForm)
    ]);
  }

  ngOnInit() {
  }

  Different() {
    let registerForm: any = this;
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,}$/;

    if (registerForm.controls['passwordConfirmation'].value === registerForm.controls['password'].value && regex.test(registerForm.controls['password'].value)) {
      registerForm.controls['passwordConfirmation'].status = "VALID";
      registerForm.controls['password'].status = "VALID";
    } else {
      registerForm.controls['passwordConfirmation'].status = "INVALID";
      registerForm.controls['password'].status = "INVALID";
    }
  }

  /****************************************************
  FIN DE LA FUNCION PARA QUE LAS CONTRASEÑAS SEAN IGUALES
  *****************************************************/

  /*************************************
   FUNCION PARA LLAMAR SERVICIO REGISTER
  ************************************/
  async register() {
    let loader = await this.loadingCtrl.create({
      message: "Checking user...",
    });

    await loader.present();

    // let formData = {
    //   email: form.value.email,
    //   username: form.value.username,
    //   firstName: form.value.firstName,
    //   lastName: form.value.lastName,
    //   phone: form.value.phone,
    //   password: form.value.password
    // }

    // this.usersProvider.register(formData).then(() => {
    //   loader.dismiss();
    //   this.router.navigateByUrl('/login');
    // }).catch(err => {
    //   loader.dismiss();
    //   this.presentToast("error when registering user");
    // });
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
    /*
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    .catch(e => console.log('Error logging into Facebook', e));
    */
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
