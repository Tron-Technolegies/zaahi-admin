import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEditBrand, useGetSingleBrand } from '../../hooks/brands/useBrands';

export default function BrandEditDialog({ open, handleClose, item }) {
  const { data } = useGetSingleBrand({ id: item?._id });
  const [brandName, setBrandName] = React.useState(data?.categoryName || '');
  const { isPending, mutateAsync } = useEditBrand();

  React.useEffect(() => {
    if (data) {
      setBrandName(data.brandName);
    }
  }, [data]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='edit-brand-dialog'
      PaperProps={{
        sx: {
          borderRadius: 3,
          width: 350,
        },
      }}
    >
      <DialogTitle id='edit-brand-dialog' sx={{ textAlign: 'center' }}>
        Edit Brand
      </DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Typography gutterBottom className='flex justify-center'>
          <input
            className='p-2 bg-gray-200 rounded-md outline-none w-50 text-center font-medium'
            required
            onChange={(e) => setBrandName(e.target.value)}
            value={brandName}
          />
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          variant='contained'
          color='primary'
          onClick={async () => {
            const data = { brandName, id: item._id };
            await mutateAsync(data);
            handleClose();
          }}
        >
          {isPending ? 'Updating...' : 'Update'}
        </Button>
        <Button variant='outlined' color='inherit' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
