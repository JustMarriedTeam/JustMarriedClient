import Promise from 'bluebird';

function getWedding() {
  return Promise.resolve({
    participants: {
      bride: {
        firstName: 'Grzegorz',
        lastName: 'Gurgul',
        email: 'gurgul.grzegorz@gmail.com',
      },
      groom: {
        firstName: 'Agata',
        lastName: 'Nowakiewicz',
        email: 'agatanowakiewicz@gmail.com',
      },
      bridesmaid: {

      },
      bestMan: {

      },
      motherOfBride: {

      },
      fatherOfBride: {

      },
      motherOfGroom: {

      },
      fatherOfGroom: {

      },
    },
    guests: [
      { id: 'a', firstName: 'Grzegorz', lastName: 'Gurgul', email: 'grzegorz.g@gmail.com' },
      { id: 'b', firstName: 'Agata', lastName: 'Nowakiewicz', email: 'agata.n@gmail.com' },
      { id: 'c', firstName: 'Django', lastName: 'Szynszyl' },
      { id: 'd', firstName: 'Java', lastName: 'Szynszyl' },
      { id: 'e', firstName: 'Java', lastName: 'Szynszyl' },
      { id: 'f', firstName: 'Java', lastName: 'Szynszyl' },
      { id: 'g', firstName: 'Java', lastName: 'Szynszyl' },
      { id: 'h', firstName: 'Java', lastName: 'Szynszyl' },
      { id: 'i', firstName: 'Java', lastName: 'Szynszyl' },
      { id: 'j', firstName: 'Java', lastName: 'Szynszyl' },
      { id: 'k', firstName: 'Java', lastName: 'Szynszyl' },
      { id: 'l', firstName: 'Java', lastName: 'Szynszyl' },
      { id: 'm', firstName: 'Java', lastName: 'Szynszyl' },
      { id: 'n', firstName: 'Java', lastName: 'Szynszyl' },
      { id: 'o', firstName: 'Java', lastName: 'Szynszyl' },
      { id: 'p', firstName: 'Java', lastName: 'Szynszyl' },
    ],
  }).then(response => response);
}

function postWedding(weddingToPost) {
  return Promise.resolve(weddingToPost).then(response => response);
}

export { getWedding, postWedding };
