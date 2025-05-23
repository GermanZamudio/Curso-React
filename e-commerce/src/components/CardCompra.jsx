import React from 'react';
import styled from 'styled-components';

const NotificationCard = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #d4edda;
  color: #155724;
  padding: 16px 24px;
  border-left: 5px solid #28a745;
  border-radius: 8px;
  box-shadow: 0px 2px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  animation: slideIn 0.4s ease-out;

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function CompraNotificacion() {
  return (
    <NotificationCard>
      ✅ Su compra fue realizada con éxito
    </NotificationCard>
  );
}

export default CompraNotificacion;
