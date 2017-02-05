import { openInPopup } from '../../utils/popupManager';
import server from '../server';

const apiUrl = process.env.serverApiUrl;

export const signInViaLocal = (login, password) =>
  Promise.resolve(server.post('/auth/local', {
    login,
    password,
  })).then(response => response.json());

export const bindAccountToLocal = () =>
  Promise.resolve(server.post('/auth/local/bind'))
    .then(response => response.json());

export const signInViaFacebook = () => openInPopup(`${apiUrl}/auth/facebook.authentication`);

export const bindAccountToFacebook = () => openInPopup(`${apiUrl}/auth/facebook.authorization`);

export const signInViaGoogle = () => openInPopup(`${apiUrl}/auth/google.authentication`);

export const bindAccountToGoogle = () => openInPopup(`${apiUrl}/auth/google.authorization`);

export const signOut = () =>
    // invalidate token
     Promise.resolve(true);
