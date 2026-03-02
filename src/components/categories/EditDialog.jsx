import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useEditCategory, useGetSingleCategory } from "../../hooks/categories/useCategory";
import { useState } from "react";
import { useEffect } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function EditDialog({ open, onClose, item }) {
  const { data } = useGetSingleCategory({ id: item?._id });
  const [categoryName, setCategoryName] = useState(data?.categoryName || "");
  const { isPending, mutateAsync } = useEditCategory();

  useEffect(() => {
    if (data) {
      setCategoryName(data.categoryName);
    }
  }, [data]);
  return (
    <React.Fragment>
      <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, px: 1, px: 15, fontWeight: "bold" }} id="customized-dialog-title">
          Edit Category
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: "#777777",
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom className="flex justify-center">
            <input
              className="p-2 bg-gray-200 rounded-md outline-none w-[200px] text-center font-medium"
              required
              onChange={(e) => setCategoryName(e.target.value)}
              value={categoryName}
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <button
            disabled={isPending}
            className="bg-black hover:bg-gray-700 hover:text-white text-white  rounded-sm transition-all duration-200 px-3 mb-2 mr-2 text-md font-light"
            onClick={async () => {
              const data = { categoryName, id: item._id };
              await mutateAsync(data);
              onClose();
            }}
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
