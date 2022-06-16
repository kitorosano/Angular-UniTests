import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { BookService } from './book.service';
import swal from 'sweetalert2';

describe('Book Service', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  let storage = {} as any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookService],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);

    storage = {} as any;
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        storage[key] = value;
      }
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBooks should return list of books and does a get method', () => {
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

    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(listCartBook);
    });

    const req = httpMock.expectOne(`${environment.API_REST_URL}/book`);
    expect(req.request.method).toBe('GET');

    req.flush(listCartBook);
  });

  it('getBooksFromCart should return empty array if localStorage is empty', () => {
    const listCartBook: Book[] = service.getBooksFromCart();
    expect(listCartBook).toEqual([]);
  });

  it('removeBooksFromCart should remove all books from localStorage', () => {
    service.addBookToCart({
      name: 'Book 1',
      author: 'Author 1',
      isbn: 'ISBN 1',
      price: 15,
    });
    expect(service.getBooksFromCart().length).toBe(1);

    service.removeBooksFromCart();
    expect(service.getBooksFromCart()).toEqual([]);
  });

  it('addBookToCart should add book to localStorage', () => {
    const toast = { fire: () => null } as any;
    const spy = spyOn(swal, 'mixin').and.callFake(() => toast);

    const book: Book = {
      name: 'Book 1',
      author: 'Author 1',
      isbn: 'ISBN 1',
      price: 15,
    };

    let listCartBook: Book[] = service.getBooksFromCart();
    expect(listCartBook.length).toBe(0);

    service.addBookToCart(book);

    listCartBook = service.getBooksFromCart();
    expect(listCartBook.length).toBe(1);

    expect(spy).toHaveBeenCalled();
  });

  it('updateAmountBook should update amount book in localStorage if amount>0', () => {
    const book: Book = {
      name: 'Book 1',
      author: 'Author 1',
      isbn: 'ISBN 1',
      price: 15
    }

    service.addBookToCart(book);
    expect(service.getBooksFromCart().length).toBe(1);
    expect(service.getBooksFromCart()[0].amount).toBe(1);

    service.updateAmountBook({...book, amount: 4});
    expect(service.getBooksFromCart().length).toBe(1);
    expect(service.getBooksFromCart()[0].amount).toBe(4);
  });

  it('updateAmountBook should update amount book in localStorage if amount=0', () => {
    const book: Book = {
      name: 'Book 1',
      author: 'Author 1',
      isbn: 'ISBN 1',
      price: 15
    }

    service.addBookToCart(book);
    expect(service.getBooksFromCart().length).toBe(1);
    expect(service.getBooksFromCart()[0].amount).toBe(1);

    service.updateAmountBook({...book, amount: 0});
    expect(service.getBooksFromCart().length).toBe(0);
  });
});
