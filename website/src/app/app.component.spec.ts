import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatToolbar, MatToolbarRow} from '@angular/material';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule, MatFormFieldModule, MatInputModule],
      declarations: [AppComponent, HeaderComponent, MatToolbar, MatToolbarRow]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
