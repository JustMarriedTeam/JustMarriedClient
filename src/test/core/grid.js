import {expect} from "chai";
import {createBreakpoints} from "../../main/core/grid";

describe('grid', () => {

    it('creates breakpoints', () => {
        let breakpoints = createBreakpoints();
        expect(breakpoints).to.be.equal({
            lg: 1200,
            md: 996,
            sm: 768,
            xs: 425,
            xxs: 320
        });
    });

});
