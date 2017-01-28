export const EDITING_STARTED = 'EDITING_STARTED';
export const EDITING_ENDED = 'EDITING_ENDED';

export const EDITING_FAILED = 'EDIT_ENDED';
export const EDITING_SUCCEEDED = 'EDITING_SUCCEEDED';

export const startEditing = (editedResource) => ({ type: EDITING_STARTED, editedResource });
export const endEditing = (savingMethod) => ({ type: EDITING_ENDED, savingMethod });

export const notifyEditFailed = (failureReason) => ({ type: EDITING_FAILED, failureReason });
export const notifyEditSucceeded = () => ({ type: EDITING_SUCCEEDED });
