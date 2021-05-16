import React from 'react';
import { Switch, Route as RRDRoute } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import NewCustomer from '../pages/NewCustomer';
import CustomersList from '../pages/CustomersList';
import NewCutlist from '../pages/NewCutlist';
import NewMaterial from '../pages/NewMaterial';
import MaterialsList from '../pages/MaterialsList';
import OrdersList from '../pages/OrdersList';
import Dashboard from '../pages/Dashboard';
import MainWebsite from '../pages/MainWebsite';

const routes: React.FC = () => (
  <Switch>
    <RRDRoute path="/" exact component={MainWebsite} />
    <Route path="/signin" exact component={SignIn} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/newcustomer" exact component={NewCustomer} isPrivate />
    <Route path="/newcutlist" exact component={NewCutlist} isPrivate />
    <Route path="/customerslist" exact component={CustomersList} isPrivate />
    <Route path="/newmaterial" exact component={NewMaterial} isPrivate />
    <Route path="/materialslist" exact component={MaterialsList} isPrivate />
    <Route path="/allorders" exact component={OrdersList} isPrivate />
  </Switch>
);

export default routes;
