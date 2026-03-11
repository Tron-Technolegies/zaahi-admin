import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import React from 'react';
import { useDeleteBrand } from '../../hooks/brands/useBrands';

const DeleteDialog = ({ open, handleClose, item }) => {
  const { isPending, mutateAsync } = useDeleteBrand();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby='alert-dialog-description'
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(1px)',
        },
      }}
      PaperProps={{
        sx: {
          background: 'rgba(217, 212, 217)',
          backdropFilter: 'blur(15px)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.20)',
          width: 350,
        },
      }}
    >
      <DialogContent>
        <DialogContentText
          id='alert-dialog-description'
          sx={{
            m: 0,
            p: 4,
            fontWeight: 600,
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          Are you sure you want to delete this Brand..?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant='contained' onClick={handleClose}>
          NOT NOW
        </Button>

        <Button
          disabled={isPending}
          onClick={async () => {
            const data = { id: item._id };
            await mutateAsync(data);
            handleClose();
          }}
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
