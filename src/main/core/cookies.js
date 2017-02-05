import cookie from 'react-cookie';
import { authenticateWithToken } from './actions/account.actions';
import store from './store';

function tryCookieAuthentication() {
  const token = cookie.load('authToken');
  if (token) {
    store.dispatch(authenticateWithToken(token));
  }
}

function storeAuthenticationToken(token) {
  cookie.save('authToken', token);
}

export {
  tryCookieAuthentication,
  storeAuthenticationToken,
};
export default cookie;
