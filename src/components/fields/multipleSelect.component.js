import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
    Checkbox,
    MenuItem,
    InputLabel,
    FormControl,
    OutlinedInput,
    ListItemText,
    Select,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginRight: theme.spacing(1),
        width: `calc(100% - ${theme.spacing(1)}px)`,
    },
}));

function getStyles(currentSelected, selected, theme) {
    return {
        fontWeight:
            selected.indexOf(currentSelected.id) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function MultipleSelect({ value,  label, options, onChange, ...restProps }) {
    const classes = useStyles();
    const theme = useTheme();
    
    // use internal state so we can update this in the UI immediately even though the value hasnt changed
    // yet (it's async) - use effect so when the value DOES change everything is updated accordingly
    const [selectedValue, setSelectValue] = useState(value);
    
    useEffect(() => {
        setSelectValue(selectedValue);
    }, [selectedValue, setSelectValue]);
    
    const onValueChange = ({ target: { value } }) => {
        // setSelectValue(value);
        console.log({ value })
        // onChange(value);
    };
    
    return (
        <FormControl margin='dense' className={classes.formControl}>
            <InputLabel>{label}</InputLabel>
            <Select
                multiple
                value={value}
                onChange={onValueChange}
                input={<OutlinedInput />}
                renderValue={selected => selected.join(', ')}
                {...restProps}
            >
                {options.map(opt => {
                    return (
                        <MenuItem key={opt.id} value={opt.id} style={getStyles(opt, value, theme)}>
                            <Checkbox checked={value.indexOf(opt.id) > -1} />
                            <ListItemText primary={opt.name} />
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}

MultipleSelect.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    value: PropTypes.array,
    options: PropTypes.array,
    onChange: PropTypes.func.isRequired,
};

MultipleSelect.defaultProps = {
    value: [],
    options: [],
};



export default MultipleSelect;