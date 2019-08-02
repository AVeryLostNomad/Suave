import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import LoadingPage from './containers/LoadingPage';
import CounterPage from './containers/CounterPage';
import TestPage from './containers/TestPage';

export default () => (
  <App>
    <Switch>
      <Route exact path={routes.COUNTER} component={CounterPage} />
      <Route exact path={routes.LOADING} component={LoadingPage} />
      <Route exact path={routes.TEST} component={TestPage} />
    </Switch>
  </App>
);
