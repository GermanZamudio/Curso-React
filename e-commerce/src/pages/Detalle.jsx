import { useParams } from "react-router-dom";
import React from 'react';
import { useFetch } from "../useFetch";
import styled from "styled-components";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx';

const DetalleProduct = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  flex-direction: column;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
`;

const ProductImage = styled.img`
  width: 250px;
  height: auto;
  margin-bottom: 20px;
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  max-width: 600px;
  margin-bottom: 20px;
`;

const ProductPrice = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #1a8917;
  margin-bottom: 10px;
`;

const ProductCategory = styled.span`
  font-size: 14px;
  font-style: italic;
  color: #555;
`;

function Detalle() {
  const { id } = useParams();

  //Me base en algunos videos, que mostraban de hacer un archivo js para el llamado a las APIS. Es como una funcion global. Me parecio algo copado.
  const { data: product, loading, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`
  );

  return (
    <div>
      <Navbar />
      {error && <p style={{ color: 'red' }}>{String(error)}</p>}
      {loading && <p style={{ fontSize: '20px' }}>Cargando...</p>}

      {!loading && product && (
        <DetalleProduct>
          <ProductImage src={product.image} alt={product.title} />
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>Precio: ${product.price}</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductCategory>Categoría: {product.category}</ProductCategory>
        </DetalleProduct>
      )}
    <Footer/>
    </div>
  );
}

export default Detalle;
