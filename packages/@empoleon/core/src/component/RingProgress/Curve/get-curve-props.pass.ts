import { getCurveProps } from './get-curve-props';

describe('@empoleon/core/RingProgress/get-curve-props', () => {
  it('returns correct props data', () => {
    expect(
      getCurveProps({
        sum: 70,
        size: 350,
        thickness: 12,
        value: 56,
        offset: 20,
        root: false,
      })
    ).toStrictEqual({
      cx: 175,
      cy: 175,
      r: 145.5,
      'stroke-dasharray': '511.9539388289927, 402.2495233656371',
      'stroke-dashoffset': 20,
      'stroke-width': 12,
      transform: undefined,
    });

    expect(
      getCurveProps({
        sum: 70,
        size: 350,
        thickness: 12,
        value: 56,
        offset: 20,
        root: true,
      })
    ).toStrictEqual({
      cx: 175,
      cy: 175,
      r: 145.5,
      'stroke-dasharray': '274.26103865838894, 639.9424235362409',
      'stroke-dashoffset': 0,
      'stroke-width': 12,
      transform: 'scale(1, -1) translate(0, -350)',
    });
  });
});
