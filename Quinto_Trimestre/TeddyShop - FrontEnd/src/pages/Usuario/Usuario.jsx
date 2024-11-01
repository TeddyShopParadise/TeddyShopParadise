import React, { useEffect, useState } from 'react';
import './usuario.css';
const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({ email: '', telefono: '', contraseña: '', username: '', empleado: '', estado: true, roles: [] });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuario');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const crearUsuario = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        fetchUsuarios();
        setUsuario({ email: '', telefono: '', contraseña: '', username: '', empleado: '', estado: true, roles: [] });
      } else {
        console.error('Error al crear usuario:', await response.text());
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const actualizarUsuario = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuario/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        fetchUsuarios();
        setEditing(false);
        setUsuario({ email: '', telefono: '', contraseña: '', username: '', empleado: '', estado: true, roles: [] });
        setCurrentId(null);
      } else {
        console.error('Error al actualizar usuario:', await response.text());
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuario/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchUsuarios();
      } else {
        console.error('Error al eliminar usuario:', await response.text());
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const iniciarEdicion = (usuario) => {
    setUsuario(usuario);
    setEditing(true);
    setCurrentId(usuario._id);
  };

  return (
    <div className="Usuarios-container">
      <h1>Gestión de Usuarios</h1>
      <form
        className="Usuarios-form"
        onSubmit={(e) => {
          e.preventDefault();
          editing ? actualizarUsuario() : crearUsuario();
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={usuario.email}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          required
          className="Usuarios-input"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={usuario.telefono}
          onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
          required
          className="Usuarios-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={usuario.contraseña}
          onChange={(e) => setUsuario({ ...usuario, contraseña: e.target.value })}
          required
          className="Usuarios-input"
        />
        <input
          type="text"
          placeholder="Username"
          value={usuario.username}
          onChange={(e) => setUsuario({ ...usuario, username: e.target.value })}
          required
          className="Usuarios-input"
        />
        <input
          type="text"
          placeholder="ID Empleado"
          value={usuario.empleado}
          onChange={(e) => setUsuario({ ...usuario, empleado: e.target.value })}
          className="Usuarios-input"
        />
        <label>
          <input
            type="checkbox"
            checked={usuario.estado}
            onChange={(e) => setUsuario({ ...usuario, estado: e.target.checked })}
          />
          Activo
        </label>
        <button type="submit" className={`Usuarios-button ${editing ? 'editing' : ''}`}>
          {editing ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>
      </form>
      <ul className="Usuario-list">
        {usuarios.map((user) => (
          <li key={user._id} className="Usuario-item">
            <span>{user.email} - {user.username}</span>
            <div>
              <button className="Usuario-action-button" onClick={() => iniciarEdicion(user)}>Editar</button>
              <button className="Usuario-action-button delete" onClick={() => eliminarUsuario(user._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
);

};

export default Usuarios;
