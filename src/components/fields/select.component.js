import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';

function SelectField({
    name,
    value,
    options,
    onChange,
    label,
    classes,
    ...restProps
}) {

    // use internal state so we can update this in the UI immediately even though the  value hasnt changed
    // yet (it's async) - use effect so when the value DOES change everything is updated accordingly
    const [selectedValue, setSelectValue] = useState(value)

    useEffect(() => {
        setSelectValue(selectedValue);
    }, [selectedValue, setSelectValue]);

    const onValueChange = ({ target: { value } }) => {
        setSelectValue(value);
        onChange(value);
    };

    return (
        <FormControl variant="outlined" margin='dense' className={classes.formControl} fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                value={selectedValue}
                onChange={onValueChange}
                {...restProps}
        >
                {options.map(opt => <MenuItem key={opt.id} value={opt.id}>{opt.name}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

SelectField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onChange: PropTypes.func
};

SelectField.defaultProps = {
    value: '',
    options: [],
    name: '',
    onChange: () => { },
};

const styles = theme => ({
    formControl: {
        marginRight: theme.spacing(1),
        width: `calc(100% - ${theme.spacing(1)}px)`,
    },
});

export default withStyles(styles, { withTheme: true })(SelectField);