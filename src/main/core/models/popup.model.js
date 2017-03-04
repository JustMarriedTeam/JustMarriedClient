import Immutable from 'immutable';

const PopupRecord = new Immutable.Record({
  visible: false,
  title: '',
  content: '',
  role: null,
});

class Popup extends PopupRecord {

}

const POPUP_ROLE = {
  ACKNOWLEDGE: 'ACK',
};

export { POPUP_ROLE };
export default Popup;
