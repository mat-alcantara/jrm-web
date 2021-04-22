import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import NewCustomer from '../pages/NewCustomer';
import CustomersList from '../pages/CustomersList';

const routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/newcustomer" exact component={NewCustomer} isPrivate />
    <Route path="/customerslist" exact component={CustomersList} isPrivate />
  </Switch>
);

export default routes;
