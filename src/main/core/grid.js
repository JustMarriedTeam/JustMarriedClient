import { transform } from 'lodash/fp/object';

export const gridTypes = ['lg', 'md', 'sm', 'xs'];
export const gridMeta = {
  lg: {
    minWidth: 1200 - 1,
    cols: 6,
  },
  md: {
    minWidth: 996 - 1,
    cols: 4,
  },
  sm: {
    minWidth: 768 - 1,
    cols: 2,
  },
  xs: {
    minWidth: 420 - 1,
    cols: 1,
  },
};

function generateLayout(ids, size) {
  const layout = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const cols = gridMeta[size].cols;
    layout.push({
      i: `${id}`,
      x: i % cols,
      y: Math.floor(i / cols),
      w: 1,
      h: 1,
    });
  }
  return layout;
}

/* eslint-disable */
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
/* eslint-enable */
