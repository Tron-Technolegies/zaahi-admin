import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { FiX, FiUploadCloud } from "react-icons/fi";

const ProductDialog = ({ open, handleClose, mode = "add", editData = null }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "20px", 
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
          maxHeight: "95vh", 
          m: 1, 
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 2.5, 
          px: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Playfair Display', serif", 
            fontWeight: "bold",
            color: "#1F2937",
            fontSize: "1.5rem", 
          }}
        >
          {mode === "edit" ? "Edit Product" : "Add New Product"}
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: "#9CA3AF" }}>
          <FiX size={22} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 0, overflowY: "auto" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 0.5 }}>
         
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "#374151", mb: 0.5, display: "block" }}
            >
              Product Name
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g. Embroidered Lehenga "
              defaultValue={editData?.productName || ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  height: "48px", 
                  bgcolor: "#fff",
                },
              }}
            />
          </Box>

         
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
           
            <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: "#374151", mb: 0.5, display: "block" }}
              >
                Category
              </Typography>
              <Select
                fullWidth
                defaultValue={editData?.category || "Watches"}
                sx={{ borderRadius: "10px", height: "48px", bgcolor: "#fff" }}
              >
                <MenuItem value="Western Wear">Western Wear</MenuItem>
                <MenuItem value="Ethnic Wear">Ethnic Wear</MenuItem>
                <MenuItem value="Casual Wear">Casual Wear</MenuItem>
              </Select>
            </Box>

           
            <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: "#374151", mb: 0.5, display: "block" }}
              >
                Price
              </Typography>
              <TextField
                fullWidth
                placeholder="$0.00"
                defaultValue={editData?.price || ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    height: "48px",
                    bgcolor: "#fff",
                  },
                }}
              />
            </Box>

          
            <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: "#374151", mb: 0.5, display: "block" }}
              >
                Stock
              </Typography>
              <TextField
                fullWidth
                placeholder="0"
                defaultValue={editData?.stock || ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    height: "48px",
                    bgcolor: "#fff",
                  },
                }}
              />
            </Box>

            
            <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: "#374151", mb: 0.5, display: "block" }}
              >
                Status
              </Typography>
              <Select
                fullWidth
                defaultValue={editData?.status || "In Stock"}
                sx={{ borderRadius: "10px", height: "48px", bgcolor: "#fff" }}
              >
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Low Stock">Low Stock</MenuItem>
                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              </Select>
            </Box>
          </Box>

          
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "#374151", mb: 0.5, display: "block" }}
            >
              Product Image
            </Typography>
            <Box
              sx={{
                border: "1.5px dashed #9CA3AF",
                borderRadius: "12px",
                py: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": { bgcolor: "#F9FAFB" },
              }}
            >
              <FiUploadCloud size={30} color="#6B7280" />
              <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 600 }}>
                Click to upload image
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>


      <DialogActions sx={{ p: 2, pr: 3, pb: 3, justifyContent: "flex-end", gap: 2 }}>
        <Button
          onClick={handleClose}
          sx={{ color: "#4B5563", textTransform: "none", fontWeight: "bold", fontSize: "0.9rem" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1C1C1C",
            color: "#FACC15", 
            px: 4,
            py: 1,
            borderRadius: "10px",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { bgcolor: "#000" },
          }}
        >
          {mode === "edit" ? "Save Changes" : "Create Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
