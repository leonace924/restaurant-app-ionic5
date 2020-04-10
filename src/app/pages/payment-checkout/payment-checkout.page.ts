import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'page-payment-checkout',
  templateUrl: './payment-checkout.page.html',
  styleUrls: ['./payment-checkout.page.scss'],
})
export class PaymentCheckoutPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  GoMenu() {
    this.router.navigateByUrl('/qr-scanner');
  }

}
