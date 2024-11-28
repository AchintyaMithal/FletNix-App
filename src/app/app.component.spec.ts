import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if the current route is the homepage', () => {
    spyOnProperty(router, 'url').and.returnValue('/');
    expect(component.isLogin()).toBeTrue();
  });

  it('should return false if the current route is not the homepage', () => {
    spyOnProperty(router, 'url').and.returnValue('/about');
    expect(component.isLogin()).toBeFalse();
  });
});
