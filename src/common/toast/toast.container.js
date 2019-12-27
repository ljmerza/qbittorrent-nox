import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';

import { toastActions, TOAST_TYPES } from './toast.reducer';


class Toast extends Component {
    render() {
        const { classes, toastType } = this.props;
        
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.props.showToast}
                    onClose={this.props.hideToast}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                        className: clsx(
                            { [classes.error]: toastType === TOAST_TYPES.ERROR },
                            { [classes.warning]: toastType === TOAST_TYPES.WARNING },
                            { [classes.success]: toastType === TOAST_TYPES.SUCCESS }
                        )
                    }}
                    message={<span id="message-id">{this.props.toastMessage}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.props.hideToast}
                        >
                            <CloseIcon onClick={this.hideToast} />
                        </IconButton>
                    ]}
                />
            </div>
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
    showToast: PropTypes.bool.isRequired,
    toastMessage: PropTypes.string.isRequired,
    toastType: PropTypes.oneOf(Object.values(TOAST_TYPES)),
    hideToast: PropTypes.func.isRequired
};

Toast.defaultProps = {
    toast: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return { 
        toastType: state.toast.type,
        showToast: state.toast.show,
        toastMessage: state.toast.message,
    };
};

const mapDispatchToProps = {
    hideToast: toastActions.hideToast
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Toast);