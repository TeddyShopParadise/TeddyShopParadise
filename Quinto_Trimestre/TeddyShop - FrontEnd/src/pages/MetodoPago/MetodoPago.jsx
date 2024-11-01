import React, { useEffect, useState } from 'react';
import './metodoPago.css';
const MetodoPago = () => {
  const [metodosPago, setMetodosPago] = useState([]);
  const [nuevoMetodo, setNuevoMetodo] = useState({ nombreMetodoPago: '', factura: '' });
  const [editarMetodo, setEditarMetodo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener todos los métodos de pago
  const fetchMetodosPago = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/metodoPago');
      const data = await response.json();
      setMetodosPago(data);
    } catch (error) {
      console.error('Error fetching métodos de pago:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetodosPago();
  }, []);

  // Crear un nuevo método de pago
  const crearMetodoPago = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/metodoPago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoMetodo),
      });
      if (response.ok) {
        fetchMetodosPago(); // Actualizar la lista
        setNuevoMetodo({ nombreMetodoPago: '', factura: '' });
      } else {
        console.error('Error creando método de pago');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Actualizar un método de pago
  const actualizarMetodoPago = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/metodoPago/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editarMetodo),
      });
      if (response.ok) {
        fetchMetodosPago(); // Actualizar la lista
        setEditarMetodo(null);
      } else {
        console.error('Error actualizando método de pago');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Eliminar un método de pago
  const eliminarMetodoPago = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/metodoPago/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchMetodosPago(); // Actualizar la lista
      } else {
        console.error('Error eliminando método de pago');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="MetodoPagos-container">
      <h2>Métodos de Pago</h2>
  
      <div className="MetodoPagos-form">
        <h3>Crear Método de Pago</h3>
        <input
          type="text"
          className="MetodoPagos-input"
          placeholder="Nombre del método de pago"
          value={nuevoMetodo.nombreMetodoPago}
          onChange={(e) => setNuevoMetodo({ ...nuevoMetodo, nombreMetodoPago: e.target.value })}
        />
        <input
          type="text"
          className="MetodoPagos-input"
          placeholder="Factura"
          value={nuevoMetodo.factura}
          onChange={(e) => setNuevoMetodo({ ...nuevoMetodo, factura: e.target.value })}
        />
        <button className="MetodoPagos-button" onClick={crearMetodoPago}>Crear</button>
      </div>
  
      <ul className="MetodoPago-list">
        {metodosPago.map((metodo) => (
          <li key={metodo._id} className="MetodoPago-item">
            <span>{metodo.nombreMetodoPago} - {metodo.factura}</span>
            <div>
              <button className="MetodoPago-action-button" onClick={() => setEditarMetodo(metodo)}>Editar</button>
              <button className="MetodoPago-action-button delete" onClick={() => eliminarMetodoPago(metodo._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
  
      {editarMetodo && (
        <div className="MetodoPagos-form">
          <h3>Editar Método de Pago</h3>
          <input
            type="text"
            className="MetodoPagos-input"
            placeholder="Nombre del método de pago"
            value={editarMetodo.nombreMetodoPago}
            onChange={(e) => setEditarMetodo({ ...editarMetodo, nombreMetodoPago: e.target.value })}
          />
          <input
            type="text"
            className="MetodoPagos-input"
            placeholder="Factura"
            value={editarMetodo.factura}
            onChange={(e) => setEditarMetodo({ ...editarMetodo, factura: e.target.value })}
          />
          <button className={`MetodoPagos-button ${editing ? 'editing' : ''}`} onClick={() => actualizarMetodoPago(editarMetodo._id)}>Actualizar</button>
          <button className="MetodoPagos-button" onClick={() => setEditarMetodo(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
  
};

export default MetodoPago;
