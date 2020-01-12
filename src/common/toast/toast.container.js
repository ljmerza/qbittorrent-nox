import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import clsx from 'clsx';

import { Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';

import { toastActions, TOAST_TYPES } from './toast.reducer';

class Toast extends PureComponent {
    hideToast = () => this.props.hideToast();

    render() {
        const { classes, toastType, toastMessage, showToast } = this.props;
        console.log({ toastType, toastMessage, showToast })
        
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={showToast}
                onClose={this.hideToast}
                ContentProps={{
                    className: clsx(
                        { [classes.error]: toastType === TOAST_TYPES.ERROR },
                        { [classes.warning]: toastType === TOAST_TYPES.WARNING },
                        { [classes.success]: toastType === TOAST_TYPES.SUCCESS }
                    )
                }}
                message={toastMessage}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.hideToast}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        );
    }
}

const styles = theme => ({
    error: {
        backgroundColor: theme.palette.error.main
    },
    warning: {
        backgroundColor: amber[700]
    },
    success: {
        backgroundColor: theme.palette.primary.main
    }
});

Toast.propTypes = {
    classes: PropTypes.object.isRequired,
    toastType: PropTypes.oneOf(Object.values(TOAST_TYPES)),
    toastMessage: PropTypes.string.isRequired,
    showToast: PropTypes.bool.isRequired,
    hideToast: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return { 
        toastType: state.toast.toastType,
        toastMessage: state.toast.message,
        showToast: state.toast.showToast,
    };
};

const mapDispatchToProps = {
    hideToast: toastActions.hideToast
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Toast);