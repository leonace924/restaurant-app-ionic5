import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateOrdersPage } from './create-orders.page';

describe('CreateOrdersPage', () => {
  let component: CreateOrdersPage;
  let fixture: ComponentFixture<CreateOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
