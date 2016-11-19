import _ from "lodash/fp";

export const gridTypes = ['lg','md','sm','xs','xxs'];
export const gridMeta = {
    lg: {
        minWidth: 1200,
        cols: 6
    },
    md: {
        minWidth: 996,
        cols: 4
    },
    sm: {
        minWidth: 768,
        cols: 3
    },
    xs: {
        minWidth: 425,
        cols: 2
    },
    xxs: {
        minWidth: 320,
        cols: 1
    }
};
export function createGridBreakpoints() {
    return _.transform((result, type) => { return result[type] = gridMeta[type].minWidth })(gridTypes);
}
export function createGridCols() {
    return _.transform((result, type) => { return result[type] = gridMeta[type].cols })(gridTypes);
}

