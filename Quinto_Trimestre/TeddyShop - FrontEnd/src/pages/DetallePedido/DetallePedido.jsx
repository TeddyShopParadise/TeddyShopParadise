import React, { useEffect, useState } from 'react';
import './DetallePedido.css';


const DetallePedido = () => {
  const [detalles, setDetalles] = useState([]);
  const [detalle, setDetalle] = useState({
    numDetalle: '',
    precioDetallePedido: '',
    cantidadDetallePedido: '',
    pedidoNumPedido: '',
    productoIdProducto: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Función para obtener los detalles de pedido
  const fetchDetalles = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/detallesPedido', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener los detalles de pedido');
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
    const url = editingId 
      ? `http://localhost:3000/api/detallesPedido/${editingId}` 
      : 'http://localhost:3000/api/detallesPedido';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detalle),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el detalle de pedido');
      }

      fetchDetalles();
      setDetalle({
        numDetalle: '',
        precioDetallePedido: '',
        cantidadDetallePedido: '',
        pedidoNumPedido: '',
        productoIdProducto: '',
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
      const response = await fetch(`http://localhost:3000/api/detallesPedido/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el detalle de pedido');
      }

      fetchDetalles();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="DetallePedidos-container">
      <h2>Detalles de Pedido</h2>
      <form className="DetallePedidos-form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="numDetalle"
          value={detalle.numDetalle}
          onChange={handleChange}
          placeholder="Número de Detalle"
          required
          className="DetallePedidos-input"
        />
        <input
          type="number"
          name="precioDetallePedido"
          value={detalle.precioDetallePedido}
          onChange={handleChange}
          placeholder="Precio"
          required
          className="DetallePedidos-input"
        />
        <input
          type="number"
          name="cantidadDetallePedido"
          value={detalle.cantidadDetallePedido}
          onChange={handleChange}
          placeholder="Cantidad"
          required
          className="DetallePedidos-input"
        />
        <input
          type="text"
          name="pedidoNumPedido"
          value={detalle.pedidoNumPedido}
          onChange={handleChange}
          placeholder="ID de Pedido"
          required
          className="DetallePedidos-input"
        />
        <input
          type="text"
          name="productoIdProducto"
          value={detalle.productoIdProducto}
          onChange={handleChange}
          placeholder="ID de Producto"
          required
          className="DetallePedidos-input"
        />
        <button
          type="submit"
          className={`DetallePedidos-button ${editingId ? 'editing' : ''}`}
        >
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
      </form>
  
      <h3>Lista de Detalles</h3>
      <ul className="DetallePedido-list">
        {detalles.map((d) => (
          <li key={d._id} className="DetallePedido-item">
            <span>{`Detalle #${d.numDetalle}, Precio: ${d.precioDetallePedido}, Cantidad: ${d.cantidadDetallePedido}`}</span>
            <button
              onClick={() => handleEdit(d)}
              className="DetallePedido-action-button"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(d._id)}
              className="DetallePedido-action-button delete"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default DetallePedido;
