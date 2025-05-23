import React, { useState, useEffect } from 'react';
import { useFetch } from "../useFetch.js";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx'; 
import styled from "styled-components";

// Estilos, use styled-components. Ya lo habia usado en algunos proyectos personales.
const Container=styled.div`
    height: 100%;
    margin-bottom: 10%;
    `
const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;

`;

const ProductBack = styled.article`
 margin: 10px;
  padding: 10px;
  width: 1500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #acacac;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
`;

const ProductImage = styled.img`
  width: 1300px;
  border-radius:30px;
  height: 100%;
  object-fit: cover;
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
