import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';/* 
import { Facebook } from '@ionic-native/facebook/ngx'; */

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PipesModule } from './pipes/pipes.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    ImagePicker,
    GooglePlus,/* 
    Facebook, */
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
