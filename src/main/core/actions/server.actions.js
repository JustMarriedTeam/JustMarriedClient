export const SENDING_REQUEST = 'SENDING_REQUEST';
export const NOTIFY_REQUEST_FAILED = 'REQUEST_FAILED';

export const sendingRequest = (sending) => ({ type: SENDING_REQUEST, sending });


export const notifyRequestFailed = (sending) => ({ type: NOTIFY_REQUEST_FAILED, sending });
