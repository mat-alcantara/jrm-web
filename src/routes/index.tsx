import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import FormikTutorial from '../pages/FormikTutorial';

const routes: React.FC = () => (
  <Switch>
    {/* <Route path="/" exact>
      <h1>ok</h1>
    </Route> */}
    <Route path="/" exact component={Login} />
    <Route path="/formik" component={FormikTutorial} />
  </Switch>
);

export default routes;
