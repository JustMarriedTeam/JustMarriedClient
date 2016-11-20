import {expect} from "chai";
import {createGridCols, createGridBreakpoints, createLayouts} from "../../main/core/grid";

describe('grid', () => {

    it('creates breakpoints', () => {
        let breakpoints = createGridBreakpoints();
        expect(breakpoints).to.be.eql({
            lg: 1200,
            md: 996,
            sm: 768,
            xs: 425,
            xxs: 320
        });
    });

    it('creates grid cols', () => {
        let cols = createGridCols();
        expect(cols).to.be.eql({
            lg: 6,
            md: 4,
            sm: 3,
            xs: 2,
            xxs: 1
        });
    });

    it('creates lg layout', () => {
        let layouts = createLayouts([1, 2, 3, 4, 5, 6]);
        expect(layouts.lg).to.be.eql([
            {
                "i": 1,
                "x": 0,
                "y": 0
            },
            {
                "i": 2,
                "x": 1,
                "y": 0
            },
            {
                "i": 3,
                "x": 2,
                "y": 0
            },
            {
                "i": 4,
                "x": 3,
                "y": 0
            },
            {
                "i": 5,
                "x": 4,
                "y": 0
            },
            {
                "i": 6,
                "x": 5,
                "y": 0
            }
        ]);
    });

    it('creates md layout', () => {
        let layouts = createLayouts([1, 2, 3, 4, 5, 6]);
        expect(layouts.md).to.be.eql([
            {
                "i": 1,
                "x": 0,
                "y": 0
            },
            {
                "i": 2,
                "x": 1,
                "y": 0
            },
            {
                "i": 3,
                "x": 2,
                "y": 0
            },
            {
                "i": 4,
                "x": 3,
                "y": 0
            },
            {
                "i": 5,
                "x": 0,
                "y": 1
            },
            {
                "i": 6,
                "x": 1,
                "y": 1
            }
        ]);
    });

    it('creates sm layout', () => {
        let layouts = createLayouts([1, 2, 3, 4, 5, 6]);
        expect(layouts.sm).to.be.eql([
            {
                "i": 1,
                "x": 0,
                "y": 0
            },
            {
                "i": 2,
                "x": 1,
                "y": 0
            },
            {
                "i": 3,
                "x": 2,
                "y": 0
            },
            {
                "i": 4,
                "x": 0,
                "y": 1
            },
            {
                "i": 5,
                "x": 1,
                "y": 1
            },
            {
                "i": 6,
                "x": 2,
                "y": 1
            }
        ]);
    });

    it('creates xs layout', () => {
        let layouts = createLayouts([1, 2, 3, 4, 5, 6]);
        expect(layouts.xs).to.be.eql([
            {
                "i": 1,
                "x": 0,
                "y": 0
            },
            {
                "i": 2,
                "x": 1,
                "y": 0
            },
            {
                "i": 3,
                "x": 0,
                "y": 1
            },
            {
                "i": 4,
                "x": 1,
                "y": 1
            },
            {
                "i": 5,
                "x": 0,
                "y": 2
            },
            {
                "i": 6,
                "x": 1,
                "y": 2
            }
        ]);
    });

});
