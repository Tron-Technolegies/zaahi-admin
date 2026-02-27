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
} from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuImage } from "react-icons/lu";

function createDress(id, productName, category, price, stock, status) {
  return { _id: id, productName, category, price, stock, status };
}

const rows = [
  createDress(1, "Floral Print A-Line Dress", "Western Wear", 1299, 25, "In Stock"),
  createDress(2, "Embroidered Lehenga Choli", "Ethnic Wear", 3499, 10, "Low Stock"),
  createDress(3, "Cotton Pink Party Frock", "Western Wear", 850, 40, "In Stock"),
  createDress(4, "Silk Pattu Pavadai Set", "Ethnic Wear", 2100, 5, "Low Stock"),
  createDress(5, "Denim Dungaree with Tee", "Casual Wear", 1150, 0, "Out of Stock"),
];

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
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "16px",
        border: "1px solid #6B7280",
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ "& th": { color: "#6B7280", fontWeight: 600, fontSize: "0.95rem" } }}>
            <TableCell>PRODUCT</TableCell>
            <TableCell>CATEGORY</TableCell>
            <TableCell>PRICE</TableCell>
            <TableCell>STOCK</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell align="right">ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              hover
              sx={{ "& td": { py: 2.5, borderBottom: "1px solid #F3F4F6" } }}
            >
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "#F9FAFB",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <LuImage style={{ color: "#9CA3AF", fontSize: "20px" }} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>
                    {row.productName}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ color: "#6B7280" }}>{row.category}</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#111827" }}>
                ₹{row.price.toLocaleString()}
              </TableCell>
              <TableCell sx={{ color: "#6B7280" }}>{row.stock} units</TableCell>
              <TableCell>
                <Chip
                  label={row.status}
                  size="small"
                  sx={{ ...getStatusStyles(row.status), fontWeight: 520, border: 1 }}
                />
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
                  <IconButton
                    onClick={() => onEdit(row)}
                    sx={{
                      color: "#9CA3AF",
                      p: 1,
                      transition: "all 0.2s ease",
                      "&:hover": { color: "#F59E0B" },
                    }}
                  >
                    <FiEdit size={18} />
                  </IconButton>
                  <IconButton sx={{ color: "#9CA3AF", p: 1, "&:hover": { color: "#EF4444" } }}>
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
