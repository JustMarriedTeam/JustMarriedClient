import Immutable from 'immutable';

const ServerRecord = new Immutable.Record({
  isAwaitingResponse: false,
});

class Server extends ServerRecord {

}

export default Server;
