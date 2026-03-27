import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useUpdateOrderStatus } from "../../hooks/useOrders";
import { useState } from "react";
import StatusUpdate from "./StatusUpdate";

const getStatusClasses = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Confirmed":
      return "bg-blue-100 text-blue-700";
    case "Shipped":
      return "bg-orange-100 text-orange-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

export default function OrderTable({ data }) {
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus();
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const handleStatusChange = async (orderId, newStatus) => {
    await updateStatus({ orderId, status: newStatus });
  };
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
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>PRODUCT</StyledTableCell>
              <StyledTableCell align="left">CUSTOMER</StyledTableCell>
              <StyledTableCell align="left">TOTAL PRICE</StyledTableCell>
              <StyledTableCell align="left">ADDRESS</StyledTableCell>
              <StyledTableCell align="left">PAYMENT STATUS</StyledTableCell>
              <StyledTableCell align="left">ORDER STATUS</StyledTableCell>
              <StyledTableCell align="left">ACTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => {
              return (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row" align="left">
                    <div className="flex flex-col gap-2">
                      {row.orderItems?.map((item) => (
                        <div key={item._id} className="flex gap-2 items-center">
                          <img
                            src={item.image}
                            alt="preview"
                            className="w-14 object-cover"
                          />
                          <p>{`${item.productName} (${item.qty} x ${item.price})`}</p>
                        </div>
                      ))}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.user?.username}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.totalPrice}
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    sx={{ maxWidth: 200, whiteSpace: "normal" }}
                  >
                    <p>
                      {row.address?.name} <br />
                      {row.address?.street} <br />
                      {row.address?.state} <br />
                      {row.address?.pin} <br />
                      {row.address?.country} <br /> {row.address?.phone}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.paymentStatus}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.status}</StyledTableCell>
                  <StyledTableCell align="left">
                    <button
                      className="p-1 text-sm px-4 bg-black text-white"
                      onClick={() => {
                        setSelected(row._id);
                        setOpen(true);
                      }}
                    >
                      Update Order
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <StatusUpdate
        open={open}
        handleClose={() => setOpen(false)}
        orderId={selected}
      />
    </>
  );
}
