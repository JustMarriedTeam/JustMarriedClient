import React from 'react';
import { DISPLAY_CONTEXT_MENU, DESTROY_CONTEXT_MENU } from '../actions/actionbar.actions';
import ActionBar from '../models/actionbar.model';

export default function (actionBar = new ActionBar(), action) {
  switch (action.type) {
    case DISPLAY_CONTEXT_MENU:
      return actionBar.set('menu', action.menu);
    case DESTROY_CONTEXT_MENU:
      return actionBar.set('menu', <div />);
    default:
      return actionBar;
  }
}
