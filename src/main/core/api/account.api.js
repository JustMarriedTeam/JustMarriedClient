import server from '../server';

export const getAccount = () =>
  Promise.resolve(server.get('/accounts'))
    .then((response) => response.data);
