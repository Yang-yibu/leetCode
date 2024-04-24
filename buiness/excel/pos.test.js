import { pos2txt, txt2pos } from './pos';

describe('单元格坐标转文字', () => {
  it('[0,0]=>A1', () => {
    expect(pos2txt([0, 0])).toBe('A1');
    expect(pos2txt(0, 0)).toBe('A1');
  });
});

describe('单元格文字转坐标', () => {
  it('A1=>[0,0]', () => {
    expect(txt2pos('A1')).toEqual([0, 0]);
    expect(txt2pos('A2')).toEqual([1, 0]);
  });
  it('空=>[0,0]', () => {
    expect(txt2pos()).toEqual([0, 0]);
  });
});
