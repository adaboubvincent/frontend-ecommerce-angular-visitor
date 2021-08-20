import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornisseurListProduitComponent } from './fornisseur-list-produit.component';

describe('FornisseurListProduitComponent', () => {
  let component: FornisseurListProduitComponent;
  let fixture: ComponentFixture<FornisseurListProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FornisseurListProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FornisseurListProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
