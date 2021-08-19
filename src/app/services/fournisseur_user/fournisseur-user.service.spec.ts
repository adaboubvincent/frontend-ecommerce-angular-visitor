import { TestBed } from '@angular/core/testing';

import { FournisseurUserService } from './fournisseur-user.service';

describe('FournisseurUserService', () => {
  let service: FournisseurUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FournisseurUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
