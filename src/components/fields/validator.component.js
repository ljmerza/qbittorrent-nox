import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { ValidatorComponent } from 'react-material-ui-form-validator';
import { FormHelperText, withStyles } from '@material-ui/core';

const renderRequiredLabel = label => (
    <span>
        {label}
        <span>&thinsp;*</span>
    </span>
);

class CustomValidator extends ValidatorComponent {
    state = {
        isDirty: false
    };

    handleChange = event => {
        this.setState({ isDirty: true });
        this.props.onChange(event);
    };

    handleBlur = event => {
        if (!this.props.disableBlurValidation) this.validate(event.target.value);
        this.props.onBlur(event, this.state.isDirty);
    };

    renderLabel = label =>
        this.props.validators.includes('required') ? renderRequiredLabel(label) : label;

    render() {
        const {
            children,
            label,
            onChange,
            onBlur,
            classes,
            errorMessages,
            validators,
            requiredError,
            validatorListener,
            disableBlurValidation,
            ...rest
        } = this.props;

        const { isValid } = this.state;
        const renderedLabel = this.renderLabel(label);

        return (
            <div className={classes.formControl}>
                {Children.map(children, child =>
                    cloneElement(child, {
                        label: renderedLabel,
                        ...rest,
                        onChange: this.handleChange,
                        onBlur: this.handleBlur,
                        ref: this.validatorRef,
                        hasValidation: true
                    })
                )}
                {isValid !== undefined && !isValid && (
                    <FormHelperText classes={{ root: classes.helperText }} error>
                        <span>{this.getErrorMessage()}</span>
                    </FormHelperText>
                )}
            </div>
        );
    }
}

CustomValidator.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    disableBlurValidation: PropTypes.bool
};

CustomValidator.defaultProps = {
    value: null,
    validatorListener: () => { },
    disableBlurValidation: false
};

const styles = () => ({
    formControl: {
        marginBottom: '1.5rem'
    },
    helperText: {
        margin: '8px 14px 0' // copied from MuiFormHelperText to match build in validation error spacing
    }
});

export default withStyles(styles)(CustomValidator);