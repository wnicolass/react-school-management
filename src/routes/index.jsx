import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/Sign-in';
import PageNotFound from '../pages/NotFound';
import MyRoute from './MyRoute';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={SignIn} />
      <MyRoute path="*" component={PageNotFound} />
    </Switch>
  );
}
