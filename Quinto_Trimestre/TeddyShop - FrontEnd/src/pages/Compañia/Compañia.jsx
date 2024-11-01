import React, { useEffect, useState } from 'react';

const Compania = () => {
  const [companias, setCompanias] = useState([]);
  const [NIT, setNIT] = useState('');
  const [telefonoEmpresa, setTelefonoEmpresa] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [direccionEmpresa, setDireccionEmpresa] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Obtener la lista de compañías
  const fetchCompanias = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/compania');
      if (!response.ok) {
        throw new Error('Error al obtener las compañías');
      }
      const data = await response.json();
      setCompanias(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Crear nueva compañía
  const crearCompania = async () => {
    if (!NIT || !telefonoEmpresa || !nombreEmpresa || !direccionEmpresa) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/compania', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ NIT, telefonoEmpresa, nombreEmpresa, direccionEmpresa }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la compañía');
      }

      fetchCompanias();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Actualizar compañía
  const actualizarCompania = async () => {
    if (!editingId || !NIT || !telefonoEmpresa || !nombreEmpresa || !direccionEmpresa) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/compania/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ NIT, telefonoEmpresa, nombreEmpresa, direccionEmpresa }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la compañía');
      }

      fetchCompanias();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Eliminar compañía
  const eliminarCompania = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta compañía?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/compania/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la compañía');
        }

        fetchCompanias();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  // Cargar datos para editar
  const editarCompania = (compania) => {
    setEditingId(compania._id);
    setNIT(compania.NIT);
    setTelefonoEmpresa(compania.telefonoEmpresa);
    setNombreEmpresa(compania.nombreEmpresa);
    setDireccionEmpresa(compania.direccionEmpresa);
  };

  // Restablecer formulario
  const resetForm = () => {
    setNIT('');
    setTelefonoEmpresa('');
    setNombreEmpresa('');
    setDireccionEmpresa('');
    setEditingId(null);
  };

  useEffect(() => {
    fetchCompanias();
  }, []);

  return (
    <div>
      <h1>Gestión de Compañías</h1>
      <form onSubmit={(e) => { e.preventDefault(); editingId ? actualizarCompania() : crearCompania(); }}>
        <input
          type="number"
          placeholder="NIT"
          value={NIT}
          onChange={(e) => setNIT(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teléfono de la empresa"
          value={telefonoEmpresa}
          onChange={(e) => setTelefonoEmpresa(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nombre de la empresa"
          value={nombreEmpresa}
          onChange={(e) => setNombreEmpresa(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dirección de la empresa"
          value={direccionEmpresa}
          onChange={(e) => setDireccionEmpresa(e.target.value)}
          required
        />
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
        <button type="button" onClick={resetForm}>Cancelar</button>
      </form>
      <h2>Lista de Compañías</h2>
      <ul>
        {companias.map((comp) => (
          <li key={comp._id}>
            {comp.nombreEmpresa} - {comp.telefonoEmpresa} - {comp.direccionEmpresa}
            <button onClick={() => editarCompania(comp)}>Editar</button>
            <button onClick={() => eliminarCompania(comp._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Compania;
