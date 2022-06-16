import { ReduceTextPipe } from './reduce-text.pipe';

describe('ReduceTextPipe', () => {
  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "Hello World" to "Hello World"', () => {
    const text = 'Hello this is a test tp check the pipe'
    expect(pipe.transform(text, 6)).toBe('Hello ');
  });

});
