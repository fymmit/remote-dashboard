import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { OidcProvider, processSilentRenew } from 'redux-oidc';
import { createBrowserHistory } from 'history';
import './index.css';
import App from './App';
import Callback from './components/Callback';
import Login from './components/Login';
import userManager from './utils/userManager';
import configureStore from './store';

const history = createBrowserHistory();

const store = configureStore(history);

if (window.location.pathname === '/silent_renew') {
  processSilentRenew();
} else {
  ReactDOM.render(
    <Provider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/callback" component={Callback} />
            <Route path="/">
              <div>You are lost.</div>
            </Route>
          </Switch>
        </ConnectedRouter>
      </OidcProvider>
    </Provider>,
    document.getElementById('root')
  );
}
