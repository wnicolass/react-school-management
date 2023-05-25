import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Student from '../pages/Student';
import Students from '../pages/Students';
import Gallery from '../pages/Gallery';
import PageNotFound from '../pages/NotFound';
import MyRoute from './MyRoute';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Students} isClosed={false} />
      <MyRoute exact path="/student/:id/edit" component={Student} isClosed />
      <MyRoute exact path="/student/" component={Student} isClosed />
      <MyRoute exact path="/files/:id" component={Gallery} isClosed />
      <MyRoute exact path="/sign-in/" component={SignIn} isClosed={false} />
      <MyRoute exact path="/sign-up/" component={SignUp} isClosed={false} />
      <MyRoute path="*" component={PageNotFound} />
    </Switch>
  );
}
