import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteurEnregistreComponent } from './visiteur-enregistre.component';

describe('VisiteurEnregistreComponent', () => {
  let component: VisiteurEnregistreComponent;
  let fixture: ComponentFixture<VisiteurEnregistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteurEnregistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteurEnregistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
