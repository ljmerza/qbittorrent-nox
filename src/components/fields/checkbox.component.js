import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';

function QbtCheckbox({ onChange, value, label, name }) {
    const handleChange = event => onChange({ target: { name, value: event.target.checked } });

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={handleChange}
                        color="primary"
                    />
                }
                label={label}
            />
        </FormGroup>
    );
}

QbtCheckbox.propTypes = {
    onChange: PropTypes.func.isRequired, 
    value: PropTypes.bool.isRequired, 
    label: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired
}

export default QbtCheckbox;
