import {expect} from "chai";
import {createGridCols, createGridBreakpoints} from "../../main/core/grid";

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

});
