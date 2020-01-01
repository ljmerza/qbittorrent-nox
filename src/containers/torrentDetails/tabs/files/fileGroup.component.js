import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Virtuoso } from 'react-virtuoso';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

import { BOTTOM_NAV_HEIGHT } from 'components/bottomNavigation';
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
                {/* if more than 50 files then use virtual list */}
                {group.files.length > 25 ? (
                    <Virtuoso
                        style={{ height: `calc(100vh - ${BOTTOM_NAV_HEIGHT}px)` }}
                        totalCount={group.files.length}
                        item={idx => {
                            const file = group.files[idx];
                            return (
                                <>
                                    {idx === 0 ? null : <Divider className={classes.divider} />}
                                    <FileCard file={file} />
                                </>
                            )
                        }}
                    />
                ) : (
                    <>
                        {group.files.map((file, idx) => {
                            return (
                                <div key={file.fileId}>
                                    {idx === 0 ? null : <Divider className={classes.divider} />}
                                    <FileCard file={file} />
                                </div>
                            );

                        })}
                    </>
                )}
            </Box>
        </Card>
    );
}

FileGroup.propTypes = {
    group: PropTypes.object.isRequired,
};

export default FileGroup;
