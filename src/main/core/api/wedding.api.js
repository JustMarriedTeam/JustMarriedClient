import Promise from 'bluebird';
import server from '../server';
import store from '../store';
import mapValues from 'lodash/fp/mapValues';
import Immutable from 'immutable';
import { normalizeWedding, denormalizeWedding } from '../normalization/wedding.normalizer';

const unwrapped = mapValues((entity) => entity.toJS());

function getWedding(query) {
  return Promise.resolve(server.get('/wedding', {
    ...query,
  })).then((response) => normalizeWedding(response.data));
}

function putWedding(weddingToPost) {
  const state = store.getState();
  const immutableEntities = new Immutable.Map(state.entities);
  const denormalizedWedding = denormalizeWedding({"id":"58972e823b87a6696c40ab8a","participants":["589f221dec102777aef1687c","589f221dec102777aef1687a","589f221dec102777aef16878","589f221dec102777aef16876"],"guests":["589f221dec102777aef1686e","589f221dec102777aef1686d"],"tasks":["589f221dec102777aef16875","589f221dec102777aef16874","589f221dec102777aef16873","589f221dec102777aef16872","589f221dec102777aef16871","589f221dec102777aef16870","589f221dec102777aef1686f"],"owners":["58972c7e3b87a6696c40ab83"]},
    {"weddings":{"58972e823b87a6696c40ab8a":{"id":"58972e823b87a6696c40ab8a","participants":["589f221dec102777aef1687c","589f221dec102777aef1687a","589f221dec102777aef16878","589f221dec102777aef16876"],"guests":["589f221dec102777aef1686e","589f221dec102777aef1686d"],"tasks":["589f221dec102777aef16875","589f221dec102777aef16874","589f221dec102777aef16873","589f221dec102777aef16872","589f221dec102777aef16871","589f221dec102777aef16870","589f221dec102777aef1686f"],"owners":["58972c7e3b87a6696c40ab83"]}},"guests":{"589f221dec102777aef1686e":{"id":"589f221dec102777aef1686e","firstName":"Mateusz","lastName":"Machowicz"},"589f221dec102777aef1686d":{"id":"589f221dec102777aef1686d","firstName":"Agata","lastName":"Machowicz"}},"participants":{"589f221dec102777aef1687c":{"id":"589f221dec102777aef1687c","user":"589f221dec102777aef1687d","role":"groom","active":true},"589f221dec102777aef1687a":{"id":"589f221dec102777aef1687a","user":"589f221dec102777aef1687b","role":"bride","active":true},"589f221dec102777aef16878":{"id":"589f221dec102777aef16878","user":"589f221dec102777aef16879","role":"bridesmaid","active":false},"589f221dec102777aef16876":{"id":"589f221dec102777aef16876","user":"589f221dec102777aef16877","role":"bestMan","active":false}},"tasks":{"589f221dec102777aef16875":{"description":"Every wedding needs wedding rings!","status":"pending","name":"Buy wedding ring","id":"589f221dec102777aef16875"},"589f221dec102777aef16874":{"description":"Every weeding needs some guests!","status":"pending","name":"Invite guests","id":"589f221dec102777aef16874"},"589f221dec102777aef16873":{"description":"Every wedding needs food!","status":"blocked","name":"Choose food","id":"589f221dec102777aef16873"},"589f221dec102777aef16872":{"description":"Every wedding needs flowers!","status":"pending","name":"Buy flowers","id":"589f221dec102777aef16872"},"589f221dec102777aef16871":{"description":"Every wedding needs invitations!","status":"pending","name":"Create invitations","id":"589f221dec102777aef16871"},"589f221dec102777aef16870":{"description":"Every wedding needs guests to be seated somehow!","status":"blocked","name":"Sit guests","id":"589f221dec102777aef16870"},"589f221dec102777aef1686f":{"description":"Every wedding needs proposal first!","status":"done","name":"Propose","id":"589f221dec102777aef1686f"}},"users":{"589f221dec102777aef1687d":{"id":"589f221dec102777aef1687d","username":"ggurgul","firstName":"Grzegorz","lastName":"Gurgul"},"589f221dec102777aef1687b":{"id":"589f221dec102777aef1687b","username":"anowakiewicz","firstName":"Agata","lastName":"Nowakiewicz"},"589f221dec102777aef16879":{"id":"589f221dec102777aef16879"},"589f221dec102777aef16877":{"id":"589f221dec102777aef16877"},"58972c7e3b87a6696c40ab83":{"id":"58972c7e3b87a6696c40ab83","username":"ggurgul","firstName":"Grzegorz","lastName":"Gurgul"}}});
  return Promise.resolve(server.put('/wedding', denormalizedWedding))
    .then((response) => normalizeWedding(response.data));
}

function postWedding(weddingToPost) {
  const wedding = store.getState().wedding;
  return Promise.resolve(server.post('/wedding', denormalizeWedding(wedding, weddingToPost)))
    .then((response) => normalizeWedding(response.data));
}

export { getWedding, postWedding, putWedding };
