import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralMenuPage } from './general-menu.page';

describe('GeneralMenuPage', () => {
  let component: GeneralMenuPage;
  let fixture: ComponentFixture<GeneralMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
