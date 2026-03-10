import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useUpdateOrderStatus } from "../../hooks/Orders/useOrders";

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
  const { mutateAsync: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();

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
          {data?.map((row) => {
            const address = row.address?.[0] || {};
            const addressString = [
              address.name,
              address.street,
              address.state,
              address.pin,
              address.country,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row" align="left">
                  {row.product?.productName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.user?.username}</StyledTableCell>
                <StyledTableCell align="left">{row.totalPrice}</StyledTableCell>
                <StyledTableCell align="left">{row.qty}</StyledTableCell>
                <StyledTableCell align="left" sx={{ maxWidth: 200, whiteSpace: "normal" }}>
                  {addressString || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <div className="relative inline-block w-full max-w-[130px]">
                    <select
                      value={row.status || "Pending"}
                      onChange={(e) => handleStatusChange(row._id, e.target.value)}
                      disabled={isUpdating}
                      className={`w-full px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer appearance-none text-center outline-none border-0 ${getStatusClasses(
                        row.status || "Pending",
                      )} ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <option value="Pending" className="bg-white text-gray-900">
                        Pending
                      </option>
                      <option value="Confirmed" className="bg-white text-gray-900">
                        Confirmed
                      </option>
                      <option value="Shipped" className="bg-white text-gray-900">
                        Shipped
                      </option>
                      <option value="Delivered" className="bg-white text-gray-900">
                        Delivered
                      </option>
                      <option value="Cancelled" className="bg-white text-gray-900">
                        Cancelled
                      </option>
                    </select>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
