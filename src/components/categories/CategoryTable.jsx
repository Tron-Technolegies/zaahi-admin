import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBinLine } from 'react-icons/ri';
import EditDialog from './EditDialog';

import CategoryDelete from './CategoryDelete';

const CategoryTable = ({ data }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>NAME</StyledTableCell>
              <StyledTableCell align='center'>ACTIONS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component='th' scope='row' align='center'>
                  {row.categoryName}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <div className='flex justify-center gap-4'>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setSelectedItem(row);
                      }}
                      className='text-gray-500 hover:text-blue-800 text-xl transition'
                    >
                      <LiaEdit />
                    </button>

                    <button
                      onClick={() => handleDeleteClick(row)}
                      className='text-gray-500 hover:text-red-800 text-xl transition'
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditDialog
        item={selectedItem}
        open={open}
        onClose={() => setOpen(false)}
      />
      <CategoryDelete
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        item={selectedItem}
      />
    </div>
  );
};

export default CategoryTable;
