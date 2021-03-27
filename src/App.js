import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Dashboard from './components/views/Dashboard/Dashboard';
import Kitchen from './components/views/Kitchen/Kitchen';
import Login from './components/views/Login/Login';
import Tables from './components/views/Tables/Tables';
import Waiter from './components/views/Waiter/Waiter';
import NotFound from './components/views/NotFound/NotFound';
import BookingNew from './components/views/BookingNew/BookingNew';
import Booking from './components/views/Booking/Booking';
import Event from './components/views/Event/Event';
import EventNew from './components/views/EventNew/EventNew';
import OrderNew from './components/views/OrderNew/OrderNew';
import Order from './components/views/Order/Order';

import { StylesProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2b4c6f',
    },
    /*secondary: {
      main: '#11cb5f',
    },*/
  },
});

function App() {
  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Switch>
              <Route exact path={process.env.PUBLIC_URL + '/'} component={Dashboard} />
              <Route exact path={process.env.PUBLIC_URL + '/kitchen'} component={Kitchen} />
              <Route exact path={process.env.PUBLIC_URL + '/login'} component={Login} />
              <Route exact path={process.env.PUBLIC_URL + '/Tables'} component={Tables} />
              <Route exact path={process.env.PUBLIC_URL + '/Tables/booking/:id'} component={Booking} />
              <Route exact path={process.env.PUBLIC_URL + '/Tables/booking/new'} component={BookingNew} />
              <Route exact path={process.env.PUBLIC_URL + '/Tables/events/:id'} component={Event} />
              <Route exact path={process.env.PUBLIC_URL + '/Tables/events/new'} component={EventNew} />
              <Route exact path={process.env.PUBLIC_URL + '/Waiter'} component={Waiter} />
              <Route exact path={process.env.PUBLIC_URL + '/Waiter/order/:id'} component={Order} />
              <Route exact path={process.env.PUBLIC_URL + '/Waiter/order/new'} component={OrderNew} />
              <Route path='*' component={NotFound} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
}

export default App;
