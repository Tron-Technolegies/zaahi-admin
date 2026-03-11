import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEditCoupon } from '../../hooks/coupons/useCoupon';

export default function CouponEditDialog({ open, handleClose, item }) {
  const { isPending, mutateAsync } = useEditCoupon();

  const [couponData, setCouponData] = React.useState({
    code: '',
    type: 'percentage',
    value: '',
    expiryDate: '',
    usage: '',
    status: 'active',
  });

  React.useEffect(() => {
    if (item) {
      setCouponData(item);
    }
  }, [item]);
  const handleChange = (e) => {
    setCouponData({
      ...couponData,
      [e.target.name]: e.target.value,
    });
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
        Edit Coupon
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
          <option value='Percentage'>Percentage</option>
          <option value='Fixed'>Fixed</option>
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
          <option value='Active'>Active</option>
          <option value='Scheduled'>Scheduled</option>
          <option value='Expired'>Expired</option>
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
          onClick={async () => {
            const data = { id: item._id, ...couponData };
            await mutateAsync(data);

            setCouponData({
              code: '',
              type: 'percentage',
              value: '',
              expiryDate: '',
              usage: '',
              status: 'active',
            });

            handleClose();
          }}
          className='bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800 transition'
        >
          {isPending ? 'Updating...' : 'Update'}
        </button>
      </DialogActions>
    </Dialog>
  );
}
