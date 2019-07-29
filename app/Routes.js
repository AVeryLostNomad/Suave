import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import LoadingPage from './containers/LoadingPage';
import CounterPage from './containers/CounterPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.LOADING} component={LoadingPage} />
    </Switch>
  </App>
);
