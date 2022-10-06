import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAttractionsComponent } from './all-attractions.component';

describe('AllAttractionsComponent', () => {
  let component: AllAttractionsComponent;
  let fixture: ComponentFixture<AllAttractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAttractionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAttractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
