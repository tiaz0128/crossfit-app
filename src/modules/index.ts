import { combineReducers } from 'redux';

import currentUser from './currentUser';
import loading from './loading';

const rootReducer = combineReducers({
  currentUser,
  loading,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
