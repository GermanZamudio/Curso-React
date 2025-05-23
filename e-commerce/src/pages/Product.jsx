import React, { useState } from 'react';
import ListProduct from '../components/ProductList';
import CarritoModal from '../components/Modals/Carrito.jsx';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx'

function Product() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <Navbar openCarr={openModal} />
      <ListProduct />
      
      {showModal && <CarritoModal onClose={closeModal} />}
      <Footer/>
    </div>
  );
}

export default Product;
