import { TestBed } from '@angular/core/testing';

import { ProduitacommanderService } from './produitacommander.service';

describe('ProduitacommanderService', () => {
  let service: ProduitacommanderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitacommanderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
