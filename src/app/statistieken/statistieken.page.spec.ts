import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatistiekenPage } from './statistieken.page';

describe('StatistiekenPage', () => {
  let component: StatistiekenPage;
  let fixture: ComponentFixture<StatistiekenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StatistiekenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
