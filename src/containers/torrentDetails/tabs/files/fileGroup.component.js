import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

import Card from 'components/card.component';
import FileCard from './fileCard.component';

const useStyles = makeStyles(theme => ({
    spacer: {
        marginLeft: theme.spacing(3),
    },
    fullWidth: {
        width: '100%',
    },
    folderContainer: {
        marginBottom: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        marginLeft: theme.spacing(1)
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

const FileGroup = ({ group }) => {
    const classes = useStyles();
    const isRootFolder = !group.folder;

    return (
        <Card>
            {isRootFolder ? null : 
                <Box className={classes.folderContainer}>
                    <FolderOpenIcon />
                    <Typography component="h6" variant="h6" className={classes.title}>{group.folder}</Typography>
                </Box>
            }

            <Box className={clsx(classes.fullWidth, {
                [classes.spacer]: !!group.folder
            })}>

                {group.files.map((file, idx) => (
                    <div key={file.fileName}>
                        {idx === 0 ? null : <Divider className={classes.divider} />}
                        <FileCard file={file} />
                    </div>
                ))}
            </Box>
        </Card>
    );
}

FileGroup.propTypes = {
    group: PropTypes.object.isRequired,
};

export default FileGroup;
