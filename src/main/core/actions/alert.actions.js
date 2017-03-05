export const ERROR_ALERT_SHOWN = 'ERROR_ALERT_SHOWN';
export const SUCCESS_ALERT_SHOWN = 'SUCCESS_ALERT_SHOWN';
export const INFO_ALERT_SHOWN = 'INFO_ALERT_SHOWN';
export const ALERT_CLEARED = 'ALERT_CLEARED';

export const clearAlert = () => ({ type: ALERT_CLEARED });
export const notifySuccess = (message) => ({ type: SUCCESS_ALERT_SHOWN, message });
export const notifyInfo = (message) => ({ type: INFO_ALERT_SHOWN, message });
export const notifyError = (message) => ({ type: ERROR_ALERT_SHOWN, message });
