import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthComponent} from './auth.component';
import {
  MatCard, MatFormFieldModule, MatInkBar, MatInputModule, MatRipple, MatSnackBarModule, MatTab,
  MatTabBody, MatTabGroup,
  MatTabHeader,
  MatTabLabel,
  MatTabLabelWrapper
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {PortalModule} from '@angular/cdk/portal';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, PortalModule, HttpClientModule, RouterTestingModule, MatSnackBarModule, MatFormFieldModule
        , MatInputModule, BrowserAnimationsModule],
      declarations: [AuthComponent, MatTab, MatTabGroup, MatCard, MatTabHeader, MatTabBody, MatTabLabel,
        MatTabLabelWrapper, MatRipple, MatInkBar]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
