import { createStore, Store } from 'redux';
import reducer, { RootState } from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store: Store<RootState> = createStore(reducer);

export default store;
