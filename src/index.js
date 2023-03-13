import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { ContextProvider } from "./context/Context"
import { Provider } from 'react-redux';
import store from './store';

setTimeout(() => {
  localStorage.clear();
  window.location.replace("/")
}, 300000)

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
      <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

