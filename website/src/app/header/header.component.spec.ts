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

  });
  /** Test to create header-component */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /** Test to display correct username in header */
  it('should display actual username in header', () => {
    debugElement = fixture.debugElement.query(By.css('#userText'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toEqual('Sign-In');
  });

  /** Test to display play icon */
  it('should display playIcon', () => {
    debugElement = fixture.debugElement.query(By.css('mat-icon'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toEqual('play_circle_filled');
  });

  /** Test to change play icon */
  it('should change Play Icon on toggle', () => {
    const initialValue = component.playIcon;
    component.toggleIcon();
    const newValue = component.playIcon;
    expect(newValue).toEqual('play_circle_outline');
  });

  /** Test to display account icon */
  it('should display accountIcon', () => {
    debugElement = fixture.debugElement.query(By.css('.profileIcon'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toEqual('account_circle');
  });

  /** Test to display cloud icon */
  it('should display cloudIcon', () => {
    debugElement = fixture.debugElement.query(By.css('.cloudIcon'));
    htmlElement = debugElement.nativeElement;
    expect(htmlElement.textContent).toEqual('cloud');
  });

});
