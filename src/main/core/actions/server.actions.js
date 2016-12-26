export const SENDING_REQUEST = 'SENDING_REQUEST';
export const NOTIFY_REQUEST_FAILED = 'REQUEST_FAILED';

export const sendingRequest = (bool) => ({ type: SENDING_REQUEST, bool });

export const notifyRequestFailed = (string) => ({ type: NOTIFY_REQUEST_FAILED, string });
