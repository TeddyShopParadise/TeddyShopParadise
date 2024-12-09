import React, { useState } from "react";
import { Grid, Container, Typography, Box, Button } from "@mui/material";
import logoTeddyShop from "../../assets/img/LogoTeddyShop.jpg";
import FaqSection from "../../assets/ts/FaqSection";
import "./Home.css";

const Home = () => {

  const [selectedImage, setSelectedImage] = useState("Sukuna");

  const handleChange = (e) => {
    setSelectedImage(e.target.value);
  };

  //PRODUCTOS MAS VENDIDOS
  const bestSellers = [
    {
      id: 1,
      name: "Osito Clásico",
      image: "https://images.unsplash.com/photo-1556012018-50c5c0da73bf?w=800",
      price: 79900,
      originalPrice: 99900,
      discount: "20% OFF",
    },
    {
      id: 2,
      name: "Panda Gigante",
      image: "https://images.unsplash.com/photo-1556012018-50c5c0da73bf?w=800",
      price: 149900,
      originalPrice: 189900,
      discount: "25% OFF",
    },
    {
      id: 3,
      name: "Conejo Rosa",
      image: "https://images.unsplash.com/photo-1556012018-50c5c0da73bf?w=800",
      price: 69900,
      originalPrice: 89900,
      discount: "15% OFF",
    },
    {
      id: 4,
      name: "León Dormilón",
      image: "https://images.unsplash.com/photo-1556012018-50c5c0da73bf?w=800",
      price: 99900,
      originalPrice: 129900,
      discount: "30% OFF",
    },
  ];

  return (
    <Container disableGutters sx={{ maxWidth: "100vw", padding: 0, margin: 0 }}>
    <div className="background-image"></div>

     {/* Sección de Carrusel */}
      <Box
          sx={{
            height: { xs: "auto", md: "auto" },
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            margin: 0,
            padding: 0,
            py: 2, // Ajuste de padding en pantallas pequeñas
          }}
      >
      <Box
            sx={{
              width: "90%",
              maxWidth: "100%",
              padding: { xs: "20px", md: "50px" },
              background: "linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))",
              borderRadius: "30px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              backgroundSize: "200% 200%",
              animation: "shimmer 10s infinite linear",
            }}
        >
        <div>
        <fieldset style={{ width: "125%", height: "500px", borderRadius: "30px", border: "none"}}>
          <label
            style={{
              backgroundImage: `url('https://i.imgur.com/Je6A2XM.jpeg')`,
            }}
          >
            <input
              type="radio"
              name="images"
              value="Sukuna"
              checked={selectedImage === "Sukuna"}
              onChange={handleChange}
              style={{ display: "none" }}//Ocultar recuadro de la imagen
            />
          </label>
          <label
            style={{
              backgroundImage: `url('https://i.imgur.com/o2l4WPS.jpeg')`,
            }}
          >
            <input
              type="radio"
              name="images"
              value="Toji"
              checked={selectedImage === "Toji"}
              onChange={handleChange}
              style={{ display: "none" }}//Ocultar recuadro de la imagen
            />
          </label>
          <label
            style={{
              backgroundImage: `url('https://i.imgur.com/PexTLvB.jpeg')`,
            }}
          >
            <input
              type="radio"
              name="images"
              value="Yuta"
              checked={selectedImage === "Yuta"}
              onChange={handleChange}
              style={{ display: "none" }}//Ocultar recuadro de la imagen
            />
          </label>
        </fieldset>
      </div>
      </Box>
      </Box>



      {/* Sección de bienvenida */}
      <Box
        sx={{
          height: { xs: "auto", md: "auto" },
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          margin: 0,
          padding: 0,
          py: 2, // Ajuste de padding en pantallas pequeñas
        }}
      >
      <Box
          sx={{
            width: "98%",
            maxWidth: "600px",
            padding: { xs: "20px", md: "50px" },
            background: "linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))",
            borderRadius: "30px",
            textAlign: "center",
            backdropFilter: "blur(8px)",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            backgroundSize: "200% 200%",
            animation: "shimmer 2s infinite linear",
          }}
      >
          <img
            src={logoTeddyShop}
            alt="Peluches.oso Logo"
            style={{
              width: "200px",
              height: "200px",
              marginBottom: "20px",
              maxWidth: "80%", // Ajuste para dispositivos móviles
            }}
          />
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "#2f2f2f" }}
          >
            PELUCHES.OSO
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, color: "black" }}
          >
            ¡Bienvenidos a Peluches.oso! Encuentra el compañero de peluche
            perfecto para todas las edades.
          </Typography>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              color: "black",
              justifyContent: "space-evenly",
              padding: 0,
              listStyle: "none",
              marginTop: "20px",
            }}
          >
            <li>Suaves y abrazables</li>
            <li>Variedad de tamaños, colores y estilos</li>
            <li>Materiales de alta calidad y seguros para niños</li>
            <li>Más que solo juguetes, son amigos para toda la vida</li>
          </ul>
          <Typography variant="body1" sx={{ color: "black" }}>
            ¡Que esperas para ordenar tu peluche! ¡Te esperamos en Peluches.oso!
          </Typography>
        </Box>
      </Box>


      {/* Sección de Catalogos */}
      <Box
        sx={{
          minHeight: { xs: "auto", md: "auto" },
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          position: "relative",
        }}
      >
      <Box
          sx={{
            width: "90%",
            maxWidth: "1200px",
            padding: { xs: "20px", md: "50px" },
            background: "linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))",
            borderRadius: "30px",
            backdropFilter: "blur(8px)",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            backgroundSize: "200% 200%",
            animation: "shimmer 2s infinite linear",
          }}
      >
          <Typography
            variant="h2"
            sx={{
              color: "#2f2f2f",
              fontSize: { xs: "2rem", md: "3rem" },
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            CATÁLOGOS
          </Typography>
          <section className="container">
          <div className="card-grid">
            <a className="card">
              <div
                className="backgroundCat"
                style={{
                  backgroundImage: 'url(https://imgur.com/i1VnFF8.jpeg)',
                }}
              ></div>
              <div className="contentCat">
                <p className="category"></p>
                <p className="category">Importados</p>
              </div>
            </a>

            <a className="card">
              <div
                className="backgroundCat"
                style={{
                  backgroundImage: 'url(https://imgur.com/ucTEu2r.jpeg',
                }}
              ></div>
              <div className="contentCat">
                <p className="category"></p>
                <p className="category">General</p>
              </div>
            </a>

            <a className="card">
              <div
                className="backgroundCat"
                style={{
                  backgroundImage: 'url(https://i.imgur.com/nTWfEGu.jpeg)',
                }}
              ></div>
              <div className="contentCat">
                <p className="category"></p>
                <p className="category">Fechas Especiales</p>
              </div>
            </a>
            </div>
          </section>
        </Box>  
      </Box>


      {/* Sección de los más vendidos */}
      <Box
        sx={{
          minHeight: { xs: "auto", md: "auto" },
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          position: "relative",
        }}
      >
      <Box
          sx={{
            width: "90%",
            maxWidth: "1200px",
            padding: { xs: "20px", md: "50px" },
            background: "linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))",
            borderRadius: "30px",
            backdropFilter: "blur(8px)",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            backgroundSize: "200% 200%",
            animation: "shimmer 2s infinite linear",
          }}
      >
          <Typography
            variant="h2"
            sx={{
              color: "#2f2f2f",
              fontSize: { xs: "2rem", md: "3rem" },
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            LOS MÁS VENDIDOS
          </Typography>
          
          <Grid container spacing={4}>
            {bestSellers.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <div className="product-card">
                  <div style={{ position: "relative" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <span className="product-badge">{product.discount}</span>
                  </div>
                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        color: "#2f2f2f",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <div className="price-tag">
                      <span className="original-price">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                      ${product.price.toLocaleString()}
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(product)}
                      sx={{ mt: 2 }}
                    >
                      Agregar al carrito
                    </Button>
                  </Box>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>


      {/* Sección de preguntas frecuentes */}
      <Box
        sx={{
          minHeight: { xs: "auto", md: "auto" },
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "1200px",
            padding: { xs: "20px", md: "50px" },
            background: "linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))",
            borderRadius: "30px",
            backdropFilter: "blur(8px)",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            backgroundSize: "200% 200%",
            animation: "shimmer 2s infinite linear",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#2f2f2f",
              fontSize: { xs: "2rem", md: "3rem" },
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            PREGUNTAS FRECUENTES
          </Typography>
          <div className="accordion-container">
            <FaqSection />
          </div>
        </Box>
      </Box>



      {/* Sección de ubicación */}
      <Box
        sx={{
          height: { xs: "auto", md: "auto" },
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 0,
          py: 2,
        }}
      >
        <Box
          sx={{
            width: "98%",
            maxWidth: "800px",
            maxHeight: "1000px",
            padding: { xs: "20px", md: "50px" },
            background: "linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))",
            borderRadius: "30px",
            backdropFilter: "blur(8px)",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
            backgroundSize: "200% 200%",
            animation: "shimmer 2s infinite linear",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#2f2f2f",
              fontSize: { xs: "2rem", md: "3rem" },
              marginBottom: "20px",
            }}
          >
            NOS UBICAMOS EN
          </Typography>
          <iframe
            title="Ubicación Peluches.oso"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d5624.3892489766695!2d-74.19486199590521!3d4.586165152583506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMzUnMjYuMSJOIDc0wrAxMSczNy4zIlc!5e0!3m2!1ses-419!2sco!4v1719348345914!5m2!1ses-419!2sco"
            style={{
              width: "100%",
              height: "300px",
              border: "0",
              marginBottom: "20px",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
