import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { URL_SERVICE, PREFIXE } from '../../config/url.service';

/**
 * HomePage
 * Migration to Ionic 5
 * Updated by Leon : 24/04/20
 */

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  DataUser: any;
  token = null;
  userDetails: any;

  constructor(
    public http: HttpClient,
    public platform: Platform,
    private storage: Storage
  ) {
  }

  checkForUser() {
    var promise1= this.storage.get(PREFIXE + "Token");
    var promise2 = this.storage.get(PREFIXE + "Data");

    return Promise.all([promise1, promise2]).then((data) => {
      if (promise1 && promise2) {
          this.DataUser = JSON.parse(data[1]).user;
          this.token = data[0];

          //PC Validation
          const token = localStorage.getItem(PREFIXE + "Token");
          const user = localStorage.getItem(PREFIXE + "Data");

          if (!this.token) {
            const userDataTemp = JSON.parse(user);
            this.DataUser = userDataTemp.user;
            this.token = token;
            return [this.token, this.DataUser]
          }

          return [this.token, this.DataUser];
        } else {
          return false;
        }
    });
  }

  /************************************************************
   *            CONSEGUIR DATOS DE USUARIO
   ***********************************************************/

  getUserDetails() {
    return new Promise((resolve, reject) => {
      const url = URL_SERVICE + `/cliente/detalles/`;

      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " + this.token
        })
      };

      const menu = this.http.get(url, options);
      menu.subscribe(
        (data: any) => {
          this.userDetails = data;
          resolve(this.userDetails);
        },
        onerror => {
          //console.log(onerror)
          reject(onerror);
        }
      );
    });
  }

  /************************************************************
   *          FIN CONSEGUIR DATOS DE USUARIO
   ***********************************************************/

  /************************************************************
   *            ACTUALIZAR DATOS DE USUARIO
   ***********************************************************/

  Profile(data) {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + "/cliente/actualizar/";

      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " + this.token
        })
      };

      let form_register  =   {
        "genero": 1,
        "imagen": null,
        "telefono": data.number,
        "fk_user": {
          "email": data.email,
          "username": data.username,
          "first_name": data.firstName,
          "last_name":data.lastName
        }
      }

      let register = this.http.put(url, form_register, options);
      register.subscribe(
        data => {
          resolve(data);
        },
        onerror => {
          console.log(onerror);
          reject("error");
        }
      );
    });
  }

  ProfileImage(image) {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + "/cliente/actualizar/";

      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " + this.token
        })
      };

      let form_register = {
        "genero": 1,
        "imagen": null,
        "telefono": this.userDetails.number,
        "fk_user": {
          "email": this.userDetails.email,
          "username": this.userDetails.username,
          "first_name": this.userDetails.firstName,
          "last_name":this.userDetails.lastName
        }
      }

      let register = this.http.put(url, form_register, options);
      register.subscribe(
        data => {
          resolve(data);
        },
        onerror => {
          console.log(onerror);
          reject("error");
        }
      );
    });
  }

  /************************************************************
   *          FIN ACTUALIZAR DATOS DE USUARIO
   ***********************************************************/

  /*************************************
   *    FUNCION PARA LOGUEAR USUARIO
   ************************************/

  login(data) {
    return new Promise((resolve, reject) => {
      //console.log(this.token);
      let url = URL_SERVICE + "/auth/token/login";
      let postData = new FormData();

      postData.append("username", data.username);
      postData.append("password", data.password);

      let login = this.http.post(url, postData);
      login.subscribe(
        (data: any) => {
          if (data.auth_token) {
            if (this.platform.is("cordova")) {
              this.storage.ready().then(() => {
                this.storage.set(PREFIXE + "Token", data.auth_token);
                this.storage.set(PREFIXE + "Data", JSON.stringify(data));
                this.DataUser = data.user;
                this.token = data.auth_token;
                resolve();
              });
            } else {
              //Computadora
              localStorage.setItem(PREFIXE + "Token", data.auth_token);
              localStorage.setItem(PREFIXE + "Data", JSON.stringify(data));

              this.DataUser = data.user;
              this.token = data.auth_token;
              resolve();
            }
          } else {
            reject();
          }
        },
        onerror => {
          console.log(onerror);
          reject();
        }
      );
    });
  }


  /*************************************
   *    FUNCION PARA REGISTRAR USUARIO
   ************************************/

  register(data) {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + "/cliente/";
      
      let form_register = {
        "genero": 1,
        "telefono": data.phone,
        "fk_user": {
          "email": data.email,
          "username": data.username,
          "first_name": data.firstName,
          "last_name": data.lastName,
          "password": data.password
        }
      }

      let register = this.http.post(url, form_register);
      register.subscribe(
        data => {
          resolve(data);
        },
        onerror => {
          console.log(onerror);
          reject("error");
        }
      );
    });
  }

  /*************************************
   *FUNCION PARA RECUPERAR  PASSWORD
   ************************************/

  RecoverPass(email) {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + "/auth/users/reset_password/";
      let postData = new FormData();

      postData.append("email", email);

      let recoverPass = this.http.post(url, postData);
      recoverPass.subscribe(
        data => {
          resolve(data);
        },
        onerror => {
          console.log(onerror.error.email[0]);
          reject(onerror.error.email[0]);
        }
      );
    });
  }

  /*************************************
   *    FUNCION PARA LOGUEAR USUARIO
   ************************************/

  logout() {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + "/auth/token/logout";

      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " + this.token
        })
      };

      let logout = this.http.post(url, {}, options);
      logout.subscribe(
        (data: any) => {
          this.storage.remove(PREFIXE + "Token");
          this.storage.remove(PREFIXE + "Data");
          localStorage.removeItem(PREFIXE + "Token");
          localStorage.removeItem(PREFIXE + "Data");
          resolve();
        },
        onerror => {
          reject();
        }
      );
    });
  }
}
