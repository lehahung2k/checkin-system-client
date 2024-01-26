import Cookies from "js-cookie";

export interface AuthState {
  accessToken: string | undefined;
  user: Record<string, any>;
  isAuthenticated: boolean;
}

interface Action {
  type: string;
  payload: {
    accessToken: string;
    user: Record<string, any>;
  };
}

const storedToken = Cookies.get('accessToken');
const storedUserInfo = Cookies.get('user');

const initialState: AuthState = {
  accessToken: Cookies.get("accessToken"),
  user: storedUserInfo ? JSON.parse(storedUserInfo) : {},
  isAuthenticated: !!storedToken,
};

const authReducer = (
    state: AuthState = initialState,
    action: Action
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        accessToken: undefined,
        user: {},
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
