export const ERROR_NOTIFICATION_SHOWN = 'ERROR_NOTIFICATION_SHOWN';
export const SUCCESS_NOTIFICATION_SHOWN = 'SUCCESS_NOTIFICATION_SHOWN';
export const NOTIFICATION_CLEARED = 'NOTIFICATION_CLEARED';

export const clearNotification = () => ({ type: NOTIFICATION_CLEARED });
export const notifySuccess = (message) => ({ type: SUCCESS_NOTIFICATION_SHOWN, message });
export const notifyError = (message) => ({ type: ERROR_NOTIFICATION_SHOWN, message });
