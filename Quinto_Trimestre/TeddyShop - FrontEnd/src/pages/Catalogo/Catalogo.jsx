import React, { useState, useEffect } from 'react';

export default function Catalogo() {
  const [catalogos, setCatalogos] = useState([]);
  const [nombreCatalogo, setNombreCatalogo] = useState('');
  const [descripcionCatalogo, setDescripcionCatalogo] = useState('');
  const [disponibilidadCatalogo, setDisponibilidadCatalogo] = useState(true);
  const [estiloCatalogo, setEstiloCatalogo] = useState('');
  const [compania, setCompania] = useState('');
  const [productos, setProductos] = useState([]);
  const [vendedoresCatalogo, setVendedoresCatalogo] = useState([]);
  const [selectedCatalogoId, setSelectedCatalogoId] = useState(null);

  useEffect(() => {
    listarCatalogos();
  }, []);

  const listarCatalogos = async () => {
    const response = await fetch('http://localhost:3000/api/catalogos/activos');
    const data = await response.json();
    setCatalogos(data);
  };

  const crearCatalogo = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/catalogos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreCatalogo,
        descripcionCatalogo,
        disponibilidadCatalogo,
        estiloCatalogo,
        compania,
        productos,
        vendedoresCatalogo,
      }),
    });

    if (response.ok) {
      alert('Catálogo creado exitosamente');
      listarCatalogos();
      limpiarFormulario();
    } else {
      alert('Error en los datos enviados');
    }
  };

  const actualizarCatalogo = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/catalogos/${selectedCatalogoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreCatalogo,
        descripcionCatalogo,
        disponibilidadCatalogo,
        estiloCatalogo,
        compania,
        productos,
        vendedoresCatalogo,
      }),
    });

    if (response.ok) {
      alert('Catálogo actualizado exitosamente');
      listarCatalogos();
      limpiarFormulario();
      setSelectedCatalogoId(null);
    } else {
      alert('Error en los datos enviados');
    }
  };

  const limpiarFormulario = () => {
    setNombreCatalogo('');
    setDescripcionCatalogo('');
    setDisponibilidadCatalogo(true);
    setEstiloCatalogo('');
    setCompania('');
    setProductos([]);
    setVendedoresCatalogo([]);
  };

  return (
    <div>
      <h1>Catálogos</h1>

      <form onSubmit={selectedCatalogoId ? actualizarCatalogo : crearCatalogo}>
        <h2>{selectedCatalogoId ? 'Actualizar Catálogo' : 'Crear Catálogo'}</h2>
        <input
          type="text"
          placeholder="Nombre del Catálogo"
          value={nombreCatalogo}
          onChange={(e) => setNombreCatalogo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción del Catálogo"
          value={descripcionCatalogo}
          onChange={(e) => setDescripcionCatalogo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Estilo del Catálogo"
          value={estiloCatalogo}
          onChange={(e) => setEstiloCatalogo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ID de Compañía"
          value={compania}
          onChange={(e) => setCompania(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Productos (IDs separados por comas)"
          value={productos.join(', ')}
          onChange={(e) => setProductos(e.target.value.split(',').map(p => p.trim()))}
        />
        <input
          type="text"
          placeholder="Vendedores (IDs separados por comas)"
          value={vendedoresCatalogo.join(', ')}
          onChange={(e) => setVendedoresCatalogo(e.target.value.split(',').map(v => v.trim()))}
        />
        <label>
          <input
            type="checkbox"
            checked={disponibilidadCatalogo}
            onChange={() => setDisponibilidadCatalogo(!disponibilidadCatalogo)}
          />
          Disponibilidad
        </label>
        <button type="submit">{selectedCatalogoId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <h2>Lista de Catálogos Activos</h2>
      <ul>
        {catalogos.map((catalogo) => (
          <li key={catalogo._id}>
            <p>Nombre: {catalogo.nombreCatalogo}</p>
            <p>Descripción: {catalogo.descripcionCatalogo}</p>
            <p>Disponibilidad: {catalogo.disponibilidadCatalogo ? 'Sí' : 'No'}</p>
            <p>Estilo: {catalogo.estiloCatalogo}</p>
            <button onClick={() => {
              setSelectedCatalogoId(catalogo._id);
              setNombreCatalogo(catalogo.nombreCatalogo);
              setDescripcionCatalogo(catalogo.descripcionCatalogo);
              setDisponibilidadCatalogo(catalogo.disponibilidadCatalogo);
              setEstiloCatalogo(catalogo.estiloCatalogo);
              setCompania(catalogo.compania);
              setProductos(catalogo.productos);
              setVendedoresCatalogo(catalogo.vendedoresCatalogo);
            }}>
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
