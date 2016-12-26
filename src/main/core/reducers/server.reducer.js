import { SENDING_REQUEST } from '../actions/server.actions';
import Server from '../models/server.model';

export default function (server = new Server(), action) {
  switch (action.type) {
    case SENDING_REQUEST:
      return server.set('isAwaitingResponse', action.bool);
    default:
      return server;
  }
}
