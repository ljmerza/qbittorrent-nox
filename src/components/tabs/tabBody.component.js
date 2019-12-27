import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

function TabBody({ children }) {
    return <Box>{children}</Box>;
}

TabBody.propTypes = {
    children: PropTypes.object.isRequired
};

export default TabBody;