import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios"
import { Provider } from "react-redux"
import { StripeProvider } from 'react-stripe-elements'
import configureStore from './state/store/configureStore'
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import "./i18n"

axios.defaults.baseURL = process.env.REACT_APP_BASEURL

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
      <App />
    </StripeProvider>
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();
