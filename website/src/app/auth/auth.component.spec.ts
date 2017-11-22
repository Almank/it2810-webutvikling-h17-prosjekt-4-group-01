import {async, ComponentFixture, TestBed, AuthComponent, MatCard, MatFormFieldModule, MatInkBar, MatInputModule,
  MatRipple, MatSnackBarModule, MatTab, MatTabBody, MatTabGroup, MatTabHeader, MatTabLabel, MatTabLabelWrapper,
  FormsModule, PortalModule, HttpClientModule, RouterTestingModule, BrowserAnimationsModule,
  MatSnackBar } from '../import-module';
import {AuthenticationService} from './auth.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { inject } from '@angular/core/testing';
import {OverlayContainer} from '@angular/cdk/overlay';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let snackBar: MatSnackBar;
  let overlayContainer: OverlayContainer;
  let overlayContainerEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, PortalModule, HttpClientModule, RouterTestingModule, MatSnackBarModule, MatFormFieldModule
        , MatInputModule, BrowserAnimationsModule],
      declarations: [AuthComponent, MatTab, MatTabGroup, MatCard, MatTabHeader, MatTabBody, MatTabLabel,
        MatTabLabelWrapper, MatRipple, MatInkBar],
      providers: [{provide: AuthenticationService}]
    }).compileComponents();
  }));

  beforeEach(inject([MatSnackBar, OverlayContainer], (msb: MatSnackBar, overContainer: OverlayContainer) => {
    snackBar = msb;
    overlayContainer = overContainer;
    overlayContainerEl = overContainer.getContainerElement();
    let debugElement: DebugElement;
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test display username and password
  it('should display username and password', () => {
    let debugElement: DebugElement[];
    debugElement = fixture.debugElement.queryAll(By.css('.field label'));
    for (let i = 0; i < debugElement.length; i++) {
      htmlElement = debugElement[i].nativeElement;
      expect(['Username', 'Password']).toContain(htmlElement.textContent);
    }
  });

  // Test display login and register
  it('should display login and register', () => {
    let debugElement: DebugElement[];
    debugElement = fixture.debugElement.queryAll(By.css('.save-button'));
    for (let i = 0; i < debugElement.length; i++) {
      htmlElement = debugElement[i].nativeElement;
      expect(['Login', 'Register']).toContain(htmlElement.textContent);
    }
  });

  // Test error pop up.
  it('should show error pop up', () => {
    component.onUserError('alert', 'test error', true);
    snackBar.open('alert');
    let containerEl = overlayContainerEl.querySelector('snack-bar-container')!;
    expect(containerEl.getAttribute('role')).toBe('alert');
  });
});
