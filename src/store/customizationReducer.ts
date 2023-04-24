// project imports
import config from "../config";

// action - state management
import * as actionTypes from './actions';

export interface CustomizationState {
    isOpen: string[];
    defaultId: string;
    fontFamily: string;
    borderRadius: any;
    opened: boolean;
}

export const initialState: CustomizationState = {
    isOpen: [], // for active default menu
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (
    state = initialState,
    action: { type: string; opened?: boolean; fontFamily?: string; borderRadius?: string; id?: string }
): CustomizationState => {
    let id: string | undefined;
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id!], // or use non-null assertion operator (!) if you're sure id is not undefined
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened!,
            };
        case actionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily!,
            };
        case actionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius!,
            };
        default:
            return state;
    }
};

export default customizationReducer;
