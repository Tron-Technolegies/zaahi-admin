import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { NavLink } from "react-router-dom";
import { adminNavLinks } from "../../utils/AdminLinks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  boxShadow: 24,
  maxHeight: 500,
  overflowY: "scroll",
  p: 4,
};
export default function SmallHeader({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: "wheat" }}
        >
          Zaahi Admin
        </Typography>
        <nav className="my-8 flex flex-col gap-4">
          {adminNavLinks.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={handleClose}
              className="text-white flex gap-3 items-center p-2 text-lg hover:bg-gray-200 hover:text-black rounded-full ease-in-out duration-200 hover:ms-2"
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </Box>
    </Modal>
  );
}
