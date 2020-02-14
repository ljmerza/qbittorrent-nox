import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import { FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Container } from 'components/grid.component';
import UploadedFiles from 'components/files.component';


function FileSelector({ name, label, value, onChange, classes }) {
    const onDrop = files => onChange({ target: { name, value: files } });

    const onDeleteFile = file => {
        const newFiles = value.filter(f => f !== file);
        onChange({ target: { name, value: newFiles } });
    };

    return (
        <>
            <Dropzone className={classes.dropzone} onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <FormControl variant='outlined' className={classes.controlRoot}>
                            <input {...getInputProps()} />
                            Select or drag and drop {label}
                        </FormControl>
                    </div>
                )}
            </Dropzone>

            {value.length === 0 ? null : (
                <Container className={classes.uploadedFiles}>
                    <UploadedFiles files={value} onDeleteFile={onDeleteFile} />
                </Container>
            )}
        </>
    );
}

FileSelector.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
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
    },
    uploadedFiles: {
        marginTop: theme.spacing(3),
        marginBottm: theme.spacing(3),
    }
});


export default withStyles(styles)(FileSelector);
