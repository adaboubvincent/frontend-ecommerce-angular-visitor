import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteurBaseComponent } from './visiteur-base.component';

describe('VisiteurBaseComponent', () => {
  let component: VisiteurBaseComponent;
  let fixture: ComponentFixture<VisiteurBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteurBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteurBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
