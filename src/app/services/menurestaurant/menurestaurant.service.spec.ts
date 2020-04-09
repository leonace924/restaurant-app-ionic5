import { TestBed } from '@angular/core/testing';

import { MenurestaurantService } from './menurestaurant.service';

describe('MenurestaurantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenurestaurantService = TestBed.get(MenurestaurantService);
    expect(service).toBeTruthy();
  });
});
