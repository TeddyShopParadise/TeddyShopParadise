import React, { useEffect, useState } from 'react';
import './factura.css';

const Facturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [factura, setFactura] = useState({
    fechaCreacionFactura: '',
    horaCreacionFactura: '',
    pedido: '',
    cliente: '',
    detallesFactura: [],
    metodoPago: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    listarFacturas();
  }, []);

  const listarFacturas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/factura');
      const data = await response.json();
      setFacturas(data);
    } catch (error) {
      console.error('Error al listar las facturas:', error);
    }
  };

  const crearFactura = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/factura', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
      });

      if (response.ok) {
        setFactura({
          fechaCreacionFactura: '',
          horaCreacionFactura: '',
          pedido: '',
          cliente: '',
          detallesFactura: [],
          metodoPago: '',
        });
        listarFacturas();
      } else {
        console.error('Error al crear factura:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la creación de factura:', error);
    }
  };

  const actualizarFactura = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/factura/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
      });

      if (response.ok) {
        setEditing(false);
        setCurrentId(null);
        setFactura({
          fechaCreacionFactura: '',
          horaCreacionFactura: '',
          pedido: '',
          cliente: '',
          detallesFactura: [],
          metodoPago: '',
        });
        listarFacturas();
      } else {
        console.error('Error al actualizar factura:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la actualización de factura:', error);
    }
  };

  const obtenerFacturaPorId = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/factura/${id}`);
      const data = await response.json();
      setFactura(data);
      setEditing(true);
      setCurrentId(id);
    } catch (error) {
      console.error('Error al obtener factura:', error);
    }
  };

  const eliminarFactura = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/factura/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        listarFacturas();
      } else {
        console.error('Error al eliminar factura:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la eliminación de factura:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFactura((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      actualizarFactura();
    } else {
      crearFactura();
    }
  };

  return (
    <div className="Facturas-container">
      <h2>{editing ? 'Actualizar Factura' : 'Crear Factura'}</h2>
      <form className="Facturas-form" onSubmit={handleSubmit}>
        <input
          className="Facturas-input"
          type="date"
          name="fechaCreacionFactura"
          value={factura.fechaCreacionFactura}
          onChange={handleChange}
          required
        />
        <input
          className="Facturas-input"
          type="time"
          name="horaCreacionFactura"
          value={factura.horaCreacionFactura}
          onChange={handleChange}
          required
        />
        <input
          className="Facturas-input"
          type="text"
          name="pedido"
          value={factura.pedido}
          onChange={handleChange}
          placeholder="ID del pedido"
          required
        />
        <input
          className="Facturas-input"
          type="text"
          name="cliente"
          value={factura.cliente}
          onChange={handleChange}
          placeholder="ID del cliente"
          required
        />
        <input
          className="Facturas-input"
          type="text"
          name="detallesFactura"
          value={factura.detallesFactura.join(', ')}
          onChange={(e) =>
            handleChange({
              target: {
                name: 'detallesFactura',
                value: e.target.value.split(', '),
              },
            })
          }
          placeholder="Detalles de la factura (separados por comas)"
          required
        />
        <input
          className="Facturas-input"
          type="text"
          name="metodoPago"
          value={factura.metodoPago}
          onChange={handleChange}
          placeholder="ID del método de pago"
          required
        />
        <button
          className={`Facturas-button ${editing ? 'editing' : ''}`}
          type="submit"
        >
          {editing ? 'Actualizar' : 'Crear'}
        </button>
      </form>
  
      <h2>Lista de Facturas</h2>
      <ul className="Factura-list">
        {facturas.map((factura) => (
          <li className="Factura-item" key={factura._id}>
            {`${factura.fechaCreacionFactura} - ${factura.horaCreacionFactura}`}
            <div>
              <button
                className="Factura-action-button"
                onClick={() => obtenerFacturaPorId(factura._id)}
              >
                Editar
              </button>
              <button
                className="Factura-action-button delete"
                onClick={() => eliminarFactura(factura._id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default Facturas;
