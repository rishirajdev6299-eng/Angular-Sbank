import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loginsbank } from './loginsbank';

describe('Loginsbank', () => {
  let component: Loginsbank;
  let fixture: ComponentFixture<Loginsbank>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loginsbank]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loginsbank);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
