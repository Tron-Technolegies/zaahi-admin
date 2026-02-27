import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DialogTable() {
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState("");

  return (
    <React.Fragment>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          bgcolor: "black",
          color: "#fff",
          px: 2,
          py: 1,
          display: "flex",

          alignItems: "center",
          gap: 1,
          "&:hover": { bgcolor: "#222" },
        }}
      >
        <AddIcon sx={{ fontSize: 20 }} />
        Add Category
      </Button>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => setOpen(false)}
        BackdropProps={{
          sx: {
            backdropFilter: "blur(1px)",
          },
        }}
        PaperProps={{
          sx: {
            background: "#EEEEEE",
            backdropFilter: "blur(15px)", // glass effect
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(238, 238, 238, 0.20)",
            width: 350,
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 4,
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
          }}
          id="customized-dialog-title"
        >
          Add Category
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[800],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            className="p-2 bg-gray-100 rounded-md outline-none w-[200px] text-center font-medium"
            placeholder="a new one!"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <button
            className="bg-black hover:bg-gray-700 hover:text-white text-white  rounded-sm transition-all duration-200 px-3 mb-2 mr-2 text-md font-light"
            variant="contained"
          >
            SAVE
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
