import cookie from 'react-cookie';

function clearAuthenticationToken() {
  cookie.remove('authToken');
}

function retrieveAuthenticationToken() {
  return cookie.load('authToken');
}

function storeAuthenticationToken(token) {
  cookie.save('authToken', token);
}

export {
  retrieveAuthenticationToken,
  storeAuthenticationToken,
  clearAuthenticationToken,
};
export default cookie;
