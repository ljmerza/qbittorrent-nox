import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';

import { FormControl } from '@material-ui/core';

function FileSelector({ onChange, name, label, classes, ...rest }) {
    const onDrop = useCallback(files => onChange({ target: { name, value: files } }), [onChange, name]);

    return (
        <Dropzone className={classes.dropzone} onDrop={onDrop} {...rest}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                    <FormControl variant='outlined' className={classes.controlRoot}>
                        <input {...getInputProps()} />
                        Select or drag and drop {label}
                    </FormControl>
                </div>
            )}
        </Dropzone>
    );
}

FileSelector.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const styles = theme => ({
    dropzone: {
        cursor: 'pointer !important',
        '&:focus': {
            outline: 'none !important',
        },
    },
    controlRoot: {
        cursor: 'pointer !important',
        padding: '2rem',
        border: `1px solid ${theme.palette.text.hint}`,
        width: 'calc(100% - 8px)',
        marginTop: '8px',
        borderRadius: '4px',
        textAlign: 'center',
        '&:focus': {
            outline: 'none !important',
        },
    }
});


export default withStyles(styles)(FileSelector);
