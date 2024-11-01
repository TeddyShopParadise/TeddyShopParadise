import React, { useEffect, useState } from 'react';
import './empleado.css';

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
    <div className="Empleados-container">
      <h1>Empleados</h1>
      <form onSubmit={handleSubmit} className="Empleados-form">
        <input
          type="number"
          name="dniEmpleado"
          value={formData.dniEmpleado}
          onChange={handleChange}
          placeholder="DNI"
          required
          className="Empleados-input"
        />
        <input
          type="text"
          name="telefonoEmpleado"
          value={formData.telefonoEmpleado}
          onChange={handleChange}
          placeholder="Teléfono"
          required
          className="Empleados-input"
        />
        <input
          type="text"
          name="codigoEmpleado"
          value={formData.codigoEmpleado}
          onChange={handleChange}
          placeholder="Código"
          required
          className="Empleados-input"
        />
        <input
          type="date"
          name="fechaNacimientoEmpleado"
          value={formData.fechaNacimientoEmpleado}
          onChange={handleChange}
          required
          className="Empleados-input"
        />
        <input
          type="text"
          name="nombreEmpleado"
          value={formData.nombreEmpleado}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="Empleados-input"
        />
        <input
          type="text"
          name="compania"
          value={formData.compania}
          onChange={handleChange}
          placeholder="Compañía"
          className="Empleados-input"
        />
        <input
          type="text"
          name="administrador"
          value={formData.administrador}
          onChange={handleChange}
          placeholder="Administrador"
          className="Empleados-input"
        />
        <input
          type="text"
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
          placeholder="Usuario"
          className="Empleados-input"
        />
        <input
          type="text"
          name="vendedor"
          value={formData.vendedor}
          onChange={handleChange}
          placeholder="Vendedor"
          className="Empleados-input"
        />
        <button
          type="submit"
          className={`Empleados-button ${editMode ? 'editing' : ''}`}
        >
          {editMode ? 'Actualizar' : 'Crear'}
        </button>
      </form>
      <ul className="Empleado-list">
        {empleados.map((empleado) => (
          <li key={empleado._id} className="Empleado-item">
            <span>{empleado.nombreEmpleado} - {empleado.telefonoEmpleado}</span>
            <div>
              <button
                onClick={() => handleEdit(empleado)}
                className="Empleado-action-button"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(empleado._id)}
                className="Empleado-action-button delete"
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

export default Empleado;
