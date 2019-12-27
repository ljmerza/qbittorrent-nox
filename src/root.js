import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import MainLayout from './common/layout/layout.component';

const Root = ({ store }) => (
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Route path="/" component={MainLayout} />
    </MuiPickersUtilsProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
