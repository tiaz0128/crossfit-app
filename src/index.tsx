import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';
import { loginUser, logoutUser } from './modules/currentUser';
import { auth } from './api/firebase';
import { User } from 'firebase/auth';
import { loadingEnd } from './modules/loading';
import { sleep } from './util/loading';
import { getCurrentUserUidLocalStorage } from './util/storage';

const store = createStore(rootReducer);

function lazyLoading() {
  sleep(() => {
    store.dispatch(loadingEnd());
  }, 400);
}
const initUid = getCurrentUserUidLocalStorage();
initUid && store.dispatch(loginUser({ uid: initUid } as User));

const unSub = auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(loginUser(user));
    lazyLoading();
  } else {
    store.dispatch(logoutUser());
    lazyLoading();
  }
});

unSub();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
