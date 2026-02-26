import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function BrandDialog({ open, handleClose }) {
  const [brandName, setBrandName] = React.useState('');

  const handleSave = () => {
    if (!brandName.trim()) return;

    console.log('Brand Name:', brandName);

    // Clear input
    setBrandName('');

    // Close dialog
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='add-brand-dialog'
      BackdropProps={{
        sx: { backdropFilter: 'blur(2px)' },
      }}
      PaperProps={{
        sx: {
          background: '#EEEEEE',
          borderRadius: 3,
          width: 350,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        },
      }}
    >
      <DialogTitle
        id='add-brand-dialog'
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: 20,
          p: 3,
        }}
      >
        Add Brand
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

      <DialogContent
        dividers
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <input
          className='p-2 bg-gray-100 rounded-md outline-none w-[220px] text-center font-medium'
          placeholder='Enter brand name'
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <button
          onClick={handleSave}
          className='bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800 transition'
        >
          Save
        </button>
      </DialogActions>
    </Dialog>
  );
}
