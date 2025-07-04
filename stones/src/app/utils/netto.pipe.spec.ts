import { NettoPipe } from './netto.pipe';

describe('NettoPipe', () => {
  const pipe = new NettoPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  
  it('calculates netto correctly', () => {
    const price = 214;
    const tax = 7;
    expect(pipe.transform(price, tax, 'netto')).toBe(200);
  });

  it('calculates brutto correctly if type brutto is passed', () => {
    const price = 200;
    const tax = 10;
    expect(pipe.transform(price, tax, 'brutto')).toBeCloseTo(220);
  });
  
  it('calculates netto with tax 16 if no tax and no type is passed', () => {
    const price = 119;
    expect(pipe.transform(price)).toBe(100);
  });
});
