import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurListProduitCommandesComponent } from './fournisseur-list-produit-commandes.component';

describe('FournisseurListProduitCommandesComponent', () => {
  let component: FournisseurListProduitCommandesComponent;
  let fixture: ComponentFixture<FournisseurListProduitCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurListProduitCommandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurListProduitCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
