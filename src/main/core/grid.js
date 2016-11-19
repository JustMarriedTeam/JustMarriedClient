import {transform} from "lodash/fp/object";

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
    return transform((result, type) => {
        result[type] = gridMeta[type].minWidth;
    })({})(gridTypes);
}

export function createGridCols() {
    return transform((result, type) => {
        result[type] = gridMeta[type].cols;
    })({})(gridTypes);
}

export function createLayouts(ids) {
    return transform((result, size) => {
        result[size] = generateLayout(ids, size);
        return result;
    })({})(gridTypes);
}

function generateLayout(ids, size) {
    var layout = [];
    for(var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var cols = gridMeta[size].cols;
        layout.push({
            i: id,
            x: i % cols,
            y: Math.floor(i / cols)
        });
    }
    return layout;
}

