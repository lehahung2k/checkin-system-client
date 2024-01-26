import { combineReducers, Reducer } from 'redux';

// reducer import
import customizationReducer, { CustomizationState } from './customizationReducer';
import authReducer, {AuthState} from "./authReducer";

// ==============================|| COMBINE REDUCER ||============================== //

export interface RootState {
    customization: CustomizationState;
    auth: AuthState;
}

const reducer: Reducer<RootState> = combineReducers({
    customization: customizationReducer,
    auth: authReducer
});

export default reducer;
