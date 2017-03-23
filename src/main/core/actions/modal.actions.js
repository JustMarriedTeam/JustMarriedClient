export const MODAL_OPENED = 'MODAL_OPENED';
export const MODAL_CLOSED = 'MODAL_CLOSED';
export const MODAL_MERGE_CONTEXT = 'MODAL_MERGE_CONTEXT';

export const openModal = ({ context, header, content, footer }) =>
  ({ type: MODAL_OPENED, context, header, content, footer });
export const closeModal = () => ({ type: MODAL_CLOSED });
export const mergeInContext = (context) => ({ type: MODAL_MERGE_CONTEXT, context });
