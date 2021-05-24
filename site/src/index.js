import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import { Provider, useDispatch } from 'react-redux';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import { login } from './g_actions/user';
import './index.scss';
import './tailwind.scss';

const Appz = () => {
  const dispatch = useDispatch();
  dispatch(login());
  return <App />;
};

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <Appz />
    </ToastProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
