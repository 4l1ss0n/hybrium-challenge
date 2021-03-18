import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <Route exact path="/dashboard" component={Dashboard} />
    </BrowserRouter>
  );
}