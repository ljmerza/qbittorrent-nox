import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(3),
    },
    selected: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
    }
}));

function ListComponent({ selected, items, onChangeSelected, children }) {
    const classes = useStyles();

    return (
        <List component="div">
            {items.map(item => {
                const isSelected = item.id === selected;

                return (
                    <ListItem
                        key={item.id}
                        dense
                        button
                        className={clsx(classes.nested, {
                            [classes.selected]: isSelected
                        })}
                        onClick={() => onChangeSelected(item.id)}
                    >
                        {children ? children(item, isSelected) : <ListItemText primary={item.name} />}
                    </ListItem>
                );
            })}
        </List>
    );
}

ListComponent.propTypes = {
    selected: PropTypes.any,
    items: PropTypes.array.isRequired,
    onChangeSelected: PropTypes.func.isRequired,
};

export default ListComponent;
