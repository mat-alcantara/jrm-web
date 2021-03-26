import React from 'react';
import { Switch, Route } from 'react-router-dom';

const routes: React.FC = () => (
  <Switch>
    <Route path="/" exact>
      <h1>Ok</h1>
    </Route>
  </Switch>
);

export default routes;
