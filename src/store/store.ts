import { Store } from 'redux';
import reducer, { RootState } from './reducer/reducer';
import {configureStore} from "@reduxjs/toolkit";

// ==============================|| REDUX - MAIN STORE ||============================== //

const store: Store<RootState> = configureStore({
    reducer: reducer
});

export default store;
