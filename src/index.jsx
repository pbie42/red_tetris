import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import Root from 'client/components/Root';
import App from 'client/components/App';

ReactDOM.render(
  <Root>
    <HashRouter hashType="noslash">
      <Route path="/" component={App} />
    </HashRouter>
  </Root>,
  document.querySelector('#root'),
);
