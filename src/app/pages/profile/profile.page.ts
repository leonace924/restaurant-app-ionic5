import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  NavController,
  AlertController,
  ToastController,
  LoadingController
} from '@ionic/angular';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { UsersService } from '../../services/users/users.service';
import { LanguageService } from '../../services/language/language.service';

/**
 * ProfilePage
 * Migration to Ionic 5
 * Updated by Leon : 24/04/20
 */

@Component({
  selector: 'page-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  language: any;
  userImage: any = null;
  DataProfile: FormGroup;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public usersProvider: UsersService,
    public languageP: LanguageService,
    private imagePicker: ImagePicker,
    private alertCtrl: AlertController,
    public router: Router
  ) {
    this.DataProfile = this.formBuilder.group({
      email: [usersProvider.userDetails.fk_user.email, Validators.required],
      firstName: [usersProvider.userDetails.fk_user.first_name, Validators.required],
      lastName: [usersProvider.userDetails.fk_user.last_name, Validators.required],
      userName: [usersProvider.userDetails.fk_user.username, Validators.required],
      number: [usersProvider.userDetails.telefono, Validators.required],
    });

    this.language = this.languageP.language;
  }

  ngOnInit() {
  }

  async openGallery() {
    const options = {
      maximumImagesCount: 1, 
      width: 150, 
      height: 150, 
      quality: 70, 
      outputType: 1
    }

    this.imagePicker.getPictures(options) //base64 output
    .then(async (results) => {
      const imageTemp = results[0];
      this.userImage = 'data:image/jpeg;base64,'+results[0];

      let loader = await this.loadingCtrl.create({
        message: "Updating user ...",
      });
      await loader.present();

      this.usersProvider.ProfileImage(imageTemp)
      .then(res => {
        loader.dismiss();
        this.presentAlert('success');
      }).catch(err => {
        loader.dismiss()
        this.presentAlert('error');
      })
        
      // return 'data:image/jpeg;base64,'+results[0];  
      
    }).catch(
      err => console.error(err)
    );
  }

  /*******************************************
   FUNCION PARA LLAMAR SERVICIO Actulizar Datos
  ********************************************/
  async Profile() {

    let loader = await this.loadingCtrl.create({
      message: "Updating user ...",
    });
    
    await loader.present();

    this.usersProvider.Profile(this.DataProfile.value)
    .then(() => {
      loader.dismiss();
      this.presentAlert('Usuario Actualizado');
      // this.router.navigateByUrl('/login');
    }).catch(err => {
      loader.dismiss();
      this.presentToast("failed to update user");
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

  async presentAlert(text) {
    let alert = await this.alertCtrl.create({
      header: text,
      buttons: ['Dismiss']
    });
    await alert.present();
  }
}
