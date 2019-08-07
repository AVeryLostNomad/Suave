import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import Root from './containers/Root';
import AppComponent from './containers/AppComponent';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();

render(
  <AppContainer>
    {/* <Root store={store} history={history} /> */}
    <AppComponent />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/AppComponent', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/AppComponent').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
