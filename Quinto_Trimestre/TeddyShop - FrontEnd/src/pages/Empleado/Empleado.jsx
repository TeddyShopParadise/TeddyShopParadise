import React, { useEffect, useState } from 'react';

const Empleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({
    dniEmpleado: '',
    telefonoEmpleado: '',
    codigoEmpleado: '',
    fechaNacimientoEmpleado: '',
    nombreEmpleado: '',
    compania: '',
    administrador: '',
    usuario: '',
    vendedor: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch empleados from the API
  const fetchEmpleados = async () => {
    const response = await fetch('http://localhost:3000/api/empleado');
    const data = await response.json();
    setEmpleados(data);
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Create or Update empleado
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editMode ? 'PUT' : 'POST';
    const url = editMode ? `http://localhost:3000/api/empleado/${currentId}` : 'http://localhost:3000/api/empleado';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setFormData({
      dniEmpleado: '',
      telefonoEmpleado: '',
      codigoEmpleado: '',
      fechaNacimientoEmpleado: '',
      nombreEmpleado: '',
      compania: '',
      administrador: '',
      usuario: '',
      vendedor: ''
    });
    setEditMode(false);
    setCurrentId(null);
    fetchEmpleados();
  };

  // Edit empleado
  const handleEdit = (empleado) => {
    setFormData(empleado);
    setEditMode(true);
    setCurrentId(empleado._id);
  };

  // Delete empleado
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/empleado/${id}`, {
      method: 'DELETE',
    });
    fetchEmpleados();
  };

  return (
    <div>
      <h1>Empleados</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" name="dniEmpleado" value={formData.dniEmpleado} onChange={handleChange} placeholder="DNI" required />
        <input type="text" name="telefonoEmpleado" value={formData.telefonoEmpleado} onChange={handleChange} placeholder="Teléfono" required />
        <input type="text" name="codigoEmpleado" value={formData.codigoEmpleado} onChange={handleChange} placeholder="Código" required />
        <input type="date" name="fechaNacimientoEmpleado" value={formData.fechaNacimientoEmpleado} onChange={handleChange} required />
        <input type="text" name="nombreEmpleado" value={formData.nombreEmpleado} onChange={handleChange} placeholder="Nombre" required />
        <input type="text" name="compania" value={formData.compania} onChange={handleChange} placeholder="Compañía" />
        <input type="text" name="administrador" value={formData.administrador} onChange={handleChange} placeholder="Administrador" />
        <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} placeholder="Usuario" />
        <input type="text" name="vendedor" value={formData.vendedor} onChange={handleChange} placeholder="Vendedor" />
        <button type="submit">{editMode ? 'Actualizar' : 'Crear'}</button>
      </form>
      <ul>
        {empleados.map((empleado) => (
          <li key={empleado._id}>
            {empleado.nombreEmpleado} - {empleado.telefonoEmpleado}
            <button onClick={() => handleEdit(empleado)}>Editar</button>
            <button onClick={() => handleDelete(empleado._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Empleado;
