import { setCurrentUserUidLocalStorage } from './../util/storage';
import { User } from 'firebase/auth';

export type CurrentUser = User | null;

const LOGIN_USER = 'currentUser/LOGIN_USER' as const;
const LOGOUT_USER = 'currentUser/LOGOUT_USER' as const;

export const loginUser = (user: User) => ({ type: LOGIN_USER, user });
export const logoutUser = () => ({ type: LOGOUT_USER });

export const loginUserThunk =
  (user: User): any =>
  (dispatch: any) => {
    setCurrentUserUidLocalStorage(user.uid);
    dispatch({ type: LOGIN_USER, user });
  };

export const logoutUserThunk = (): any => (dispatch: any) => {
  setCurrentUserUidLocalStorage('');
  dispatch({ type: LOGOUT_USER });
};

type CurrentUserAction = ReturnType<typeof loginUserThunk> | ReturnType<typeof logoutUser>;

const initialState = null;

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function currentUser(state: CurrentUser = initialState, action: CurrentUserAction) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...action.user };
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
