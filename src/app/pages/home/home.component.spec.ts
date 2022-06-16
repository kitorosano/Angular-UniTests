import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { HomeComponent } from './home.component';

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

@Pipe({ name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform {
  transform():string {
    return ''
  }
}

describe('Home component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: BookService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent,ReduceTextPipeMock],
      providers: [BookService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(BookService);
    fixture.detectChanges();
  });

  // beforeAll(() => {});

  // afterEach(() => {});

  // afterAll(() => {});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBook get books from the subscription', () => {
    const spy = spyOn(service, 'getBooks').and.returnValue(of(listCartBook));

    component.getBooks();

    expect(spy).toHaveBeenCalled();
    expect(component.listBook.length).toBe(3);
  });
});
