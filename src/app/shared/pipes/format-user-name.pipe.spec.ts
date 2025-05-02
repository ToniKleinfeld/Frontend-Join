import { FormatUserNamePipe } from './format-user-name.pipe';

describe('FormatUserNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatUserNamePipe();
    expect(pipe).toBeTruthy();
  });
});
