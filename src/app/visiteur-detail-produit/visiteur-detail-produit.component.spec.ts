import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteurDetailProduitComponent } from './visiteur-detail-produit.component';

describe('VisiteurDetailProduitComponent', () => {
  let component: VisiteurDetailProduitComponent;
  let fixture: ComponentFixture<VisiteurDetailProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteurDetailProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteurDetailProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
