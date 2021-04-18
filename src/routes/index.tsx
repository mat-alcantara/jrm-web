import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import CreateCustomer from '../pages/Dashboard/Customers/CreateCustomer';

const routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/newcustomer" exact component={CreateCustomer} isPrivate />
  </Switch>
);

export default routes;
