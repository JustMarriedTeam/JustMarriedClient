export const EDITING_STARTED = 'EDITING_STARTED';
export const EDITING_ENDED = 'EDITING_ENDED';

export const EDITING_FAILED = 'EDITING_FAILED';
export const EDITING_SUCCEEDED = 'EDITING_SUCCEEDED';

export const startEditing = (editedResource) => ({ type: EDITING_STARTED, editedResource });
export const endEditing = (commitMethod) => ({ type: EDITING_ENDED, commitMethod });

export const notifyEditFailed = (failureReason) => ({ type: EDITING_FAILED, failureReason });
export const notifyEditSucceeded = () => ({ type: EDITING_SUCCEEDED });
