import React from 'react';
import Draggable from 'react-draggable';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@material-ui/core';


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

function ConfirmDialog({
    onClose, 
    open, 
    title, 
    children,
    onCancel, 
    onConfirm,
    cancelText, 
    confirmText,
    hideCancel,
    ...props
}) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog"
            {...props}
        >
            <DialogTitle style={{ cursor: 'move' }}>
                {title}
            </DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>

            <DialogActions>
                {hideCancel ? null : (
                    <Button onClick={onCancel ? onCancel : onClose} color="primary">
                        {cancelText}
                    </Button>
                )}
                <Button onClick={onConfirm ? onConfirm : onClose} color="primary">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmDialog.defaultProps = {
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    hideCancel: false,
};

export default ConfirmDialog;