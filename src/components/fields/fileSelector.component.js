import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';

import { Card, CardContent, Typography } from '@material-ui/core';

function FileSelector({ onChange, name, label, ...rest }) {
    const onDrop = useCallback(files => onChange({ target: { name, value: files } }), [onChange]);

    return (
        <Dropzone onDrop={onDrop} {...rest}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                    <Card variant="outlined" dense>
                        <CardContent>
                            <input {...getInputProps()} />
                            Select {label}
                        </CardContent>
                    </Card>
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
});


export default withStyles(styles)(FileSelector);
