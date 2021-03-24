import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Dashboard from './components/views/Dashboard/Dashboard';
import Kitchen from './components/views/Kitchen/Kitchen';
import Login from './components/views/Login/Login';
import Tables from './components/views/Tables/Tables';
import Waiter from './components/views/Waiter/Waiter';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route exact
            path={process.env.PUBLIC_URL + '/'}
            component={Dashboard} />
          <Route exact path={process.env.PUBLIC_URL + '/kitchen'} component={Kitchen} />
          <Route exact path={process.env.PUBLIC_URL + '/login'} component={Login} />
          <Route exact path={process.env.PUBLIC_URL + '/Tables'} component={Tables} />
          <Route exact path={process.env.PUBLIC_URL + '/Waiter'} component={Waiter} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
