import React, { useState, useEffect } from 'react';

const Devoluciones = () => {
    const [devoluciones, setDevoluciones] = useState([]);
    const [devolucion, setDevolucion] = useState({ detalleDevolucion: '', inventarios: [] });
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Fetch all devoluciones
    const fetchDevoluciones = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/devoluciones', {
                headers: { 'Accept': 'application/json' },
            });
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            setDevoluciones(data);
        } catch (error) {
            console.error('Error fetching devoluciones:', error);
        }
    };

    useEffect(() => {
        fetchDevoluciones();
    }, []);

    // Create or update a devolucion
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `http://localhost:3000/api/devoluciones/${currentId}` : 'http://localhost:3000/api/devoluciones';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(devolucion),
            });

            if (!response.ok) {
                throw new Error('Error en la creación/actualización de la devolución');
            }

            fetchDevoluciones(); // Refresh the list after create/update
            resetForm();
        } catch (error) {
            console.error('Error submitting devolucion:', error);
        }
    };

    // Delete a devolucion
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/devoluciones/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Error al eliminar la devolución');
            }
            fetchDevoluciones(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting devolucion:', error);
        }
    };

    // Set form for editing
    const handleEdit = (devolucion) => {
        setDevolucion(devolucion);
        setIsEditing(true);
        setCurrentId(devolucion._id);
    };

    // Reset form
    const resetForm = () => {
        setDevolucion({ detalleDevolucion: '', inventarios: [] });
        setIsEditing(false);
        setCurrentId(null);
    };

    return (
        <div>
            <h1>Devoluciones</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Detalle de Devolución"
                    value={devolucion.detalleDevolucion}
                    onChange={(e) => setDevolucion({ ...devolucion, detalleDevolucion: e.target.value })}
                    required
                />
                <button type="submit">{isEditing ? 'Actualizar' : 'Crear'} Devolución</button>
                {isEditing && <button type="button" onClick={resetForm}>Cancelar</button>}
            </form>

            <h2>Lista de Devoluciones</h2>
            <ul>
                {devoluciones.map((devolucion) => (
                    <li key={devolucion._id}>
                        {devolucion.detalleDevolucion}
                        <button onClick={() => handleEdit(devolucion)}>Editar</button>
                        <button onClick={() => handleDelete(devolucion._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Devoluciones;
