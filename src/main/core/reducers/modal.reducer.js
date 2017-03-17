import React from 'react';
import Modal from '../models/modal.model';
import {
  MODAL_OPENED,
  MODAL_CLOSED,
  MODAL_MERGE_CONTEXT,
} from '../actions/modal.actions';

import merge from 'lodash/merge';

export default function (modal = new Modal(), action) {
  switch (action.type) {
    case MODAL_OPENED:
      return modal.withMutations((state) => {
        state.set('open', true);
        state.set('context', action.context);
        state.set('header', action.header);
        state.set('content', action.content);
        state.set('footer', action.footer);
      });
    case MODAL_MERGE_CONTEXT:
      return modal.update('context',
        (oldContext) => merge({}, oldContext, action.context));
    case MODAL_CLOSED:
      return modal.withMutations((state) => {
        state.set('open', false);
        state.set('context', {});
        state.set('header', <div />);
        state.set('content', <div />);
        state.set('footer', <div />);
      });
    default:
      return modal;
  }
}
