import React from 'react';
import Draggable from 'react-draggable';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@material-ui/core';


function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
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
    cancelText='Cancel',
    confirmText='Confirm',
}) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperComponent={PaperComponent}
        >
            <DialogTitle style={{ cursor: 'move' }}>
                {title}
            </DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>

            <DialogActions>
            <Button autoFocus onClick={onCancel ? onCancel : onClose} color="primary">
                {cancelText}
            </Button>
            <Button onClick={onConfirm ? onConfirm : onClose} color="primary">
                {confirmText}
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;