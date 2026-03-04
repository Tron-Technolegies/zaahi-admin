import React, { useState, useEffect, useRef } from "react";
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
import { useEditProduct, useGetSingleProduct } from "../../hooks/product/useProducts";
import { useGetCategories } from "../../hooks/categories/useCategory";
import { toast } from "react-toastify";

export default function EditProductDialog({ open, onClose, item }) {
  // Aliasing 'data' to 'productData' for the useEffect
  const { data: productData } = useGetSingleProduct({ id: item?._id });
  const { data: categoriesData, isLoading: catLoading } = useGetCategories();

  // Normalizing the categories array
  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.categories || categoriesData?.data || [];

  const { isPending, mutateAsync } = useEditProduct();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    stock: "",
    status: "In Stock",
  });

  // Sync state when product data arrives
  useEffect(() => {
    if (productData) {
      setFormData({
        productName: productData.productName || "",
        category: productData.category || "",
        price: productData.price || "",
        stock: productData.stock || "",
        status: productData.status || "In Stock",
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("status", formData.status);

    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      await mutateAsync({ id: item._id, data });
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: "20px" } }}
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
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1F2937" }}>
          Edit Product
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#9CA3AF" }}>
          <FiX size={22} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 0, overflowY: "auto" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 0.5 }}>
          <Box sx={{ width: "100%" }}>
            <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: "block" }}>
              Product Name
            </Typography>
            <TextField
              fullWidth
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
              <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: "block" }}>
                Category
              </Typography>
              <Select
                fullWidth
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={catLoading}
                displayEmpty
                sx={{ borderRadius: "10px", height: "48px" }}
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {categories.map((cat) => (
                  // Using fallbacks in case the property isn't exactly 'name'
                  <MenuItem
                    key={cat._id}
                    value={cat.name || cat.categoryName || cat.title || cat._id}
                  >
                    {cat.name || cat.categoryName || cat.title || "Unnamed Category"}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
              <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: "block" }}>
                Price
              </Typography>
              <TextField
                fullWidth
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
              <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: "block" }}>
                Stock
              </Typography>
              <TextField
                fullWidth
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ flex: "1 1 calc(50% - 8px)" }}>
              <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: "block" }}>
                Status
              </Typography>
              <Select fullWidth name="status" value={formData.status} onChange={handleChange}>
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Low Stock">Low Stock</MenuItem>
                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              </Select>
            </Box>
          </Box>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />
          <Box
            onClick={() => fileInputRef.current.click()}
            sx={{
              border: selectedFile ? "1.5px solid #FACC15" : "1.5px dashed #9CA3AF",
              borderRadius: "12px",
              py: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              bgcolor: selectedFile ? "#FFFBEB" : "transparent",
            }}
          >
            <FiUploadCloud size={30} color={selectedFile ? "#FACC15" : "#6B7280"} />
            <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 600 }}>
              {selectedFile ? selectedFile.name : "Update image (Optional)"}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, pr: 3, pb: 3, gap: 2 }}>
        <Button onClick={onClose} sx={{ color: "#4B5563", fontWeight: "bold" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={isPending}
          onClick={handleUpdate}
          sx={{
            bgcolor: "#1C1C1C",
            color: "#FACC15",
            px: 4,
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          {isPending ? "Updating..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
