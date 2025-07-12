import React, { useState, useEffect } from 'react';
import { useFetch } from "../useFetch.js";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx'; 
import styled from "styled-components";

// Contenedor general con margen inferior y altura completa
const Container = styled.div`
  height: 100%;
  margin-bottom: 10%;
`;

// Contenedor para centrar el slider
const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
`;

// Fondo del producto con sombra y bordes redondeados
const ProductBack = styled.article`
  margin: 10px;
  padding: 10px;
  width: 1300px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #acacac;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 1400px) {
    width: 95vw;
    height: 400px;
  }
  @media (max-width: 768px) {
    width: 90vw;
    height: 300px;
  }
  @media (max-width: 480px) {
    width: 100vw;
    height: 250px;
    margin: 5px 0;
    padding: 5px;
  }
`;

// Imagen con borde redondeado y objeto cubriendo el área
const ProductImage = styled.img`
  width: 1300px;
  border-radius: 30px;
  height: 100%;
  object-fit: cover;

  @media (max-width: 1400px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    border-radius: 20px;
  }
  @media (max-width: 480px) {
    border-radius: 15px;
  }
`;

function Home() {
  const ACCESS_KEY = "VTw6tRO9eL5L3L_Pr0rN_ADU81my0Tgt20_W02hxfIs";
  const { data: apiResponse, loading, error } = useFetch(
    `https://api.unsplash.com/search/photos?query=fashion&per_page=10&client_id=${ACCESS_KEY}`
  );

  const [indiceActual, setIndiceActual] = useState(0);
  const productos = apiResponse?.results || [];

  useEffect(() => {
    if (productos.length === 0) return;

    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % productos.length);
    }, 4000);

    return () => clearInterval(intervalo); 
  }, [productos]);

  return (
    <div>
      <Navbar />
      
      <Container>
        <CardsContainer>
          {error && <p style={{ color: 'red' }}>{String(error)}</p>}
          {loading && <p style={{ fontSize: '20px' }}>Cargando...</p>}
          {!loading && !error && productos.length > 0 && (
            <ProductBack>
              <ProductImage
                src={productos[indiceActual].urls.regular}
                alt={productos[indiceActual].alt_description || "Imagen de moda"}
              />
            </ProductBack>
          )}
        </CardsContainer>
      </Container>  
      <Footer/>
    </div>
  );
}

export default Home;
