import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaFacebook, FaPhone, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #222;
  color: #eee;
  padding: 20px 0;
  text-align: center;
`;

const IconsContainer = styled.div`
  margin: 10px 0;

  a {
    color: #eee;
    margin: 0 15px;
    font-size: 24px;
    transition: color 0.3s ease;

    &:hover {
      color: #1e90ff;
    }
  }
`;

const Info = styled.p`
  margin: 5px 0;
  font-size: 14px;
`;

function Footer() {
  return (
    <FooterContainer>
      <IconsContainer>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="tel:+543412223344"><FaPhone /></a>
        <a href="mailto:info@ejemplo.com"><FaEnvelope /></a>
      </IconsContainer>
      <Info>© {new Date().getFullYear()}  Projecto React - Todos los derechos reservados</Info>
    </FooterContainer>
  );
}

export default Footer;
