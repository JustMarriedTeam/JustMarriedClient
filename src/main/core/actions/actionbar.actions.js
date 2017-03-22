export const DISPLAY_CONTEXT_MENU = 'DISPLAY_CONTEXT_MENU';
export const DESTROY_CONTEXT_MENU = 'DESTROY_CONTEXT_MENU';

export const displayContextMenu = (menu) => ({ type: DISPLAY_CONTEXT_MENU, menu });
export const destroyContextMenu = (menu) => ({ type: DESTROY_CONTEXT_MENU, menu });
