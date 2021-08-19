import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeFaiteComponent } from './commande-faite.component';

describe('CommandeFaiteComponent', () => {
  let component: CommandeFaiteComponent;
  let fixture: ComponentFixture<CommandeFaiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeFaiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeFaiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
