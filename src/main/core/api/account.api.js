import server from '../server';

export const getAccount = (token) =>
  Promise.resolve(server.get('/accounts', {
    headers: {
      token,
    },
  }))
    .then((response) => response.data);
