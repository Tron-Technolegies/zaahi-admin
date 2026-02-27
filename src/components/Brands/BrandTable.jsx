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
  { name: 'Puma' },
  { name: 'Adidas' },
  { name: 'Fastrack' },
  { name: 'Nike' },
];

const BrandTable = () => {
  const handleEdit = (name) => {
    console.log('Edit:', name);
  };

  const handleDelete = (name) => {
    console.log('Delete:', name);
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Brand Name</StyledTableCell>
            <StyledTableCell align='center'>Actions</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align='center'>{row.name}</StyledTableCell>

              <StyledTableCell align='center'>
                <div className='flex justify-center gap-4'>
                  <button
                    onClick={() => handleEdit(row.name)}
                    className='text-gray-500 hover:text-blue-800 text-lg transition'
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(row.name)}
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

export default BrandTable;
