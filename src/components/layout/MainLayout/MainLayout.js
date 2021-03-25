import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import PageNav from '../PageNav/PageNav';

const MainLayout = ({ children }) => (
  <div>
    <AppBar>
      <Toolbar>
        <PageNav />
      </Toolbar>
    </AppBar>
    <Toolbar />
    {children}
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
