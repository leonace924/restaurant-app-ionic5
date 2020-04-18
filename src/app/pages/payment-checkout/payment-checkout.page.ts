import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'page-payment-checkout',
  templateUrl: './payment-checkout.page.html',
  styleUrls: ['./payment-checkout.page.scss'],
})
export class PaymentCheckoutPage implements OnInit {

  language: any;

  constructor(
    public navCtrl: NavController,
    public languageP: LanguageService,
    public router: Router
  ) {
    this.language = this.languageP.language;
  }

  ngOnInit() {
  }

  GoMenu() {
    this.router.navigateByUrl('/qr-scanner');
  }

}
