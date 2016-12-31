import { expect } from 'chai';
import { createGridCols, createGridBreakpoints, createLayouts } from '../../main/core/grid';

describe('grid', () => {

  it('creates breakpoints', () => {
    const breakpoints = createGridBreakpoints();
    expect(breakpoints).to.be.eql({
      lg: 1200,
      md: 996,
      sm: 768,
      xs: 420,
      xxs: 320,
    });
  });

  it('creates grid cols', () => {
    const cols = createGridCols();
    expect(cols).to.be.eql({
      lg: 6,
      md: 4,
      sm: 3,
      xs: 2,
      xxs: 1,
    });
  });

  it('creates lg layout', () => {
    const layouts = createLayouts([1, 2, 3, 4, 5, 6]);
    expect(layouts.lg).to.be.eql([
      {
        i: '1',
        w: 1,
        h: 1,
        x: 0,
        y: 0,
      },
      {
        i: '2',
        w: 1,
        h: 1,
        x: 1,
        y: 0,
      },
      {
        i: '3',
        w: 1,
        h: 1,
        x: 2,
        y: 0,
      },
      {
        i: '4',
        w: 1,
        h: 1,
        x: 3,
        y: 0,
      },
      {
        i: '5',
        w: 1,
        h: 1,
        x: 4,
        y: 0,
      },
      {
        i: '6',
        w: 1,
        h: 1,
        x: 5,
        y: 0,
      },
    ]);
  });

  it('creates md layout', () => {
    const layouts = createLayouts([1, 2, 3, 4, 5, 6]);
    expect(layouts.md).to.be.eql([
      {
        i: '1',
        w: 1,
        h: 1,
        x: 0,
        y: 0,
      },
      {
        i: '2',
        w: 1,
        h: 1,
        x: 1,
        y: 0,
      },
      {
        i: '3',
        w: 1,
        h: 1,
        x: 2,
        y: 0,
      },
      {
        i: '4',
        w: 1,
        h: 1,
        x: 3,
        y: 0,
      },
      {
        i: '5',
        w: 1,
        h: 1,
        x: 0,
        y: 1,
      },
      {
        i: '6',
        w: 1,
        h: 1,
        x: 1,
        y: 1,
      },
    ]);
  });

  it('creates sm layout', () => {
    const layouts = createLayouts([1, 2, 3, 4, 5, 6]);
    expect(layouts.sm).to.be.eql([
      {
        i: '1',
        w: 1,
        h: 1,
        x: 0,
        y: 0,
      },
      {
        i: '2',
        w: 1,
        h: 1,
        x: 1,
        y: 0,
      },
      {
        i: '3',
        w: 1,
        h: 1,
        x: 2,
        y: 0,
      },
      {
        i: '4',
        w: 1,
        h: 1,
        x: 0,
        y: 1,
      },
      {
        i: '5',
        w: 1,
        h: 1,
        x: 1,
        y: 1,
      },
      {
        i: '6',
        w: 1,
        h: 1,
        x: 2,
        y: 1,
      },
    ]);
  });

  it('creates xs layout', () => {
    const layouts = createLayouts([1, 2, 3, 4, 5, 6]);
    expect(layouts.xs).to.be.eql([
      {
        i: '1',
        w: 1,
        h: 1,
        x: 0,
        y: 0,
      },
      {
        i: '2',
        w: 1,
        h: 1,
        x: 1,
        y: 0,
      },
      {
        i: '3',
        w: 1,
        h: 1,
        x: 0,
        y: 1,
      },
      {
        i: '4',
        w: 1,
        h: 1,
        x: 1,
        y: 1,
      },
      {
        i: '5',
        w: 1,
        h: 1,
        x: 0,
        y: 2,
      },
      {
        i: '6',
        w: 1,
        h: 1,
        x: 1,
        y: 2,
      },
    ]);
  });

  it('creates xxs layout', () => {
    const layouts = createLayouts([1, 2, 3, 4, 5, 6]);
    expect(layouts.xxs).to.be.eql([
      {
        i: '1',
        w: 1,
        h: 1,
        x: 0,
        y: 0,
      },
      {
        i: '2',
        w: 1,
        h: 1,
        x: 0,
        y: 1,
      },
      {
        i: '3',
        w: 1,
        h: 1,
        x: 0,
        y: 2,
      },
      {
        i: '4',
        w: 1,
        h: 1,
        x: 0,
        y: 3,
      },
      {
        i: '5',
        w: 1,
        h: 1,
        x: 0,
        y: 4,
      },
      {
        i: '6',
        w: 1,
        h: 1,
        x: 0,
        y: 5,
      },
    ]);
  });

});
