import React from 'react';
import './footer.css'; // Si deseas aplicar estilos específicos al footer

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Obtener el año actual dinámicamente

  return (
    <footer className="footer">
      <p>{currentYear} TeddyShop</p>
    </footer>
  );
};

export default Footer;