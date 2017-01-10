import { openInPopup } from '../../utils/popupManager';

const apiUrl = process.env.serverApiUrl;

export const signInViaFacebook = () => openInPopup(`${apiUrl}/auth/facebook.authentication`);

export const bindAccountToFacebook = () => openInPopup(`${apiUrl}/auth/facebook.authorization`);

export const signInViaGoogle = () => openInPopup(`${apiUrl}/auth/google.authentication`);

export const bindAccountToGoogle = () => openInPopup(`${apiUrl}/auth/google.authorization`);

export const signOut = () =>
    // invalidate token
     Promise.resolve(true);
