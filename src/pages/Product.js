import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import HomePage from "./HomePage";

const Products = ({ isLoggedIn, user, onLogout, images }) => {
  const [productData, setProductdata] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedData, setSortedData] = useState([...productData]); // Initially unsorted
  const [limit, setLimit] = useState(10); // Initial limit
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProductdata(data || []))
      .catch((error) => console.log(error));
  };
  const handleView = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleUpdate = async (id) => {
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: newTitle,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // setProductdata((productData) => [...productData, data]);
        const updatedproductData = productData.map((user) => {
          if (user.id === id) {
            user.title = newTitle;
          }

          return user;
        });

        setProductdata((productData) => updatedproductData);
        setSelectedProduct(null);
        setOpen(false);
        alert("Product updated");
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = async (id) => {
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setProductdata(
            productData.filter((user) => {
              return user.id !== id;
            })
          );
          alert("Product deleted");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const filteredProducts = productData.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
    setProductdata(filteredProducts);
  }, [limit, searchTerm]);

  const sortItems = (order) => {
    const sortedItems = [...productData].sort((a, b) => {
      if (a.title < b.title) return order === "asc" ? -1 : 1;
      if (a.title > b.title) return order === "asc" ? 1 : -1;
      return 0;
    });
    setProductdata(sortedItems);
  };
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    sortItems(newOrder);
  };
  console.log("sortedData", sortedData);
  const handleLimitChange = async (event) => {
    console.log("event.target.value", event.target.value);
    setLimit(parseInt(event.target.value, 10));
    await fetch(
      `https://fakestoreapi.com/products?limit=${parseInt(event.target.value)}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setProductdata(data))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <HomePage
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
        images={images}
      />
      <Container>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <button onClick={toggleSortOrder}>
            Sort by Title ({sortOrder === "asc" ? "Descending" : "Ascending"})
          </button>
          <select value={limit} onChange={handleLimitChange}>
            <option value={5}>Show 5</option>
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
          </select>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Title</TableCell>
                <TableCell>Product Price</TableCell>
                <TableCell>Product Description</TableCell>
                <TableCell>Product Category</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleView(product)}>View</Button>
                    <Button onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Product Details</DialogTitle>
          <DialogContent>
            {selectedProduct && (
              <>
                <img
                  src={selectedProduct.image}
                  height={"200px"}
                  width={"200px"}
                />
                <TextField
                  margin="dense"
                  label="Title"
                  type="text"
                  fullWidth
                  defaultValue={selectedProduct.title}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Price"
                  type="text"
                  fullWidth
                  value={selectedProduct.price}
                  disabled
                />
                <TextField
                  margin="dense"
                  label="Description"
                  type="text"
                  fullWidth
                  value={selectedProduct.description}
                  disabled
                />
                <TextField
                  margin="dense"
                  label="Category"
                  type="text"
                  fullWidth
                  value={selectedProduct.category}
                  disabled
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => handleUpdate(selectedProduct.id)}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Products;
