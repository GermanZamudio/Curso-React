import { useParams } from "react-router-dom";
import React from "react";
import { useFetch } from "../useFetch";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px 40px;
  flex-direction: column;
  font-family: "Open Sans", sans-serif;
  min-height: calc(100vh - 160px);
  background-color: #f9f9f9;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
  transition: all 0.3s ease;
`;

const ProductImage = styled.img`
  width: 240px;
  height: 300px;
  border-radius: 12px;
  margin-bottom: 24px;
  object-fit: contain;
`;

const ProductTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 12px;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a8917;
  margin-bottom: 16px;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ProductCategory = styled.span`
  display: block;
  font-size: 0.9rem;
  font-style: italic;
  color: #888;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-top: 80px;
`;

function Detalle() {
  const { id, source } = useParams();

  const url =
    source === "mock"
      ? `https://686fde294838f58d11233057.mockapi.io/api/products/${id}`
      : `https://fakestoreapi.com/products/${id}`;

  const { data: product, loading, error } = useFetch(url);

  return (
    <>
      <Navbar />
      <Container>
        {loading && <Message>Cargando producto...</Message>}
        {error && <Message style={{ color: "red" }}>{String(error)}</Message>}

        {!loading && product && (
          <Card>
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>${product.price}</ProductPrice>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductCategory>Categoría: {product.category}</ProductCategory>
          </Card>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Detalle;
