import Immutable from 'immutable';
import React from 'react';

const ModalRecord = new Immutable.Record({
  title: '',
  actions: <div />,
  open: false,
});

class Modal extends ModalRecord {

}

export default Modal;
