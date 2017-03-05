export const EDITING_STARTED = 'EDITING_STARTED';
export const EDITING_ENDED = 'EDITING_ENDED';

export const EDITING_FAILED = 'EDITING_FAILED';
export const EDITING_SUCCEEDED = 'EDITING_SUCCEEDED';

export const startEditing = (onEditStarted) => ({ type: EDITING_STARTED, onEditStarted });
export const endEditing = (onEditEnded) => ({ type: EDITING_ENDED, onEditEnded });

export const notifyEditFailed = () => ({ type: EDITING_FAILED });
export const notifyEditSucceeded = () => ({ type: EDITING_SUCCEEDED });
