import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { useFetch } from "../useFetch.js";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100%;
  margin-bottom: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 90%;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    gap: 0.75rem;
  }
`;

const ProductCard = styled.article`
  border: 1px solid #ccc;
  padding: 10px;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  background: #fff;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
  }

  @media (max-width: 768px) {
    width: 90vw;
    height: auto;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 65%;
  object-fit: contain;
  border-radius: 6px;
`;

const Title = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin: 0.5rem 0;
  flex-grow: 1;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 0 0;

  p {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  button {
    width: 30%;
    height: 40px;
    font-size: 16px;
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
      width: 40%;
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

  // Asegurar arrays válidos
  const productosSafe = Array.isArray(productos) ? productos : [];
  const productosMockSafe = Array.isArray(productosMock) ? productosMock : [];

  // Agregar campo "source" para diferenciar el origen
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
              <Link to={`/Detalle/${product.source}/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
