import React, { useEffect, useState } from 'react';
import './inventario.css'
const Inventario = () => {
    const [inventarios, setInventarios] = useState([]);
    const [nuevoInventario, setNuevoInventario] = useState({
        stockMinimo: 0,
        precioVenta: 0,
        precioCompra: 0,
        stock: 0,
        stockMaximo: 0,
        productoIdProducto: ''
    });
    const [selectedInventario, setSelectedInventario] = useState(null);

    // Obtener todos los inventarios
    const fetchInventarios = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/inventario');
            if (!response.ok) throw new Error('Error al obtener los inventarios');
            const data = await response.json();
            setInventarios(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Crear un nuevo inventario
    const crearInventario = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/inventario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoInventario)
            });
            if (!response.ok) throw new Error('Error al crear el inventario');
            fetchInventarios(); // Actualizar la lista de inventarios
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Actualizar un inventario
    const actualizarInventario = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/inventario/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedInventario)
            });
            if (!response.ok) throw new Error('Error al actualizar el inventario');
            fetchInventarios(); // Actualizar la lista de inventarios
            setSelectedInventario(null); // Resetear el estado seleccionado
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Eliminar un inventario
    const eliminarInventario = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/inventario/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar el inventario');
            fetchInventarios(); // Actualizar la lista de inventarios
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchInventarios();
    }, []);

    return (
        <div className="Inventarios-container">
            <h1>Inventario</h1>
    
            <h2>Crear Inventario</h2>
            <div className="Inventarios-form">
                <input
                    type="number"
                    className="Inventarios-input"
                    placeholder="Stock Mínimo"
                    value={nuevoInventario.stockMinimo}
                    onChange={(e) => setNuevoInventario({ ...nuevoInventario, stockMinimo: e.target.value })}
                />
                <input
                    type="number"
                    className="Inventarios-input"
                    placeholder="Precio Venta"
                    value={nuevoInventario.precioVenta}
                    onChange={(e) => setNuevoInventario({ ...nuevoInventario, precioVenta: e.target.value })}
                />
                <input
                    type="number"
                    className="Inventarios-input"
                    placeholder="Precio Compra"
                    value={nuevoInventario.precioCompra}
                    onChange={(e) => setNuevoInventario({ ...nuevoInventario, precioCompra: e.target.value })}
                />
                <input
                    type="number"
                    className="Inventarios-input"
                    placeholder="Stock"
                    value={nuevoInventario.stock}
                    onChange={(e) => setNuevoInventario({ ...nuevoInventario, stock: e.target.value })}
                />
                <input
                    type="number"
                    className="Inventarios-input"
                    placeholder="Stock Máximo"
                    value={nuevoInventario.stockMaximo}
                    onChange={(e) => setNuevoInventario({ ...nuevoInventario, stockMaximo: e.target.value })}
                />
                <input
                    type="text"
                    className="Inventarios-input"
                    placeholder="ID Producto"
                    value={nuevoInventario.productoIdProducto}
                    onChange={(e) => setNuevoInventario({ ...nuevoInventario, productoIdProducto: e.target.value })}
                />
                <button className="Inventarios-button" onClick={crearInventario}>Crear Inventario</button>
            </div>
    
            <h2>Lista de Inventarios</h2>
            <ul className="Inventario-list">
                {inventarios.map(inventario => (
                    <li key={inventario.idInventario} className="Inventario-item">
                        <span>ID: {inventario.idInventario}</span>
                        <span>Stock Mínimo: {inventario.stockMinimo}</span>
                        <span>Precio Venta: {inventario.precioVenta}</span>
                        <span>Precio Compra: {inventario.precioCompra}</span>
                        <span>Stock: {inventario.stock}</span>
                        <span>Stock Máximo: {inventario.stockMaximo}</span>
                        <div>
                            <button className="Inventario-action-button" onClick={() => setSelectedInventario(inventario)}>Editar</button>
                            <button className="Inventario-action-button delete" onClick={() => eliminarInventario(inventario.idInventario)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
    
            {selectedInventario && (
                <div>
                    <h2>Actualizar Inventario</h2>
                    <div className="Inventarios-form">
                        <input
                            type="number"
                            className="Inventarios-input"
                            placeholder="Stock Mínimo"
                            value={selectedInventario.stockMinimo}
                            onChange={(e) => setSelectedInventario({ ...selectedInventario, stockMinimo: e.target.value })}
                        />
                        <input
                            type="number"
                            className="Inventarios-input"
                            placeholder="Precio Venta"
                            value={selectedInventario.precioVenta}
                            onChange={(e) => setSelectedInventario({ ...selectedInventario, precioVenta: e.target.value })}
                        />
                        <input
                            type="number"
                            className="Inventarios-input"
                            placeholder="Precio Compra"
                            value={selectedInventario.precioCompra}
                            onChange={(e) => setSelectedInventario({ ...selectedInventario, precioCompra: e.target.value })}
                        />
                        <input
                            type="number"
                            className="Inventarios-input"
                            placeholder="Stock"
                            value={selectedInventario.stock}
                            onChange={(e) => setSelectedInventario({ ...selectedInventario, stock: e.target.value })}
                        />
                        <input
                            type="number"
                            className="Inventarios-input"
                            placeholder="Stock Máximo"
                            value={selectedInventario.stockMaximo}
                            onChange={(e) => setSelectedInventario({ ...selectedInventario, stockMaximo: e.target.value })}
                        />
                        <input
                            type="text"
                            className="Inventarios-input"
                            placeholder="ID Producto"
                            value={selectedInventario.productoIdProducto}
                            onChange={(e) => setSelectedInventario({ ...selectedInventario, productoIdProducto: e.target.value })}
                        />
                        <button className="Inventarios-button" onClick={() => actualizarInventario(selectedInventario.idInventario)}>Actualizar Inventario</button>
                        <button className="Inventarios-button" onClick={() => setSelectedInventario(null)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
    
};

export default Inventario;
