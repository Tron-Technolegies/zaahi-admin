import React, { useState, useRef, useEffect } from "react"; // Added useRef
import { Dialog, DialogTitle, IconButton, Typography } from "@mui/material";
import { FiX, FiUploadCloud } from "react-icons/fi";
import { BsUpload } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { useAddProduct } from "../../hooks/product/useProducts";
import { useGetCategories } from "../../hooks/categories/useCategory";
import { useGetBrands } from "../../hooks/brands/useBrands";

export default function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [extraImages, setExtraImages] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [size, setSize] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const { isPending, mutateAsync } = useAddProduct();
  const { data: allBrands, isLoading: brandLoading } = useGetBrands();
  const { data: categoriesData, isLoading: catLoading } = useGetCategories();

  const handleClose = () => {
    setOpen(false);
  };

  //for specs
  function addSpecs() {
    setSpecs([...specs, { spec: "", value: "" }]);
  }
  function updateSpecs(index, field, value) {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  }
  function removeSpecs(index) {
    setSpecs(specs.filter((_, i) => i !== index));
  }

  //for size
  function addSize() {
    setSize([...size, { size: "", price: "", stock: "" }]);
  }

  function updateSize(index, field, value) {
    const updated = [...size];
    updated[index][field] = value;
    setSize(updated);
  }

  function removeSize(index) {
    setSize(size.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    formdata.append("specs", JSON.stringify(specs));
    formdata.append("size", JSON.stringify(size));
    if (isFeatured) {
      formdata.append("isFeatured", "true");
    }
    await mutateAsync(formdata);
    e.target.reset();
    setSpecs([]);
    setSize([]);
    setImage("");
    setExtraImages([]);
    handleClose();
  }

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
      extraImages.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [image, extraImages]);

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
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
            maxHeight: "95vh",
            padding: "10px",
            overflowY: "scroll",
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
            }}
          >
            Add New Product
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: "#9CA3AF" }}>
            <FiX size={22} />
          </IconButton>
        </DialogTitle>
        <form className="flex flex-col gap-2 p-3" onSubmit={handleSubmit}>
          <label className="text-xs font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="p-2 outline-none border rounded-sm border-[#E8E8E8]"
          />
          <label className="text-xs font-medium">Category</label>
          <select
            name="category"
            placeholder="Product Name"
            className="p-2 outline-none border rounded-sm border-[#E8E8E8]"
          >
            {catLoading ? (
              <p>....</p>
            ) : (
              categoriesData.map((item) => (
                <option key={item._id} value={item.categoryName}>
                  {item.categoryName}
                </option>
              ))
            )}
          </select>
          <label className="text-xs font-medium">Brand</label>
          <select
            name="brand"
            placeholder="Product Name"
            className="p-2 outline-none border rounded-sm border-[#E8E8E8]"
          >
            {brandLoading ? (
              <p>....</p>
            ) : (
              allBrands.map((item) => (
                <option key={item._id} value={item.brandName}>
                  {item.brandName}
                </option>
              ))
            )}
          </select>
          <label className="text-xs font-medium">Base Price</label>
          <input
            type="number"
            name="price"
            placeholder="Base Price"
            className="p-2 outline-none border rounded-sm border-[#E8E8E8]"
          />
          <label className="text-xs font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Product Description"
            className="p-2 outline-none border rounded-sm border-[#E8E8E8]"
            rows={5}
          />
          <div className="">
            <h4 className="text-xs font-medium mb-2">Main Product Image</h4>
            <label
              className={`flex flex-col gap-2 justify-center border w-fit items-center p-3 rounded-lg border-blue-500 cursor-pointer hover:bg-blue-700 nav-link hover:text-white `}
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                multiple={false}
              />
              <div className="text-xl">
                <BsUpload />
              </div>
              <p>Upload</p>
            </label>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-24 h-24 my-3 object-cover rounded-md"
              />
            )}
          </div>
          <div className="mb-2 flex flex-col gap-2">
            <label className="text-xs font-medium mb-2">Specifications</label>
            {specs?.map((item, index) => (
              <div key={index} className="flex lg:flex-row flex-col gap-2 my-1">
                <input
                  type="text"
                  value={item.spec}
                  onChange={(e) => updateSpecs(index, "spec", e.target.value)}
                  placeholder="Enter the specification"
                  className="w-full py-1 px-3 rounded-lg bg-white border  outline-none text-gray-900 h-11"
                />
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => updateSpecs(index, "value", e.target.value)}
                  placeholder="Enter value for specification"
                  className="w-full py-1 px-3 rounded-lg bg-white border  outline-none text-gray-900 h-11"
                />
                <button
                  type="button"
                  className="px-2 py-2 rounded-md bg-red-700 text-white"
                  onClick={() => removeSpecs(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="px-2 mt-3 py-2 rounded-md bg-black text-white"
              onClick={() => addSpecs()}
            >
              Add New Spec
            </button>
          </div>
          <div className="mb-2 flex flex-col gap-2">
            <label className="text-xs font-medium mb-2">Sizes & Variants</label>

            {size?.map((item, index) => (
              <div key={index} className="flex lg:flex-row flex-col gap-2 my-1">
                {/* Size */}
                <input
                  type="text"
                  value={item.size}
                  onChange={(e) => updateSize(index, "size", e.target.value)}
                  placeholder="Size (S, M, L)"
                  className="w-full py-1 px-3 rounded-lg bg-white border outline-none text-gray-900 h-11"
                />

                {/* Price */}
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => updateSize(index, "price", e.target.value)}
                  placeholder="Price"
                  className="w-full py-1 px-3 rounded-lg bg-white border outline-none text-gray-900 h-11"
                />

                {/* Stock */}
                <input
                  type="number"
                  value={item.stock}
                  onChange={(e) => updateSize(index, "stock", e.target.value)}
                  placeholder="Stock"
                  className="w-full py-1 px-3 rounded-lg bg-white border outline-none text-gray-900 h-11"
                />

                {/* Remove */}
                <button
                  type="button"
                  className="px-2 py-2 rounded-md bg-red-700 text-white"
                  onClick={() => removeSize(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              className="px-2 mt-3 py-2 rounded-md bg-black text-white"
              onClick={addSize}
            >
              Add Size
            </button>
          </div>
          <div className="">
            <h4 className="text-xs font-medium mb-2">Extra Product Images</h4>
            <label
              className={`flex flex-col gap-2 justify-center border w-fit items-center p-3 rounded-lg border-blue-500 cursor-pointer hover:bg-blue-700 nav-link hover:text-white `}
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                name="extraImages"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (!files.length) return;
                  setExtraImages(files);
                }}
                multiple
              />
              <div className="text-xl">
                <BsUpload />
              </div>
              <p>Upload</p>
            </label>
            <div className="flex gap-2 items-center">
              {extraImages.length > 0 &&
                extraImages.map((item, i) => {
                  return (
                    <div className="flex gap-2 items-center" key={i}>
                      <img
                        src={URL.createObjectURL(item)}
                        alt="preview"
                        className="w-24 h-24 my-3 object-cover rounded-md"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <label className="font-medium text-xs">Is isFeatured</label>
          <input
            type="checkbox"
            className="w-fit p-2"
            placeholder="Featured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          <button className="p-2 bg-black text-white" disabled={isPending}>
            {isPending ? "Adding..." : "Add Product"}
          </button>
        </form>
      </Dialog>
    </>
  );
}
