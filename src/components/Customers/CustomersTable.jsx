import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IoEyeOutline } from "react-icons/io5";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(customer, email, phone, actions) {
  return { customer, email, phone, actions };
}

const rows = [
  createData("Kayle", "kayle@gmail.com", "456321"),
  createData("Kayle", "kayle@gmail.com", "456321"),
  createData("Kayle", "kayle@gmail.com", "456321"),
  createData("Kayle", "kayle@gmail.com", "456321"),
  createData("Kayle", "kayle@gmail.com", "456321"),
  createData("Kayle", "kayle@gmail.com", "456321"),
  createData("Kayle", "kayle@gmail.com", "456321"),
];

export default function CustomersTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">CUSTOMER</StyledTableCell>
            <StyledTableCell align="left">EMAIL ID</StyledTableCell>
            <StyledTableCell align="left">PHONE NO</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" align="left">
                {row.customer}
              </StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{row.phone}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
