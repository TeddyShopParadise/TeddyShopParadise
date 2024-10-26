import React, { useEffect, useState } from 'react';

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [formData, setFormData] = useState({
    fecha: '',
    cantidadIngreso: 0,
    cantidadVendida: 0,
    inventario: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMovimientos();
  }, []);

  const fetchMovimientos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/movimiento');
      const data = await response.json();
      setMovimientos(data);
    } catch (error) {
      console.error('Error fetching movimientos:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId 
      ? `http://localhost:3000/api/movimiento/${editId}` 
      : 'http://localhost:3000/api/movimiento';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchMovimientos();
        setFormData({ fecha: '', cantidadIngreso: 0, cantidadVendida: 0, inventario: '' });
        setEditId(null);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating/updating movimiento:', error);
    }
  };

  const handleEdit = (movimiento) => {
    setFormData({
      fecha: movimiento.fecha,
      cantidadIngreso: movimiento.cantidadIngreso,
      cantidadVendida: movimiento.cantidadVendida,
      inventario: movimiento.inventario
    });
    setEditId(movimiento._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/movimiento/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchMovimientos();
      } else {
        console.error('Error deleting movimiento:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting movimiento:', error);
    }
  };

  return (
    <div>
      <h1>Movimientos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cantidadIngreso"
          value={formData.cantidadIngreso}
          onChange={handleChange}
          placeholder="Cantidad Ingreso"
          required
        />
        <input
          type="number"
          name="cantidadVendida"
          value={formData.cantidadVendida}
          onChange={handleChange}
          placeholder="Cantidad Vendida"
          required
        />
        <input
          type="text"
          name="inventario"
          value={formData.inventario}
          onChange={handleChange}
          placeholder="Inventario ID"
          required
        />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
      </form>
      <ul>
        {movimientos.map((movimiento) => (
          <li key={movimiento._id}>
            <strong>Fecha:</strong> {new Date(movimiento.fecha).toLocaleString()} <br />
            <strong>Cantidad Ingreso:</strong> {movimiento.cantidadIngreso} <br />
            <strong>Cantidad Vendida:</strong> {movimiento.cantidadVendida} <br />
            <strong>Inventario:</strong> {movimiento.inventario?._id || 'N/A'} <br />
            <button onClick={() => handleEdit(movimiento)}>Editar</button>
            <button onClick={() => handleDelete(movimiento._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movimientos;
