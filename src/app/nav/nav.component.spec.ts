import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

// class ComponentTestRoute {}

const routerMock = {
  navigate: {}
}

describe('Nav component', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule.withRoutes([
        //   { path: 'home', component: ComponentTestRoute },
        //   { path: 'cart', component: ComponentTestRoute },
        // ]),
      ],
      declarations: [NavComponent],
      providers: [{
        provide: Router,
        useValue: routerMock,
      }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should navigte', () => {
  //   const router = TestBed.inject(Router);

  //   const spy = spyOn(router, 'navigate');

  //   component.navTo('home');

  //   expect(spy).toHaveBeenCalledWith(['/home']);
  // });

  it('should navigte', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigate');

    component.navTo('');

    expect(spy).toHaveBeenCalled();
  });
});
