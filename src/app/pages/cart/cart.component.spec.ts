import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BookService } from 'src/app/services/book.service';
import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Book } from 'src/app/models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

const listCartBook: Book[] = [
  {
    name: 'Book 1',
    author: 'Author 1',
    isbn: 'ISBN 1',
    price: 15,
    amount: 2,
  },
  {
    name: 'Book 2',
    author: 'Author 2',
    isbn: 'ISBN 2',
    price: 20,
    amount: 1,
  },
  {
    name: 'Book 3',
    author: 'Author 3',
    isbn: 'ISBN 3',
    price: 8,
    amount: 7,
  },
];

const MatDialogMock = {
  open() {
    return {
      afterClosed: () => of(true),
    };
  },
};

describe('Cart component', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: BookService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      providers: [
        BookService,
        {
          provide: MatDialog,
          useValue: MatDialogMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(BookService);
    fixture.detectChanges();

    spyOn(service, 'getBooksFromCart').and.returnValue(listCartBook);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create', inject(
  //   [CartComponent],
  //   (testComponent: CartComponent) => {
  //     expect(testComponent).toBeTruthy();
  //   }
  // ));

  it('getTotalPrice returns an amount', () => {
    expect(component.getTotalPrice(listCartBook)).toBeGreaterThan(0);
  });

  it('onInputNumberChange updates the amount PLUS', () => {
    const action1 = 'plus';
    const book = listCartBook[0];

    const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => [
      {
        name: 'Book 1',
        author: 'Author 1',
        isbn: 'ISBN 1',
        price: 15,
        amount: 3,
      },
      {
        name: 'Book 2',
        author: 'Author 2',
        isbn: 'ISBN 2',
        price: 20,
        amount: 1,
      },
      {
        name: 'Book 3',
        author: 'Author 3',
        isbn: 'ISBN 3',
        price: 8,
        amount: 7,
      },
    ]);
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => 121);

    component.onInputNumberChange(action1, book);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('onInputNumberChange updates the amount MINUS', () => {
    const action1 = 'minus';
    const book = listCartBook[0];

    const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => [
      {
        name: 'Book 1',
        author: 'Author 1',
        isbn: 'ISBN 1',
        price: 15,
        amount: 1,
      },
      {
        name: 'Book 2',
        author: 'Author 2',
        isbn: 'ISBN 2',
        price: 20,
        amount: 1,
      },
      {
        name: 'Book 3',
        author: 'Author 3',
        isbn: 'ISBN 3',
        price: 8,
        amount: 7,
      },
    ]);
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => 191);

    component.onInputNumberChange(action1, book);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('onClearBooks works correctl', () => {
    const spy1 = spyOn<any>(component, '_clearListCartBook').and.callThrough();
    const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);

    component.listCartBook = listCartBook;
    component.onClearBooks();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(component.listCartBook).toEqual([]);
  });

  it('onClearBooks has no books', () => {
    component.listCartBook = [];
    component.onClearBooks();

    expect(component.listCartBook).toEqual([]);
  });

  it('The title "The cart is empty" wont be displayed when there are books in the cart', () => {
    component.listCartBook = listCartBook;
    fixture.detectChanges();

    const debugElement: DebugElement = fixture.debugElement.query(
      By.css('#titleCartEmpty')
    );
    expect(debugElement).toBeFalsy();
  });

  it('The title "The cart is empty" will be displayed when there are no books in the cart', () => {
    component.listCartBook = [];
    fixture.detectChanges();

    const debugElement: DebugElement = fixture.debugElement.query(
      By.css('#titleCartEmpty')
    );
    expect(debugElement).toBeTruthy();
    expect(debugElement.nativeElement.textContent).toEqual('The cart is empty');
  });
});
