import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashsbank } from './dashsbank';

describe('Dashsbank', () => {
  let component: Dashsbank;
  let fixture: ComponentFixture<Dashsbank>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashsbank]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashsbank);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
