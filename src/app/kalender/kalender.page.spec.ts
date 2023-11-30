import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KalenderPage } from './kalender.page';

describe('KalenderPage', () => {
  let component: KalenderPage;
  let fixture: ComponentFixture<KalenderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(KalenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
