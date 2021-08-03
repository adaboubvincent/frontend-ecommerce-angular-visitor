import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteurAccueilComponent } from './visiteur-accueil.component';

describe('VisiteurAccueilComponent', () => {
  let component: VisiteurAccueilComponent;
  let fixture: ComponentFixture<VisiteurAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteurAccueilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteurAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
