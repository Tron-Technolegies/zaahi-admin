import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Chip,
  Typography,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
// Import the delete hook
import {
  useGetProducts,
  useDeleteProduct,
} from "../../hooks/product/useProducts";

const getStatusStyles = (status) => {
  switch (status) {
    case "In Stock":
      return { bgcolor: "#ECFDF5", color: "#10B981" };
    case "Low Stock":
      return { bgcolor: "#FFFBEB", color: "#F59E0B" };
    case "Out of Stock":
      return { bgcolor: "#FEF2F2", color: "#EF4444" };
    default:
      return { bgcolor: "#F9FAFB", color: "#6B7280" };
  }
};

export default function ProductTable({ onEdit }) {
  const { data, isLoading, isError } = useGetProducts();
  // Initialize the delete mutation
  const { mutateAsync: deleteProduct, isPending: isDeleting } =
    useDeleteProduct();

  const products = data?.products || [];

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteProduct(id);
    }
  };

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (isError || products.length === 0)
    return (
      <Typography sx={{ p: 5, textAlign: "center" }}>
        No products found.
      </Typography>
    );

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                color: "#6B7280",
                fontWeight: 600,
                fontSize: "0.95rem",
              },
            }}
          >
            <TableCell>PRODUCT</TableCell>
            <TableCell>CATEGORY</TableCell>
            <TableCell>PRICE</TableCell>
            <TableCell>STOCK</TableCell>
            {/* <TableCell>STATUS</TableCell> */}
            <TableCell align="right">ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row._id}
              hover
              sx={{ "& td": { py: 2.5, borderBottom: "1px solid #F3F4F6" } }}
            >
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {/* Display the actual product image */}
                  <Avatar
                    src={row.image?.url}
                    variant="rounded"
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#111827" }}
                  >
                    {row.productName}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ color: "#6B7280" }}>{row.category}</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#111827" }}>
                ₹{row.basePrice?.toLocaleString()}
              </TableCell>
              <TableCell sx={{ color: "#6B7280" }}>
                {row.variants?.map((item) => (
                  <div key={item.size} className="flex gap-2">
                    <p>{item.size}</p>
                    <p>{item.stock} nos</p>
                    <p>Rs {item.price}</p>
                  </div>
                ))}
              </TableCell>
              {/* <TableCell>
                <Chip
                  label={
                    row.status || (row.stock > 0 ? "In Stock" : "Out of Stock")
                  }
                  size="small"
                  sx={{
                    ...getStatusStyles(row.status),
                    fontWeight: 520,
                    border: 1,
                  }}
                />
              </TableCell> */}
              <TableCell align="right">
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}
                >
                  <IconButton
                    onClick={() => onEdit(row)}
                    sx={{ color: "#9CA3AF", "&:hover": { color: "#F59E0B" } }}
                  >
                    <FiEdit size={18} />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDelete(row._id, row.productName)}
                    disabled={isDeleting}
                    sx={{
                      color: "#9CA3AF",
                      "&:hover": { color: "#EF4444" },
                      opacity: isDeleting ? 0.5 : 1,
                    }}
                  >
                    <RiDeleteBinLine size={18} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
