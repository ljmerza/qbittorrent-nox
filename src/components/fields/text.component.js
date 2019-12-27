import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';

function Text({
    classes,
    hideAdorment,
    disabled,
    name,
    value,
    onChange,
    validatorRef,
    hasValidation,
    inputProps={},
    ...restProps
}) {

    return (
        <TextField
            variant="outlined"
            name={name}
            margin='dense' 
            classes={{
                // if this component is wrapped in a validation component we dont want
                // a bottom margin added because the validation will add it so the
                // margin includes any error messages
                root: hasValidation ? classes.formControlNoMargin : classes.formControl
            }}
            ref={validatorRef}
            value={value}
            disabled={disabled}
            onChange={onChange}
            InputProps={{
                className: classes.input,
                endAdornment: hideAdorment ? null : (
                    <InputAdornment position="end">
                        {value.length && !disabled ? (
                            <IconButton
                                aria-label="clear input"
                                onClick={() => onChange({ target: { name, value: '' } })}
                            >
                                <HighlightOff />
                            </IconButton>
                        ) : (
                                <span className={classes.iconPlaceholder} />
                            )}
                    </InputAdornment>
                ),
                ...inputProps
            }}
            {...restProps}
        />
    );
}

Text.propTypes = {
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    hideAdorment: PropTypes.bool,
    name: PropTypes.string,
    validatorRef: PropTypes.object,
    value: PropTypes.any,
    hasValidation: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onChange: PropTypes.func
};

Text.defaultProps = {
    value: '',
    name: '',
    onChange: () => {},
    validatorRef: React.createRef(),
    disabled: false,
    hideAdorment: false,
    hasValidation: false
};

const styles = theme => ({
    input: {
        paddingRight: 0
    },
    iconPlaceholder: {
        width: '48px',
        height: '1px'
    },
    formControl: {
        marginRight: theme.spacing(1),
        width: `calc(100% - ${theme.spacing(1)}px)`,
        marginBottom: '1.9rem'
    },
    formControlNoMargin: {
        marginBottom: '0rem'
    }
});

export default withStyles(styles, { withTheme: true })(Text);