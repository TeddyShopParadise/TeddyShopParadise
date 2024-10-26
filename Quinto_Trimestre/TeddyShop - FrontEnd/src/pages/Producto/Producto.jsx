import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/producto';

const ProductoCRUD = () => {
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
    <div>
      <h1>CRUD de Productos</h1>
      
      <form onSubmit={handleSubmit}>
        <input type="text" name="estiloProducto" value={producto.estiloProducto} onChange={handleChange} placeholder="Estilo Producto" required />
        <input type="text" name="cmCabezaColaProducto" value={producto.cmCabezaColaProducto} onChange={handleChange} placeholder="CM Cabeza Cola" required />
        <input type="text" name="materialProducto" value={producto.materialProducto} onChange={handleChange} placeholder="Material Producto" required />
        <input type="text" name="disponibilidadProducto" value={producto.disponibilidadProducto} onChange={handleChange} placeholder="Disponibilidad Producto" required />
        <input type="text" name="cmColaPataProducto" value={producto.cmColaPataProducto} onChange={handleChange} placeholder="CM Cola Pata" required />
        <input type="text" name="tamañoProducto" value={producto.tamañoProducto} onChange={handleChange} placeholder="Tamaño Producto" required />
        
        <button type="submit">{editMode ? 'Actualizar Producto' : 'Crear Producto'}</button>
        <button type="button" onClick={resetForm}>Cancelar</button>
      </form>

      <h2>Lista de Productos</h2>
      <ul>
        {productos.map(p => (
          <li key={p._id}>
            {p.estiloProducto} - {p.materialProducto}
            <button onClick={() => handleEdit(p._id)}>Editar</button>
            <button onClick={() => handleDelete(p._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductoCRUD;
