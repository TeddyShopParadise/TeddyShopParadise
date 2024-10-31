import React, { useEffect, useState } from 'react';
import './roles.css'; // Importa el archivo CSS

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({ nombre: '', estado: true, usuarios: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch roles from the API
  const fetchRoles = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/roles');
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Create a new role
  const createRole = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(role),
      });
      if (response.ok) {
        fetchRoles();
        setRole({ nombre: '', estado: true, usuarios: [] }); // Reset form
      }
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  // Update an existing role
  const updateRole = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/roles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(role),
      });
      if (response.ok) {
        fetchRoles();
        setRole({ nombre: '', estado: true, usuarios: [] }); // Reset form
        setIsEditing(false);
        setCurrentId(null);
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  // Delete a role
  const deleteRole = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/roles/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchRoles();
      }
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateRole(currentId);
    } else {
      createRole();
    }
  };

  const handleEdit = (role) => {
    setRole(role);
    setIsEditing(true);
    setCurrentId(role._id);
  };

  return (
    <div className="roles-container">
      <h1>Gestión de Roles</h1>
      <form onSubmit={handleSubmit} className="roles-form">
        <input
          type="text"
          placeholder="Nombre del Rol"
          value={role.nombre}
          onChange={(e) => setRole({ ...role, nombre: e.target.value })}
          required
          className="roles-input"
        />
        <select
          value={role.estado}
          onChange={(e) => setRole({ ...role, estado: e.target.value === 'true' })}
          className="roles-select"
        >
          <option value={true}>Activo</option>
          <option value={false}>Inactivo</option>
        </select>
        <button 
          type="submit" 
          className={`roles-button ${isEditing ? 'editing' : ''}`}
        >
          {isEditing ? 'Actualizar Rol' : 'Crear Rol'}
        </button>
      </form>

      <h2>Lista de Roles</h2>
      <ul className="role-list">
        {roles.map((r) => (
          <li key={r._id} className="role-item">
            <span>{r.nombre} - {r.estado ? 'Activo' : 'Inactivo'}</span>
            <div>
              <button 
                onClick={() => handleEdit(r)} 
                className="role-action-button"
              >
                Editar
              </button>
              <button 
                onClick={() => deleteRole(r._id)} 
                className="role-action-button delete"
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

export default Roles;
