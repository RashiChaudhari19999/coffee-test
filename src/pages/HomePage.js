import React from "react";
import Navbar from "../Components/Navbar";
import ImageCarousel from "../Components/ImageCarousel";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const HomePage = ({ isLoggedIn, user, onLogout, images }) => (
  <>
    <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
    <Container>
      <ImageCarousel images={images} />
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to the Home Page
      </Typography>
    </Container>
  </>
);

export default HomePage;
