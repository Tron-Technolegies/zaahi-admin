import React, { useState, useRef } from "react"; // Added useRef
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
import { HiPlus } from "react-icons/hi";
import { useAddProduct } from "../../hooks/product/useProducts";
import { useGetCategories } from "../../hooks/categories/useCategory";
import { toast } from "react-toastify"; // Added toast

export default function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { isPending, mutateAsync } = useAddProduct();

  const { data: categoriesData, isLoading: catLoading } = useGetCategories();
  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.categories || categoriesData?.data || [];

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    stock: "",
    status: "In Stock",
  });

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setFormData({
      productName: "",
      category: "",
      price: "",
      stock: "",
      status: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      toast.error("Please upload an image");
      return;
    }

    // Creating FormData for Multer/Cloudinary backend
    const data = new FormData();
    data.append("name", formData.productName);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("status", formData.status);
    data.append("image", selectedFile); // Matches your backend's if(req.file)

    try {
      await mutateAsync(data);
      handleClose();
    } catch (error) {
      // Error handled by mutation onError
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 px-4 py-1.5 bg-[#171717] text-[#FACC15] rounded-xl font-medium hover:bg-black transition-all shadow-lg text-lg active:scale-95"
      >
        <HiPlus className="text-2xl" />
        <span>Add Product</span>
      </button>

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
            sx={{ fontFamily: "'Playfair Display', serif", fontWeight: "bold", color: "#1F2937" }}
          >
            Add New Product
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: "#9CA3AF" }}>
            <FiX size={22} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 0, overflowY: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 0.5 }}>
            {/* Product Name */}
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: "#374151", mb: 0.5, display: "block" }}
              >
                Product Name
              </Typography>
              <TextField
                fullWidth
                name="productName"
                placeholder="e.g. Royal Chronograph"
                value={formData.productName}
                onChange={handleChange}
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
              {/* Category */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#374151", mb: 0.5, display: "block" }}
                >
                  Category
                </Typography>
                <Select
                  fullWidth
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={catLoading}
                  displayEmpty // This helps show the state when value is ""
                  sx={{ borderRadius: "10px", height: "48px", bgcolor: "#fff" }}
                >
                  <MenuItem value="" disabled>
                    <em>Select a Category</em>
                  </MenuItem>

                  {categories.map((cat) => (
                    // Check if 'name' exists, otherwise fallback to 'categoryName' or 'title'
                    <MenuItem key={cat._id} value={cat.name || cat.categoryName || cat._id}>
                      {cat.name || cat.categoryName || "Unnamed Category"}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Price */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#374151", mb: 0.5, display: "block" }}
                >
                  Price
                </Typography>
                <TextField
                  fullWidth
                  name="price"
                  type="number"
                  placeholder="₹0.00"
                  value={formData.price}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      height: "48px",
                      bgcolor: "#fff",
                    },
                  }}
                />
              </Box>

              {/* Stock */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#374151", mb: 0.5, display: "block" }}
                >
                  Stock
                </Typography>
                <TextField
                  fullWidth
                  name="stock"
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      height: "48px",
                      bgcolor: "#fff",
                    },
                  }}
                />
              </Box>

              {/* Status Selection */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#374151", mb: 0.5, display: "block" }}
                >
                  Status
                </Typography>
                <Select
                  fullWidth
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  sx={{ borderRadius: "10px", height: "48px", bgcolor: "#fff" }}
                >
                  <MenuItem value="In Stock">In Stock</MenuItem>
                  <MenuItem value="Low Stock">Low Stock</MenuItem>
                  <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                </Select>
              </Box>
            </Box>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            {/* Image Upload Box */}
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: "#374151", mb: 0.5, display: "block" }}
              >
                Product Image
              </Typography>
              <Box
                onClick={() => fileInputRef.current.click()}
                sx={{
                  border: selectedFile ? "1.5px solid #10B981" : "1.5px dashed #9CA3AF",
                  borderRadius: "12px",
                  py: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  bgcolor: selectedFile ? "#F0FDF4" : "transparent",
                  transition: "all 0.2s",
                  "&:hover": { bgcolor: selectedFile ? "#ECFDF5" : "#F9FAFB" },
                }}
              >
                <FiUploadCloud size={30} color={selectedFile ? "#10B981" : "#6B7280"} />
                <Typography
                  variant="caption"
                  sx={{ color: selectedFile ? "#10B981" : "#6B7280", fontWeight: 600 }}
                >
                  {selectedFile ? selectedFile.name : "Click to upload image"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, pr: 3, pb: 3, justifyContent: "flex-end", gap: 2 }}>
          <Button
            onClick={handleClose}
            sx={{ color: "#4B5563", textTransform: "none", fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isPending}
            onClick={handleSave}
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
            {isPending ? "Creating..." : "Create Product"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
