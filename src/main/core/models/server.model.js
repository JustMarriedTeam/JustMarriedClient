import Immutable from 'immutable';


const ServerRecord = Immutable.Record({
  isAwaitingResponse: false,
});

class Server extends ServerRecord {

}

export default Server;
