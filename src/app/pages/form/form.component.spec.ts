import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';

describe('Form component', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [FormComponent],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('name field is required', () => {
    const name = component.form.get('name')!;
    name.setValue('');
    expect(name.valid).toBeFalsy();
  });

  it('name field has an error when 5 or more characters', () => {
    const name = component.form.get('name')!;
    name.setValue('test name');
    expect(name.valid).toBeFalsy();
  });

  it('name field is correct when lees than 5 characters', () => {
    const name = component.form.get('name')!;
    name.setValue('test');
    expect(name.valid).toBeTruthy();
  });

  it('email field is required', () => {
    const email = component.form.get('email')!;
    email.setValue('');
    expect(email.valid).toBeFalsy();
  });

  it('email field must be valid', () => {
    const email = component.form.get('email')!;

    email.setValue('2123.com');
    expect(email.valid).toBeFalsy();

    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });

  it('should call onSave when form is valid', () => {
    const spy = spyOn(component, 'onSave');

    component.form.get('name')!.setValue('test');
    component.form.get('email')!.setValue('test@test.com');
    
    component.onSave();
    expect(spy).toHaveBeenCalled();
  });
});
