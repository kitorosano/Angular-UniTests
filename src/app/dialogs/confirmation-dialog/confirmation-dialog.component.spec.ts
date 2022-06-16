import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirmation-dialog.component';

const MatDialogRefMock = {
  close: (bool: boolean) => {},
};

describe('Confirm dialog component', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ConfirmDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: MatDialogRefMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onDismiss should close dialog', () => {
    const service = TestBed.inject(MatDialogRef);
    const spy = spyOn(service, 'close');
    component.onDismiss();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('onConfirm should close dialog with true', () => {
    const service = TestBed.inject(MatDialogRef);
    const spy = spyOn(service, 'close');
    component.onConfirm();
    expect(spy).toHaveBeenCalledWith(true);
  });
});
