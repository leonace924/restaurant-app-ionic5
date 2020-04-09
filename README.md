# restaurant-ionic-app
Restaurant Ionic App



### Guide for migration to Ionic 5

#### Initial Step

Reference https://www.joshmorony.com/my-method-for-upgrading-from-ionic-3-to-ionic-4/ to make new project as Ionic 5 and copy old code one by one to new project


#### Class changes

<ion-content padding> to <ion-content class="ion-padding">

Reference https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#breaking-changes to change all classes

#### SCSS part:
1. In component scss file
page-home {
  ...
}

to

:host {

}

2. for border-bottom color of ion-input component
use --border-color: #fff; like this

3. 


#### Component part

Reference https://ionicframework.com/docs/api


#### Custom Pipe working fine on app.component.html but not on other pages

1) Firstly, create pipes folder in src/app folder (in app folder).

2) Second, on cmd "ionic generate pipe pipes/searchfilter" => this will generate two files in pipes.

3 Third, create file in pipes folder with name "pipes.module.ts" and write below code to => "pipes.module.ts"

`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchfilterPipe } from './searchfilter.pipe';  //our pipe which we generate

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchfilterPipe],
  exports: [SearchfilterPipe]
})
export class PipesModule { }
Now we have PipesModule we can generate more pipes and write them in pipesmodule. We will import only PipesModule instead of all pipes.`

4) You do not have to import PipesModule in app.module.ts

5) Now go to page which you want to use pipe and open for example "anasayfa.module.ts" and import "PipesModule" and write it in @ngModel imports(it will be created automatically) Please be careful you will import PipesModule to something.MODULE.TS not something.page.ts

Reference TranslationPipe in this project