import React, { useEffect, useState } from 'react';
import './categoria.css';


const CategoriaComponent = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categorias');
      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const crearCategoria = async () => {
    if (!nombreCategoria || !descripcionCategoria) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreCategoria, descripcionCategoria }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la categoría');
      }

      fetchCategorias();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const actualizarCategoria = async () => {
    if (!editingId || !nombreCategoria || !descripcionCategoria) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/categorias/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreCategoria, descripcionCategoria }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la categoría');
      }

      fetchCategorias();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const eliminarCategoria = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/categorias/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la categoría');
        }

        fetchCategorias();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const editarCategoria = (categoria) => {
    setEditingId(categoria._id);
    setNombreCategoria(categoria.nombreCategoria);
    setDescripcionCategoria(categoria.descripcionCategoria);
  };

  const resetForm = () => {
    setNombreCategoria('');
    setDescripcionCategoria('');
    setEditingId(null);
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="categorias-container">
      <h1>Gestión de Categorías</h1>
      <form 
        onSubmit={(e) => { e.preventDefault(); editingId ? actualizarCategoria() : crearCategoria(); }}
        className="categorias-form"
      >
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={nombreCategoria}
          onChange={(e) => setNombreCategoria(e.target.value)}
          required
          className="categorias-input"
        />
        <input
          type="text"
          placeholder="Descripción de la categoría"
          value={descripcionCategoria}
          onChange={(e) => setDescripcionCategoria(e.target.value)}
          required
          className="categorias-input"
        />
        <button 
          type="submit" 
          className={`categorias-button ${editingId ? 'editing' : ''}`}
        >
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
        <button 
          type="button" 
          onClick={resetForm} 
          className="categorias-button"
        >
          Cancelar
        </button>
      </form>
      <h2>Lista de Categorías</h2>
      <ul className="categoria-list">
        {categorias.map((cat) => (
          <li key={cat._id} className="categoria-item">
            <span>{cat.nombreCategoria} - {cat.descripcionCategoria}</span>
            <div>
              <button 
                onClick={() => editarCategoria(cat)} 
                className="categoria-action-button"
              >
                Editar
              </button>
              <button 
                onClick={() => eliminarCategoria(cat._id)} 
                className="categoria-action-button delete"
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

export default CategoriaComponent;
