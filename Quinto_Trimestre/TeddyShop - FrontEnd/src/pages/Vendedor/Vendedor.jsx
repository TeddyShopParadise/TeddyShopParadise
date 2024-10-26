import React, { useEffect, useState } from 'react';

const Vendedores = () => {
  const [vendedores, setVendedores] = useState([]);
  const [dniEmpleado, setDniEmpleado] = useState('');
  const [codigoVendedor, setCodigoVendedor] = useState('');
  const [currentId, setCurrentId] = useState(null);

  // Fetch all vendedores from the API
  const fetchVendedores = async () => {
    const response = await fetch('http://localhost:3000/api/vendedor');
    const data = await response.json();
    setVendedores(data);
  };

  useEffect(() => {
    fetchVendedores();
  }, []);

  // Create a new vendedor
  const handleCreate = async (e) => {
    e.preventDefault();
    const newVendedor = { dniEmpleado, codigoVendedor };
    await fetch('http://localhost:3000/api/vendedor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVendedor),
    });
    fetchVendedores();
    setDniEmpleado('');
    setCodigoVendedor('');
  };

  // Update an existing vendedor
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedVendedor = { dniEmpleado, codigoVendedor };
    await fetch(`http://localhost:3000/api/vendedor/${currentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedVendedor),
    });
    fetchVendedores();
    setDniEmpleado('');
    setCodigoVendedor('');
    setCurrentId(null);
  };

  // Delete a vendedor
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/vendedor/${id}`, {
      method: 'DELETE',
    });
    fetchVendedores();
  };

  // Handle editing a vendedor
  const handleEdit = (vendedor) => {
    setDniEmpleado(vendedor.dniEmpleado);
    setCodigoVendedor(vendedor.codigoVendedor);
    setCurrentId(vendedor._id);
  };

  return (
    <div>
      <h1>Vendedores</h1>
      <form onSubmit={currentId ? handleUpdate : handleCreate}>
        <input
          type="number"
          placeholder="DNI Empleado"
          value={dniEmpleado}
          onChange={(e) => setDniEmpleado(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Código Vendedor"
          value={codigoVendedor}
          onChange={(e) => setCodigoVendedor(e.target.value)}
          required
        />
        <button type="submit">{currentId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <ul>
        {vendedores.map((vendedor) => (
          <li key={vendedor._id}>
            {vendedor.codigoVendedor} - DNI: {vendedor.dniEmpleado}
            <button onClick={() => handleEdit(vendedor)}>Editar</button>
            <button onClick={() => handleDelete(vendedor._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vendedores;
