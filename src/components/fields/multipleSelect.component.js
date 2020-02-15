import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
    Checkbox,
    MenuItem,
    InputLabel,
    FormControl,
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
    if (currentSelected.noCheckbox) return;
    
    return {
        fontWeight:
            selected.indexOf(currentSelected.id) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function MultipleSelect({ value, name, label, options, onChange, ...restProps }) {
    const classes = useStyles();
    const theme = useTheme();

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    
    // use internal state so we can update this in the UI immediately even though the value hasnt changed
    // yet (it's async) - use effect so when the value DOES change everything is updated accordingly
    const [selectedValue, setSelectValue] = useState(value);

    // if new value has reset flag then we want to empty the selected values
    const resetId = (options.find(opt => opt.isReset) || {}).id;
    
    useEffect(() => {
        setSelectValue(selectedValue);
    }, [selectedValue, setSelectValue]);
    
    const onValueChange = ({ target: { value } }) => {
        const isReset = value.includes(resetId);
        const newValue = isReset ? [] : value;
        setSelectValue(newValue);
        onChange(({ target: { name, value: newValue } }));
    };

    return (
        <FormControl margin='dense' variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel}>{label}</InputLabel>
            <Select
                multiple
                value={selectedValue}
                onChange={onValueChange}
                labelWidth={labelWidth}
                renderValue={selected => selected.join(', ')}
                {...restProps}
            >
                {options.map(opt => {
                    return (
                        <MenuItem key={opt.id} value={opt.id} style={getStyles(opt, selectedValue, theme)}>
                            {opt.isReset ? null : <Checkbox checked={selectedValue.indexOf(opt.id) > -1} />}
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