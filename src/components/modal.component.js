import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Modal, Backdrop, Fade, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function MyModal({ children, title, submitTitle, onSubmit, onCancel, open, handleClose, classes }) {
    return (
            <Modal 
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
            <Fade in={open}>
                <Card className={classes.card}>
                    <div className={classes.details}>

                        <CardContent className={classes.header}>
                            <Typography gutterBottom variant="h6">
                                {title}
                            </Typography>
                            <div className={classes.close} onClick={handleClose}>
                                <CloseIcon />
                            </div>
                        </CardContent>

                        <CardContent className={classes.body}>
                            {children}
                        </CardContent>

                        <CardActions className={classes.actions}>
                            <Button size="small" color="primary" onClick={onSubmit}>
                                {submitTitle}
                            </Button>
                            <Button size="small" color="primary" onClick={onCancel}>
                                Cancel
                            </Button>
                        </CardActions>
                    </div>
                </Card>
            </Fade>
            </Modal>
    );
}

const styles = theme => ({
    modal: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        margin: theme.spacing(1),
        overflow: 'scroll',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    body: {

    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: theme.spacing(1),
    },
    close: {
        cursor: 'pointer',
    },
});

MyModal.propTypes = {
    children: PropTypes.object.isRequired, 
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    submitTitle: PropTypes.string.isRequired, 
    onSubmit: PropTypes.func.isRequired, 
    onCancel: PropTypes.func.isRequired,
    classes: PropTypes.any.isRequired,
}

export default withStyles(styles)(MyModal);