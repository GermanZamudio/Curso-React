import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { useFetch } from "../useFetch.js";
import styled from "styled-components";
import { Link } from 'react-router-dom';


// Estilos

const Container = styled.div`
  height: 100%;
  margin-bottom: 10%;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
`
const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width  : 90%;
`;

const ProductCard = styled.article`
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  width: 400px;
  height: 400px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 65%;
  object-fit: contain;
`;

const Title = styled.p`
  font-size: 15px;
  font-weight: bold;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  button{
    width: 20%;
    height: 40px;
    font-size: 16px;
    border-radius: 7px;
    cursor: pointer;
    color: #fff;
    background-color: #1979d8;
    border: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #125195;}
  }
`;

// Componente principal
function ProductList() {
  const { carrito, addProduct } = useContext(CarritoContext);

  const { data: productos, loading, error } = useFetch(
    "https://fakestoreapi.com/products/category/women's clothing"
  );

  return (
    <Container>
      <CardsContainer>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && <p style={{ fontSize: '30px' }}><strong>Cargando...</strong></p>}
        {!loading && !error && productos?.map(product => (
          <ProductCard key={product.id}>
            <Link to={`/Detalle/${product.id}`}>
            <ProductImage src={product.image} alt={product.title} />
            <Title>{product.title}</Title>
            </Link>
            <PriceContainer>
              <p><strong>Precio: </strong>${product.price}</p>
              <button onClick={() => addProduct(product)}>Agregar</button>
            </PriceContainer>
          </ProductCard>
        ))}
      </CardsContainer>
    </Container>
  );
}

export default ProductList;
