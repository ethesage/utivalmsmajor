import React from 'react';
import ReactDOM from 'react-dom';
import HttpsRedirect from 'react-https-redirect';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ToastProvider } from 'react-toast-notifications';
import { Provider, useDispatch } from 'react-redux';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import { login } from './g_actions/user';
import './index.scss';

const Appz = () => {
  const dispatch = useDispatch();
  dispatch(login());
  return <App />;
};

ReactDOM.render(
  <HttpsRedirect>
    <Provider store={store}>
      <ToastProvider>
        <ParallaxProvider>
          <Appz />
        </ParallaxProvider>
      </ToastProvider>
    </Provider>
  </HttpsRedirect>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
