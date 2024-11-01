import React, { useEffect, useState } from 'react';
import './pedido.css'
const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [nuevoPedido, setNuevoPedido] = useState({
    tamañoOso: '',
    nombreComprador: '',
    numeroComprador: '',
    nombreAgendador: '',
    numeroAgendador: '',
    localidad: '',
    direccion: '',
    barrio: '',
    cliente: '',
    apellidoAgendador: '',
    apellidoComprador: '',
    detallesPedido: [],
    facturas: [],
    vendedores: []
  });
  const [pedidoEdicion, setPedidoEdicion] = useState(null);
  const [error, setError] = useState(null);

  // Cargar pedidos al montar el componente
  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pedido');
        if (!response.ok) {
          throw new Error('Error al obtener pedidos');
        }
        const data = await response.json();
        setPedidos(data);
      } catch (err) {
        setError(err.message);
      }
    };
    obtenerPedidos();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoPedido({ ...nuevoPedido, [name]: value });
  };

  // Crear nuevo pedido
  const crearPedido = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoPedido)
      });

      if (!response.ok) {
        throw new Error('Error al crear pedido');
      }
      const data = await response.json();
      setPedidos([...pedidos, data]);
      setNuevoPedido({
        tamañoOso: '',
        nombreComprador: '',
        numeroComprador: '',
        nombreAgendador: '',
        numeroAgendador: '',
        localidad: '',
        direccion: '',
        barrio: '',
        cliente: '',
        apellidoAgendador: '',
        apellidoComprador: '',
        detallesPedido: [],
        facturas: [],
        vendedores: []
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Actualizar pedido
  const actualizarPedido = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/pedido/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedidoEdicion)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar pedido');
      }
      const updatedPedido = await response.json();
      setPedidos(pedidos.map((pedido) => (pedido._id === id ? updatedPedido : pedido)));
      setPedidoEdicion(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Eliminar pedido
  const eliminarPedido = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/pedido/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar pedido');
      }
      setPedidos(pedidos.filter((pedido) => pedido._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="Pedidos-container">
      <h2>Gestión de Pedidos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={crearPedido} className="Pedidos-form">
        <input
          type="text"
          name="tamañoOso"
          placeholder="Tamaño del oso"
          value={nuevoPedido.tamañoOso}
          onChange={handleChange}
          required
          className="Pedidos-input"
        />
        <input
          type="text"
          name="nombreComprador"
          placeholder="Nombre del comprador"
          value={nuevoPedido.nombreComprador}
          onChange={handleChange}
          required
          className="Pedidos-input"
        />
        {/* Agregar más campos según sea necesario */}
        <button type="submit" className="Pedidos-button">Crear Pedido</button>
      </form>
  
      <ul className="Pedido-list">
        {pedidos.map((pedido) => (
          <li key={pedido._id} className="Pedido-item">
            <span>{pedido.nombreComprador}</span>
            <div>
              <button
                onClick={() => setPedidoEdicion(pedido)}
                className="Pedido-action-button"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarPedido(pedido._id)}
                className="Pedido-action-button delete"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {pedidoEdicion && (
        <div>
          <h3>Editar Pedido</h3>
          <form onSubmit={() => actualizarPedido(pedidoEdicion._id)} className="Pedidos-form">
            <input
              type="text"
              name="nombreComprador"
              value={pedidoEdicion.nombreComprador}
              onChange={(e) => setPedidoEdicion({ ...pedidoEdicion, nombreComprador: e.target.value })}
              className="Pedidos-input"
            />
            {/* Agregar más campos según sea necesario */}
            <button type="submit" className="Pedidos-button">Actualizar Pedido</button>
          </form>
        </div>
      )}
    </div>
  );
  
};

export default Pedido;
