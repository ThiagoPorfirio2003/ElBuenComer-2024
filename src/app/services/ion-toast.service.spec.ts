import { TestBed } from '@angular/core/testing';

import { IonToastService } from './ion-toast.service';

describe('IonToastService', () => {
  let service: IonToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
