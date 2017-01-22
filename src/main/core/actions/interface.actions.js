export const START_EDIT = 'EDIT_STARTED';
export const END_EDIT = 'EDIT_ENDED';

export const startEdit = (menu) => ({ type: START_EDIT, menu });
export const endEdit = (menu) => ({ type: END_EDIT, menu });
