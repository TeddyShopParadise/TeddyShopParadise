import React, { useEffect, useState } from 'react';
import './DetalleFactura.css';
const DetalleFactura = () => {
  const [detalles, setDetalles] = useState([]);
  const [detalle, setDetalle] = useState({
    numDetalle: '',
    precioDetalleFactura: '',
    cantidadDetalleFactura: '',
    inventarioIdInventario: '',
    productoIdProducto: '',
    facturaIdFactura: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Función para obtener los detalles de factura
  const fetchDetalles = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/detallesFactura', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener los detalles');
      }
      const data = await response.json();
      setDetalles(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Efecto para cargar detalles al montar el componente
  useEffect(() => {
    fetchDetalles();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setDetalle({ ...detalle, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario para crear o actualizar un detalle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `http://localhost:3000/api/detallesFactura/${editingId}` : 'http://localhost:3000/api/detallesFactura';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detalle),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el detalle de la factura');
      }

      fetchDetalles();
      setDetalle({
        numDetalle: '',
        precioDetalleFactura: '',
        cantidadDetalleFactura: '',
        inventarioIdInventario: '',
        productoIdProducto: '',
        facturaIdFactura: '',
      });
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar la edición de un detalle
  const handleEdit = (detalle) => {
    setDetalle(detalle);
    setEditingId(detalle._id);
  };

  // Manejar la eliminación de un detalle
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/detallesFactura/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el detalle de la factura');
      }

      fetchDetalles();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="DetalleFacturas-container">
      <h2>Detalles de Factura</h2>
      <form className="DetalleFacturas-form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="numDetalle"
          value={detalle.numDetalle}
          onChange={handleChange}
          placeholder="Número de Detalle"
          required
          className="DetalleFacturas-input"
        />
        <input
          type="number"
          name="precioDetalleFactura"
          value={detalle.precioDetalleFactura}
          onChange={handleChange}
          placeholder="Precio"
          required
          className="DetalleFacturas-input"
        />
        <input
          type="number"
          name="cantidadDetalleFactura"
          value={detalle.cantidadDetalleFactura}
          onChange={handleChange}
          placeholder="Cantidad"
          required
          className="DetalleFacturas-input"
        />
        <input
          type="text"
          name="inventarioIdInventario"
          value={detalle.inventarioIdInventario}
          onChange={handleChange}
          placeholder="ID de Inventario"
          className="DetalleFacturas-input"
        />
        <input
          type="text"
          name="productoIdProducto"
          value={detalle.productoIdProducto}
          onChange={handleChange}
          placeholder="ID de Producto"
          className="DetalleFacturas-input"
        />
        <input
          type="text"
          name="facturaIdFactura"
          value={detalle.facturaIdFactura}
          onChange={handleChange}
          placeholder="ID de Factura"
          className="DetalleFacturas-input"
        />
        <button
          type="submit"
          className={`DetalleFacturas-button ${editingId ? 'editing' : ''}`}
        >
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
      </form>
  
      <h3>Lista de Detalles</h3>
      <ul className="DetalleFactura-list">
        {detalles.map((d) => (
          <li key={d._id} className="DetalleFactura-item">
            <span>{`Detalle #${d.numDetalle}, Precio: ${d.precioDetalleFactura}, Cantidad: ${d.cantidadDetalleFactura}`}</span>
            <button
              onClick={() => handleEdit(d)}
              className="DetalleFactura-action-button"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(d._id)}
              className="DetalleFactura-action-button DetalleFactura-action-button.delete"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default DetalleFactura;
