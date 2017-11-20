import {async, ComponentFixture, TestBed, HeaderComponent, MatIconModule, MatToolbar, MatToolbarRow, CommonModule
} from '../import-module';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, MatIconModule],
      declarations: [ HeaderComponent, MatToolbar, MatToolbarRow ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('mat-icon'));
    htmlElement = debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display playIcon', () => {
    expect(htmlElement.textContent).toEqual('play_circle_filled');
  });

  it('should change change Play Icon', () => {
    const initialValue = component.playIcon;
    component.toggleIcon();
    const newValue = component.playIcon;
    expect(newValue).toEqual('play_circle_outline');
  });

  it('should display user status', () => {
    expect(htmlElement.textContent).toEqual('play_circle_filled');
  });

});
