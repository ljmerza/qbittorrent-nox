import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation } from '@material-ui/core';

export const BOTTOM_NAV_HEIGHT = 56;

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
    },
    spacer: {
        height: BOTTOM_NAV_HEIGHT,
        width: '100%',
    },
});

function BottomNavigationComponent({ children }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <>
            {/* add spacing so elements above arent hidden behind fixed BottomNavigation */}
            <div className={classes.spacer}></div>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                showLabels
                className={classes.root}
            >
                {children}

            </BottomNavigation>
        </>
    );
}

BottomNavigationComponent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BottomNavigationComponent;

