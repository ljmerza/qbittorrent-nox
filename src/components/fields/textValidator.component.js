import React from 'react';
import PropTypes from 'prop-types';

import Validator from './validator.component';
import Text from './text.component';

function TextValidator({
    name,
    value,
    label,
    onChange,
    onBlur,
    validators,
    errorMessages,
    disableBlurValidation,
    ...restProps
}) {

    return (
        <Validator
            validators={validators}
            errorMessages={errorMessages}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disableBlurValidation={disableBlurValidation}
        >
            <Text {...restProps} />
        </Validator>
    );
}

TextValidator.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    disableBlurValidation: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    errorMessages: PropTypes.array,
    validators: PropTypes.array
};

TextValidator.defaultProps = {
    value: '',
    disabled: false,
    disableBlurValidation: false,
    onBlur: () => { },
    errorMessages: [],
    validators: []
};

export default TextValidator;