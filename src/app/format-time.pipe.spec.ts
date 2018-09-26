import { FormatTimePipe } from './format-time.pipe';

describe('FormatTimePipe', () => {
  it('pipes time into the correct format', () => {
    const pipe = new FormatTimePipe();
    const seconds = 11700;
    expect(pipe.transform(seconds)).toEqual('03:15:00');
  });
});
