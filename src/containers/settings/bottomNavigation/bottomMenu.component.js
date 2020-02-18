import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import Menu from 'components/menu/menu.component';
import { SECTION_NAMES } from '../sections';

function BottomMenu({ setSettingsTab }) {

    return (
        <Menu>
            {({handleClose, classes}) => (
                <>
                    {Object.values(SECTION_NAMES).map(section => (
                        <Menu.MenuItem 
                            onClick={() => {
                                handleClose();
                                setSettingsTab(section.key);
                            }}
                        >
                            <Typography>{section.name}</Typography>
                            <section.icon classes={{ root: classes.iconRoot }} />
                        </Menu.MenuItem>
                    ))}
                </>
            )}
        </Menu>
    );
}

BottomMenu.propTypes = {
    setSettingsTab: PropTypes.func.isRequired,
};

export default BottomMenu;
