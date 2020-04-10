import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { URL_SERVICE } from '../../config/url.service';

@Injectable({
  providedIn: 'root'
})
export class MenuRestaurantService {

  token = null;
  dataQR:any = null;
  timeOut:any;
  sincr: string;

  constructor(
    public http: HttpClient, 
    private userProvider: UsersService
  ) {
  }
  
  /************************************************************
   *             SETEAR EL QR POR TODA LA APP
   ***********************************************************/

  setResto(DataQR) {
    this.dataQR = DataQR;
    return this.dataQR;
  }


  /************************************************************
   *            LISTAR CATEGORIAS DEL MENU
   ***********************************************************/

  GetMenuGroup(menu_id) {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + `/menu-group/?menu=${menu_id}`;

      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " + this.userProvider.token
        })
      };

      let menu = this.http.get(url, options);
      menu.subscribe(
        (data: any) => {
          //console.log(data)
          resolve(data.results);
        },
        onerror => {
          //console.log(onerror)
          reject(onerror);
        }
      );
    });
  }

  /************************************************************
   *           FIN LISTAR CATEGORIAS DEL MENU
   ***********************************************************/

  /************************************************************
   * LISTAR PLATOS O BEBIDAS DE LA CATEGORIA SELECCIONADA
   ***********************************************************/

  GetMenu(sit_id, category_id, id_menu, rest_id) {
    return new Promise((resolve, reject) => {
      let url =
        URL_SERVICE +
        `/dish/?sit=${sit_id}&menu_group=${category_id}&menu_group__menu=${id_menu}&menu_group__menu__restaurant=${rest_id}`;
      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " + this.userProvider.token
        })
      };

      let menu = this.http.get(url, options);
      menu.subscribe(
        (data: any) => {
          //console.log(data)
          resolve(data.results);
        },
        onerror => {
          //console.log(onerror)
          reject(onerror);
        }
      );
    });
  }
  /************************************************************
   *           FIN LISTAR CATEGORIA SELECCIONADA
   ***********************************************************/

  /************************************************************
   *                  LISTA DE MENU
   ***********************************************************/

  ListMenu(sit_id) {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + `/obtener-menu/${sit_id}/`;

      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " + this.userProvider.token
        })
      };

      let list_menu = this.http.get(url, options);
      list_menu.subscribe(
        (data: any) => {
          // console.log(data)
          resolve(data);
        },
        onerror => {
          //console.log(onerror)
          reject(onerror);
        }
      );
    });
  }
  /************************************************************
   *           FIN LISTA DE MENU
   ***********************************************************/

  /************************************************************
   *                  INFO RESTO
   ***********************************************************/

  getResto(resto_id) {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + `/restaurant-atributes/${resto_id}/`;

      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " + this.userProvider.token
        })
      };

      let list_menu = this.http.get(url, options);
      list_menu.subscribe(
        (data: any) => {
          // console.log(data)
          resolve(data);
        },
        onerror => {
          //console.log(onerror)
          reject(onerror);
        }
      );
    });
  }
  /************************************************************
   *                 FIN INFO RESTO
   ***********************************************************/

  /************************************************************
   *                 LLAMAR Al MOZO
   ***********************************************************/

  CallWaiter(sit_id) {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + `/llamar-mozo/${sit_id}/ `;

      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " + this.userProvider.token
        })
      };

      let callWaiter = this.http.put(url, {}, options);
      callWaiter.subscribe(
        (data: any) => {
          //console.log(data)
          resolve(data);
        },
        onerror => {
          //console.log(onerror)
          reject(onerror);
        }
      );
    });
  }
  /************************************************************
   *           FIN LLAMAR AL MOZO
   ***********************************************************/



  ConfirmOrder(sit_id) {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + `/ordenes/?fk_sit=${sit_id}`;

      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " +  this.userProvider.token
        })
      };

      let ConfirmOrder = this.http.get(url, options);
       ConfirmOrder.subscribe(
        (data: any) => {
          //console.log(data)
          resolve(data.results);
        },
        onerror => {
          //console.log(onerror)
          reject(onerror);
        }
      );
    });
  }

  getDishesInfo(sit_id) {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICE + `/dish/?sit=${sit_id}`;

      const options = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Token " +  this.userProvider.token
        })
      };

      let ConfirmOrder = this.http.get(url, options);
       ConfirmOrder.subscribe(
        (data: any) => {
          //console.log(data)
          resolve(data.results);
        },
        onerror => {
          //console.log(onerror)
          reject(onerror);
        }
      );
    });
  }
}