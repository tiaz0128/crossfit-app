import { combineReducers } from 'redux';
import currentUser from './currentUser';

const rootReducer = combineReducers({
  currentUser,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
