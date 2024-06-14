// src/App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Products from "./pages/Product";
import image1 from "./images/C1.jpg";
import image2 from "./images/C2.jpg";
import image3 from "./images/C3.webp";
import image4 from "./images/C4.jpg";
import image5 from "./images/C5.webp";
import image6 from "./images/C6.jpg";
import image7 from "./images/C7.webp";
import image8 from "./images/C8.webp";
import image9 from "./images/C9.webp";
import image10 from "./images/C10.webp";
import image11 from "./images/C11.webp";
import image12 from "./images/C12.jpg";
import image13 from "./images/C13.webp";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const images = [
    { src: `${image1}`, alt: "Image 1" },
    { src: `${image2}`, alt: "image2" },
    { src: `${image3}`, alt: "image3" },
    { src: `${image4}`, alt: "image4" },
    { src: `${image5}`, alt: "image5" },
    { src: `${image6}`, alt: "image6" },
    { src: `${image7}`, alt: "image7" },
    { src: `${image8}`, alt: "image8" },
    { src: `${image9}`, alt: "image9" },
    { src: `${image10}`, alt: "Image10" },
    { src: `${image11}`, alt: "Image11" },
    { src: `${image12}`, alt: "Image12" },
    { src: `${image13}`, alt: "Image13" },
  ];

  const handleLogin = (username) => {
    console.log('"first"', username);
    setIsLoggedIn(true);
    setUser(username);
  };

  console.log("isLoggedIn", isLoggedIn);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser("");
  };
  useEffect(() => {
    if (isLoggedIn) {
      console.log("navigate");
      <Routes>
        <Route path="/products" element={<Products />} />
      </Routes>;
    }
  }, [isLoggedIn]);
  console.log("user", user);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isLoggedIn={isLoggedIn}
              user={user}
              onLogout={handleLogout}
              images={images}
            />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/products"
          element={
            isLoggedIn ? (
              <Products
                isLoggedIn={isLoggedIn}
                user={user}
                onLogout={handleLogout}
                images={images}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
