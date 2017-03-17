import Immutable from 'immutable';
import React from 'react';

const ModalRecord = new Immutable.Record({
  header: <div />,
  content: <div />,
  footer: <div />,
  open: false,

  /**
   * Map to store all things to share among header, content and a footer.
   * Properties passed on to particular items are static in general and changing
   * them won't make React re-render as opposed to changing anything in this object.
   */
  context: {},
});

class Modal extends ModalRecord {

}

export default Modal;
