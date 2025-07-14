import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { useFetch } from "../useFetch.js";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1400px;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
`;

const ProductCard = styled.article`
  border: 1px solid #ccc;
  padding: 15px;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    height: auto;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 6px;
  margin-bottom: 1rem;
`;

const Title = styled.p`
  font-size: 1rem;
  font-weight: bold;
  flex-grow: 1;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  button {
    padding: 8px 14px;
    font-size: 0.9rem;
    border-radius: 7px;
    cursor: pointer;
    color: #fff;
    background-color: #1979d8;
    border: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #125195;
    }

    @media (max-width: 768px) {
      font-size: 14px;
      height: 36px;
    }
  }
`;

function ProductList() {
  const { addProduct } = useContext(CarritoContext);

  const { data: productos, loading, error } = useFetch(
    "https://fakestoreapi.com/products/category/women's clothing"
  );

  const {
    data: productosMock,
    loading: loadingMock,
    error: errorMock,
  } = useFetch("https://686fde294838f58d11233057.mockapi.io/api/products");

  const productosSafe = Array.isArray(productos) ? productos : [];
  const productosMockSafe = Array.isArray(productosMock) ? productosMock : [];

  const productosFormateados = productosSafe.map((p) => ({
    ...p,
    source: "public",
  }));

  const productosMockFormateados = productosMockSafe.map((p) => ({
    ...p,
    source: "mock",
  }));

  const allProducts = [...productosFormateados, ...productosMockFormateados];

  return (
    <Container>
      <CardsContainer>
        {(loading || loadingMock) && (
          <p style={{ fontSize: "30px" }}>
            <strong>Cargando...</strong>
          </p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {errorMock && <p style={{ color: "red" }}>{errorMock}</p>}

        {!loading &&
          !loadingMock &&
          !error &&
          !errorMock &&
          allProducts.map((product) => (
            <ProductCard key={`${product.source}-${product.id}`}>
              <Link
                to={`/Detalle/${product.source}/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductImage src={product.image} alt={product.title} />
                <Title>{product.title}</Title>
              </Link>
              <PriceContainer>
                <p>
                  <strong>Precio: </strong>${product.price}
                </p>
                <button onClick={() => addProduct(product)}>Agregar</button>
              </PriceContainer>
            </ProductCard>
          ))}
      </CardsContainer>
    </Container>
  );
}

export default ProductList;
