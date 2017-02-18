import store from '../store';
import { fetchWedding } from '../actions/wedding.actions';

const onEnterWedding = () => store.dispatch(fetchWedding());

export { onEnterWedding };

