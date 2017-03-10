import React from 'react';
import Modal from '../models/modal.model';
import {
  MODAL_OPENED,
  MODAL_CLOSED,
} from '../actions/modal.actions';

export default function (modal = new Modal(), action) {
  switch (action.type) {
    case MODAL_OPENED:
      return modal.withMutations((state) => {
        state.set('open', true);
        state.set('title', action.title);
        state.set('content', action.content);
        state.set('actions', action.actions);
      });
    case MODAL_CLOSED:
      return modal.withMutations((state) => {
        state.set('open', false);
        state.set('title', '');
        state.set('content', <div />);
        state.set('actions', <div />);
      });
    default:
      return modal;
  }
}
