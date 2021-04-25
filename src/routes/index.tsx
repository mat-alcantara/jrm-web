import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import NewCustomer from '../pages/NewCustomer';
import CustomersList from '../pages/CustomersList';
import NewCutlist from '../pages/NewCutlist';
import NewMaterial from '../pages/NewMaterial';

const routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/newcustomer" exact component={NewCustomer} isPrivate />
    <Route path="/newcutlist" exact component={NewCutlist} isPrivate />
    <Route path="/customerslist" exact component={CustomersList} isPrivate />
    <Route path="/newmaterial" exact component={NewMaterial} isPrivate />
  </Switch>
);

export default routes;
