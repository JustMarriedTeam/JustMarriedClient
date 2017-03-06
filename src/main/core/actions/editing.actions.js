export const EDITS_STARTED = 'EDITS_STARTED';
export const EDITS_CANCELLED = 'EDITS_CANCELLED';
export const EDITS_SUBMITTED = 'EDITS_SUBMITTED';

export const EDITING_FAILED = 'EDITING_FAILED';
export const EDITING_SUCCEEDED = 'EDITING_SUCCEEDED';

export const startEdits = (onEditsStarted) => ({ type: EDITS_STARTED, onEditsStarted });
export const submitEdits = (onEditsSubmitted) => ({ type: EDITS_SUBMITTED, onEditsSubmitted });
export const cancelEdits = (onEditsCancelled) => ({ type: EDITS_CANCELLED, onEditsCancelled });

export const notifyEditFailed = () => ({ type: EDITING_FAILED });
export const notifyEditSucceeded = () => ({ type: EDITING_SUCCEEDED });
