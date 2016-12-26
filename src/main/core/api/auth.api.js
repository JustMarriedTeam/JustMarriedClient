import { openInPopup } from '../../utils/popupManager';

export const signInViaFacebook = () => openInPopup('http://localhost:2701/api/auth/facebook');

export const signOut = () =>
    // invalidate token
     Promise.resolve(true);
