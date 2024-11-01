import React, { useEffect, useState } from 'react';

// Componente principal
const HistorialPrecios = () => {
  const [historialPrecios, setHistorialPrecios] = useState([]);
  const [nuevoHistorial, setNuevoHistorial] = useState({
    precio: '',
    fechaInicio: '',
    fechaFin: '',
    estadoPrecio: true,
    producto: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Obtener historial de precios
  const fetchHistorialPrecios = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/historialPrecio');
      const data = await response.json();
      setHistorialPrecios(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchHistorialPrecios();
  }, []);

  // Crear nuevo historial de precio
  const crearHistorialPrecio = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/historialPrecio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoHistorial),
      });

      if (response.ok) {
        fetchHistorialPrecios(); // Actualiza la lista después de crear
        setNuevoHistorial({ precio: '', fechaInicio: '', fechaFin: '', estadoPrecio: true, producto: '' });
      } else {
        console.error('Error al crear el historial de precio');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  // Actualizar historial de precio
  const actualizarHistorialPrecio = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/historialPrecio/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoHistorial),
      });

      if (response.ok) {
        fetchHistorialPrecios(); // Actualiza la lista después de actualizar
        setNuevoHistorial({ precio: '', fechaInicio: '', fechaFin: '', estadoPrecio: true, producto: '' });
        setEditingId(null); // Resetea el ID de edición
      } else {
        console.error('Error al actualizar el historial de precio');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  // Eliminar historial de precio
  const eliminarHistorialPrecio = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/historialPrecio/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchHistorialPrecios(); // Actualiza la lista después de eliminar
      } else {
        console.error('Error al eliminar el historial de precio');
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  // Maneja el cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoHistorial((prev) => ({ ...prev, [name]: value }));
  };

  // Iniciar edición
  const iniciarEdicion = (historial) => {
    setNuevoHistorial(historial);
    setEditingId(historial._id);
  };

  return (
    <div>
      <h1>Historial de Precios</h1>

      <form onSubmit={editingId ? actualizarHistorialPrecio : crearHistorialPrecio}>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={nuevoHistorial.precio}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fechaInicio"
          value={nuevoHistorial.fechaInicio}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fechaFin"
          value={nuevoHistorial.fechaFin}
          onChange={handleChange}
          required
        />
        <label>
          Estado Precio:
          <input
            type="checkbox"
            name="estadoPrecio"
            checked={nuevoHistorial.estadoPrecio}
            onChange={(e) => setNuevoHistorial({ ...nuevoHistorial, estadoPrecio: e.target.checked })}
          />
        </label>
        <input
          type="text"
          name="producto"
          placeholder="ID del producto"
          value={nuevoHistorial.producto}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <ul>
        {historialPrecios.map((historial) => (
          <li key={historial._id}>
            <span>
              Precio: {historial.precio} - Desde: {new Date(historial.fechaInicio).toLocaleDateString()} - Hasta: {new Date(historial.fechaFin).toLocaleDateString()} - Estado: {historial.estadoPrecio ? 'Activo' : 'Inactivo'}
            </span>
            <button onClick={() => iniciarEdicion(historial)}>Editar</button>
            <button onClick={() => eliminarHistorialPrecio(historial._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorialPrecios;
