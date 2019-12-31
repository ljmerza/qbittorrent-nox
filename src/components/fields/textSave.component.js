import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { IconButton, InputAdornment } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import Text from './text.component';

const styles = theme => ({
    iconPlaceholder: {
        width: '48px',
        height: '1px'
    },

});

const TextSave = ({ classes, startAdorment, name, value, disabled, onSave, ...props }) => {

    // use internal state so we can update this in the UI immediately even though the value hasnt changed
    // yet (it's async) - use effect so when the value DOES change everything is updated accordingly
    const [val, setVal] = useState(value);

    useEffect(() => {
        setVal(value);
    }, [value, setVal]);

    const onChangeVal = ({ target: { value } }) => setVal(value);

    const onClick = () => onSave({ target: { name, value: val } });
    const showButton = val.length && val !== value && !disabled;

    return (
        <Text
            name={name}
            value={val}
            disabled={disabled}
            onChange={onChangeVal}
            emptyValue
            inputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {showButton ? (
                            <IconButton onClick={onClick}>
                                <SaveIcon />
                            </IconButton>
                        ) : (
                            <span className={classes.iconPlaceholder} />
                        )}
                    </InputAdornment>
                ),
                startAdornment: !startAdorment ? null : (
                    <InputAdornment position="start">
                        {`${startAdorment}/`}
                    </InputAdornment>
                ),
            }}

            {...props}
        />
    )
}


TextSave.propTypes = {
    classes: PropTypes.object.isRequired, 
    name: PropTypes.string, 
    value: PropTypes.string,
    startAdorment: PropTypes.any, 
    disabled: PropTypes.bool, 
    onSave: PropTypes.func.isRequired
};

export default withStyles(styles)(TextSave);
