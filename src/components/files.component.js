import React from 'react';
import PropTypes from 'prop-types';

import {
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Box,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

function UploadedFiles({ onDeleteFile, classes, files }) {
    return (
        <Box border={1} className={classes.files}>
            <List>
                {files.map(file => {
                    return (
                        <div key={file.name}>
                            <ListItem>
                                <ListItemText primary={file.name} />
                                <ListItemSecondaryAction>
                                    <IconButton className={classes.removeFile} onClick={() => onDeleteFile(file)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </div>
                    );
                })}
            </List>
        </Box>
    );
}

const styles = theme => ({
    removeFile: {
        color: theme.palette.error.main
    },
    files: {
        width: 'calc(100% - 8px)',
        borderRadius: '4px',
        border: `1px solid ${theme.palette.text.hint}`,
    },
});

UploadedFiles.propTypes = {
    files: PropTypes.array.isRequired,
    onDeleteFile: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(UploadedFiles);