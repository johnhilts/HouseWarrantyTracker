import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import MainContainer from '../containers/MainContainer';
import Home from '../components/Home';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
import NotFound from '../components/NotFound';

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={Home} />
  		<Route path='register' header='Register' component={RegisterContainer} />
  		<Route path='login' header='Login' component={LoginContainer} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default routes;
