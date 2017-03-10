export const MODAL_OPENED = 'MODAL_OPENED';
export const MODAL_CLOSED = 'MODAL_CLOSED';

export const openModal = ({ title, content, actions }) =>
  ({ type: MODAL_OPENED, title, content, actions });
export const closeModal = () => ({ type: MODAL_CLOSED });
