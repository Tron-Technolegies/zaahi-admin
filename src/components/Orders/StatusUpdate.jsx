import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useUpdateOrderStatus } from "../../hooks/Orders/useOrders";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  maxHeight: 500,
  overflowY: "scroll",
  p: 4,
};
export default function StatusUpdate({ open, handleClose, orderId }) {
  const [status, setStatus] = useState("Confirmed");
  const { isPending, mutateAsync } = useUpdateOrderStatus();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Order
        </Typography>
        <div className="flex flex-col gap-2">
          <select
            className="p-2 outline-none shadow "
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={"Confirmed"}>Confirmed</option>
            <option value={"Shipped"}>Shipped</option>
            <option value={"Delivered"}>Delivered</option>
            <option value={"Cancelled"}>Cancelled</option>
          </select>

          <button
            className="p-2 px-4 bg-black text-white"
            disabled={isPending}
            onClick={async () => {
              await mutateAsync({ orderId, status });
              handleClose();
            }}
          >
            {isPending ? "...." : "Update"}
          </button>
        </div>
      </Box>
    </Modal>
  );
}
