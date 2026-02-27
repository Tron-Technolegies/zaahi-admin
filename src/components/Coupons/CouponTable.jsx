import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaEdit, FaTrash } from 'react-icons/fa';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const rows = [
  {
    code: 'WELCOME20',
    type: 'Percentage',
    value: '20%',
    expiryDate: '02/03/2026',
    usage: 145,
    status: 'active',
  },
  {
    code: 'FLAT100',
    type: 'Fixed',
    value: '$100',
    expiryDate: '15/04/2026',
    usage: 78,
    status: 'scheduled',
  },
  {
    code: 'NEWUSER10',
    type: 'Percentage',
    value: '10%',
    expiryDate: '10/01/2025',
    usage: 230,
    status: 'expired',
  },
];

const StatusBadge = ({ status }) => {
  let colorClasses = '';

  if (status === 'active') {
    colorClasses = 'bg-green-100 text-green-700';
  } else if (status === 'expired') {
    colorClasses = 'bg-gray-200 text-gray-700';
  } else if (status === 'scheduled') {
    colorClasses = 'bg-orange-100 text-orange-700';
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${colorClasses}`}
    >
      {status}
    </span>
  );
};

const CouponTable = ({ onEdit }) => {
  // const handleEdit = (code) => {
  //   console.log('Edit:', code);
  // };

  const handleDelete = (code) => {
    console.log('Delete:', code);
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Code</StyledTableCell>
            <StyledTableCell align='center'>Type</StyledTableCell>
            <StyledTableCell align='center'>Value</StyledTableCell>
            <StyledTableCell align='center'>Expiry Date</StyledTableCell>
            <StyledTableCell align='center'>Usage</StyledTableCell>
            <StyledTableCell align='center'>Status</StyledTableCell>
            <StyledTableCell align='center'>Actions</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.code}>
              <StyledTableCell align='center'>{row.code}</StyledTableCell>

              <StyledTableCell align='center'>{row.type}</StyledTableCell>

              <StyledTableCell align='center'>{row.value}</StyledTableCell>

              <StyledTableCell align='center'>{row.expiryDate}</StyledTableCell>

              <StyledTableCell align='center'>{row.usage}</StyledTableCell>

              <StyledTableCell align='center'>
                <StatusBadge status={row.status} />
              </StyledTableCell>

              <StyledTableCell align='center'>
                <div className='flex justify-center gap-4'>
                  <button
                    // onClick={() => handleEdit(row.code)}
                    onClick={onEdit}
                    className='text-gray-500 hover:text-blue-800 text-lg transition'
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(row.code)}
                    className='text-gray-500 hover:text-red-800 text-lg transition'
                  >
                    <FaTrash />
                  </button>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CouponTable;
