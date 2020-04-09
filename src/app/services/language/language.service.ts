import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: any;

  constructor(public http: HttpClient) {
    this.getLanguage();
  }

  switchLanguage(value) {
    return new Promise(resolve => {
      localStorage.setItem("language", value);
      this.language = value;
      resolve();
    });
  }

  getLanguage() {
    if (localStorage.getItem("language")) {
      this.language = localStorage.getItem("language");
    } else {
      this.language = "es";
    }
  }
}
