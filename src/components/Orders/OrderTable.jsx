import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

function createData(product, customer, price, qty, address, status) {
  return { product, customer, price, qty, address, status };
}

const rows = [
  createData("saree", "Kayle", "1500", 1, "Kerala", "Shipped"),
  createData("saree", "Kayle", "1500", 1, "Kerala", "Shipped"),
  createData("saree", "Kayle", "1500", 1, "Kerala", "Shipped"),
  createData("saree", "Kayle", "1500", 1, "Kerala", "Shipped"),
  createData("saree", "Kayle", "1500", 1, "Kerala", "Shipped"),
  createData("saree", "Kayle", "1500", 1, "Kerala", "Shipped"),
  createData("saree", "Kayle", "1500", 1, "Kerala", "Shipped"),
  createData("saree", "Kayle", "1500", 1, "Kerala", "Shipped"),
];

export default function OrderTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>PRODUCT</StyledTableCell>
            <StyledTableCell align="left">CUSTOMER</StyledTableCell>
            <StyledTableCell align="left">PRICE</StyledTableCell>
            <StyledTableCell align="left">QTY</StyledTableCell>
            <StyledTableCell align="left">ADDRESS</StyledTableCell>
            <StyledTableCell align="left">STATUS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" align="left">
                {row.product}
              </StyledTableCell>
              <StyledTableCell align="left">{row.customer}</StyledTableCell>
              <StyledTableCell align="left">{row.price}</StyledTableCell>
              <StyledTableCell align="left">{row.qty}</StyledTableCell>
              <StyledTableCell align="left">{row.address}</StyledTableCell>
              <StyledTableCell align="left">{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
