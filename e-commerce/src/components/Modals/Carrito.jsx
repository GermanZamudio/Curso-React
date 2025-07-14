import React, { useContext, useState } from 'react';
import { CarritoContext } from "../../context/CarritoContext";
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import CompraNotificacion from '../CardCompra';

const ModalContainer = styled.div`
  font-family: 'Inter', sans-serif; 
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 35%;
  max-width: 400px;
  background-color: white;
  padding: 30px;
  overflow: hidden;
  z-index: 1100;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.1);
  animation: ${props => props.isClosing ? 'slideOut 0.4s ease forwards' : 'slideIn 0.4s ease-out forwards'};

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
  }

  @media (max-width: 800px) {
    width: 80%;
    max-width: 400px;
    padding: 20px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1099;
  opacity: ${props => props.isClosing ? 0 : 1};
  transition: opacity 0.4s ease;
`;

const ContenidoModal = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseIcon = styled(IoClose)`
  font-size: 30px;
  cursor: pointer;
  color: #333;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
    color: #000;
  }
`;

const ContenidoLista = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Item = styled.div`
  .containercontrols {
    display: flex;
    justify-content: space-around;
    align-items: start;
  }

  .controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    gap: 10px;
  }

  .cant {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 60%;
  }

  .buttons {
    display: flex;
    width: 60%;
    align-items: center;
    justify-content: space-around;

    button {
      padding: 4px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      border: none;
      border-radius: 4px;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .add {
      background-color: #28a745;

      &:hover {
        background-color: #218838;
        box-shadow: 0 0 8px rgba(40, 167, 69, 0.5);
      }
    }

    .rest {
      background-color: #dc3545;

      &:hover {
        background-color: #c82333;
        box-shadow: 0 0 8px rgba(220, 53, 69, 0.5);
      }
    }

    .delete {
      background: #ffffff;
      color: #000000;
      width: 40px;
      transition: all 0.3s ease;

      &:hover {
        color: #ff0505;
        border-color: #ff0505;
      }
    }
  }
`;

const Footer = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: start;
  flex-direction: column;
  border-top: 1px solid #ddd;
  font-weight: bold;

  .botonesCompra {
    display: flex;
    width: 100%;
    max-width: 300px;
    justify-content: space-around;
  }

  button {
    padding: 10px;
    font-size: 16px;
    border-radius: 7px;
    cursor: pointer;
  }

  .Vaciar {
    color: #f54d4d;
    border: solid 1px #f54d4d;
    background-color: transparent;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f54d4d;
      color: white;
    }
  }

  .Comprar {
    color: #fff;
    background-color: #1979d8;
    border: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #125195;
    }
  }
`;

function Carrito({ onClose }) {
  const { carrito, Compra, VaciarProduct, addCant, restarCant, removeProduct } = useContext(CarritoContext);

  const [showNotification, setShowNotification] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const total = carrito.reduce((acc, item) => acc + parseFloat(item.price || 0) * item.quantity, 0);

  const handleCompra = () => {
    Compra();
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  return (
    <>
      <Overlay onClick={handleClose} isClosing={isClosing} />
      <ModalContainer isClosing={isClosing} onAnimationEnd={handleEnd}>
        <ContenidoModal>
          <Header>
            <h2>Carrito de compras</h2>
            <CloseIcon onClick={handleClose} />
          </Header>

          <ContenidoLista>
            {carrito.map(item => (
              <Item key={`${item.source}-${item.id}`}>
                <h4>{item.title}</h4>
                <div className="containercontrols">
                  <div className="price"><strong>Precio:</strong> ${parseFloat(item.price || 0).toFixed(2)}</div>
                  <div className="controls">
                    <div className="cant">
                      <span><strong>Cantidad:</strong> {item.quantity}</span>
                    </div>
                    <div className="buttons">
                      <button className='add' onClick={() => addCant(item.id)}>+</button>
                      <button className='rest' onClick={() => restarCant(item.id)}>-</button>
                      <button className="delete" onClick={() => removeProduct(item.id)}><MdDelete size={25} /></button>
                    </div>
                  </div>
                </div>
              </Item>
            ))}
          </ContenidoLista>

          <Footer>
            <h1>Total: ${total.toFixed(2)}</h1>
            <div className="botonesCompra">
              <button className='Vaciar' onClick={VaciarProduct}>Vaciar Carrito</button>
              <button className='Comprar' onClick={handleCompra}>Realizar Compra</button>
            </div>
          </Footer>

          {showNotification && <CompraNotificacion />}
        </ContenidoModal>
      </ModalContainer>
    </>
  );
}

export default Carrito;
