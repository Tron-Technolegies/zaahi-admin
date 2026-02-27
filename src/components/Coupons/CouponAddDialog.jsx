import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function CouponAddDialog({ open, handleClose }) {
  const [couponData, setCouponData] = React.useState({
    code: '',
    type: 'percentage',
    value: '',
    expiryDate: '',
    usage: '',
    status: 'active',
  });

  const handleChange = (e) => {
    setCouponData({
      ...couponData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!couponData.code.trim()) return;

    console.log('Coupon Data:', couponData);

 
    setCouponData({
      code: '',
      type: 'percentage',
      value: '',
      expiryDate: '',
      usage: '',
      status: 'active',
    });

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='add-coupon-dialog'
      BackdropProps={{
        sx: { backdropFilter: 'blur(2px)' },
      }}
      PaperProps={{
        sx: {
          background: '#EEEEEE',
          borderRadius: 3,
          width: 400,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        },
      }}
    >
      <DialogTitle
        id='add-coupon-dialog'
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: 20,
          p: 3,
        }}
      >
        Add Coupon
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
          flexDirection: 'column',
          gap: 2,
        }}
      >
    
        <input
          name='code'
          placeholder='Coupon Code'
          value={couponData.code}
          onChange={handleChange}
          className='p-2 bg-gray-100 rounded-md outline-none'
        />

     
        <select
          name='type'
          value={couponData.type}
          onChange={handleChange}
          className='p-2 bg-gray-100 rounded-md outline-none'
        >
          <option value='percentage'>Percentage</option>
          <option value='fixed'>Fixed</option>
        </select>

  
        <input
          name='value'
          placeholder='Value (e.g., 20 or 100)'
          value={couponData.value}
          onChange={handleChange}
          className='p-2 bg-gray-100 rounded-md outline-none'
        />

        <input
          type='date'
          name='expiryDate'
          value={couponData.expiryDate}
          onChange={handleChange}
          className='p-2 bg-gray-100 rounded-md outline-none'
        />

 
        <input
          type='number'
          name='usage'
          placeholder='Usage Limit'
          value={couponData.usage}
          onChange={handleChange}
          className='p-2 bg-gray-100 rounded-md outline-none'
        />

       
        <select
          name='status'
          value={couponData.status}
          onChange={handleChange}
          className='p-2 bg-gray-100 rounded-md outline-none'
        >
          <option value='active'>Active</option>
          <option value='scheduled'>Scheduled</option>
          <option value='expired'>Expired</option>
        </select>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
        <button
          onClick={handleClose}
          className='bg-gray-400 text-white px-4 py-1 rounded-md hover:bg-gray-500 transition'
        >
          Cancel
        </button>

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
