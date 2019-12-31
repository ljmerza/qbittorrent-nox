import React, { useState } from 'react';
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

const TextSave = ({ classes, name, value, disabled, onSave, ...props }) => {

    // some files have folders in the file name - we want the whole folder path as
    // start adorment and the file name itself as the actual input value
    let folders = value.split('/');
    const fileName = folders.shift();
    const startAdorment = folders.join('/');

    const [val, setVal] = useState(fileName);
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
    disabled: PropTypes.bool, 
    onSave: PropTypes.func.isRequired
};

export default withStyles(styles)(TextSave);
