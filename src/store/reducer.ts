import { combineReducers, Reducer } from 'redux';

// reducer import
import customizationReducer, { CustomizationState } from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

export interface RootState {
    customization: CustomizationState;
}

const reducer: Reducer<RootState> = combineReducers({
    customization: customizationReducer,
});

export default reducer;
