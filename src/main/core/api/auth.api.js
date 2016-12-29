import { openInPopup } from '../../utils/popupManager';

const apiUrl = process.env.serverApiUrl;

export const signInViaFacebook = () => openInPopup(`${apiUrl}/auth/facebook`);

export const signInViaGoogle = () => openInPopup(`${apiUrl}/auth/google`);

export const signOut = () =>
    // invalidate token
     Promise.resolve(true);
