import React, { useEffect, useState } from 'react';
import './producto.css';
const API_URL = 'http://localhost:3000/api/producto';

const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({ 
    estiloProducto: '', 
    cmCabezaColaProducto: '', 
    materialProducto: '', 
    disponibilidadProducto: '', 
    cmColaPataProducto: '', 
    tamañoProducto: '',
    historialPrecios: [],
    catalogos: [],
    categorias: []
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = editMode 
        ? await fetch(`${API_URL}/${selectedId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
          }) 
        : await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
          });
      
      if (response.ok) {
        fetchProductos();
        resetForm();
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error("Error submitting producto:", error);
    }
  };

  const handleEdit = (id) => {
    const productoToEdit = productos.find(p => p._id === id);
    setProducto(productoToEdit);
    setEditMode(true);
    setSelectedId(id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProductos();
      } else {
        console.error('Error deleting producto:', response.statusText);
      }
    } catch (error) {
      console.error("Error deleting producto:", error);
    }
  };

  const resetForm = () => {
    setProducto({ 
      estiloProducto: '', 
      cmCabezaColaProducto: '', 
      materialProducto: '', 
      disponibilidadProducto: '', 
      cmColaPataProducto: '', 
      tamañoProducto: '',
      historialPrecios: [],
      catalogos: [],
      categorias: []
    });
    setEditMode(false);
    setSelectedId(null);
  };

  return (
    <div className="Productos-container">
      <h1>CRUD de Productos</h1>
      
      <form className="Productos-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="estiloProducto"
          value={producto.estiloProducto}
          onChange={handleChange}
          placeholder="Estilo Producto"
          required
          className="Productos-input"
        />
        <input
          type="text"
          name="cmCabezaColaProducto"
          value={producto.cmCabezaColaProducto}
          onChange={handleChange}
          placeholder="CM Cabeza Cola"
          required
          className="Productos-input"
        />
        <input
          type="text"
          name="materialProducto"
          value={producto.materialProducto}
          onChange={handleChange}
          placeholder="Material Producto"
          required
          className="Productos-input"
        />
        <input
          type="text"
          name="disponibilidadProducto"
          value={producto.disponibilidadProducto}
          onChange={handleChange}
          placeholder="Disponibilidad Producto"
          required
          className="Productos-input"
        />
        <input
          type="text"
          name="cmColaPataProducto"
          value={producto.cmColaPataProducto}
          onChange={handleChange}
          placeholder="CM Cola Pata"
          required
          className="Productos-input"
        />
        <input
          type="text"
          name="tamañoProducto"
          value={producto.tamañoProducto}
          onChange={handleChange}
          placeholder="Tamaño Producto"
          required
          className="Productos-input"
        />
        
        <button type="submit" className={`Productos-button ${editMode ? 'editing' : ''}`}>
          {editMode ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
        <button type="button" onClick={resetForm} className="Productos-button">Cancelar</button>
      </form>

      <h2>Lista de Productos</h2>
      <ul className="Producto-list">
        {productos.map(p => (
          <li key={p._id} className="Producto-item">
            <span>{p.estiloProducto} - {p.materialProducto}</span>
            <div>
              <button onClick={() => handleEdit(p._id)} className="Producto-action-button">Editar</button>
              <button onClick={() => handleDelete(p._id)} className="Producto-action-button delete">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
);

};

export default Producto;
