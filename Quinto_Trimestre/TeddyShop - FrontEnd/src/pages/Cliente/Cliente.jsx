import React, { useState, useEffect } from "react";

export default function Cliente() {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
        dniCliente: '',
        nombreCliente: '',
        telefonoCliente: '',
        fechaNacimientoCliente: '',
        apellidoCliente: ''
    });
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Función para listar clientes
    const listarClientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/clientes');
            if (!response.ok) throw new Error('Error al obtener los clientes');
            const data = await response.json();
            setClientes(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Llama a listarClientes al montar el componente
    useEffect(() => {
        listarClientes();
    }, []);

    // Función para manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Función para crear o actualizar un cliente
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = selectedClientId 
                ? `http://localhost:3000/api/clientes/${selectedClientId}` 
                : 'http://localhost:3000/api/clientes';
            const method = selectedClientId ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                await listarClientes(); // Refresca la lista después de crear o actualizar un cliente
                setFormData({ dniCliente: '', nombreCliente: '', telefonoCliente: '', fechaNacimientoCliente: '', apellidoCliente: '' }); // Limpia el formulario
                setSelectedClientId(null); // Resetea el cliente seleccionado
                setSuccessMessage(`Cliente ${selectedClientId ? 'actualizado' : 'creado'} exitosamente!`);
                setError(''); // Limpia el mensaje de error
            } else {
                const errorResponse = await response.json();
                setError(errorResponse.message || 'Error en los datos enviados.');
                setSuccessMessage(''); // Limpia el mensaje de éxito
            }
        } catch (error) {
            console.error(error);
            setError('Error en la solicitud');
        }
    };

    // Función para seleccionar un cliente para actualizar
    const handleEdit = (cliente) => {
        setSelectedClientId(cliente._id);
        setFormData({
            dniCliente: cliente.dniCliente,
            nombreCliente: cliente.nombreCliente,
            telefonoCliente: cliente.telefonoCliente,
            fechaNacimientoCliente: cliente.fechaNacimientoCliente.split('T')[0], // Formato de fecha YYYY-MM-DD
            apellidoCliente: cliente.apellidoCliente
        });
    };

    // Función para eliminar un cliente
    const eliminarCliente = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
            try {
                const response = await fetch(`http://localhost:3000/api/clientes/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    await listarClientes(); // Refresca la lista después de eliminar un cliente
                    setSuccessMessage('Cliente eliminado exitosamente!');
                    setError(''); // Limpia el mensaje de error
                } else {
                    const errorResponse = await response.json();
                    setError(errorResponse.message || 'Error al eliminar el cliente.');
                    setSuccessMessage(''); // Limpia el mensaje de éxito
                }
            } catch (error) {
                console.error(error);
                setError('Error en la solicitud');
            }
        }
    };

    return (
        <div>
            <h1>Lista de Clientes</h1>
            {clientes.map(cliente => (
                <div key={cliente._id}>
                    <p>
                        DNI: {cliente.dniCliente}, Nombre: {cliente.nombreCliente}, Teléfono: {cliente.telefonoCliente}, 
                        Fecha de Nacimiento: {new Date(cliente.fechaNacimientoCliente).toLocaleDateString()}, 
                        Apellido: {cliente.apellidoCliente}
                    </p>
                    <button onClick={() => handleEdit(cliente)}>Editar</button>
                    <button onClick={() => eliminarCliente(cliente._id)}>Eliminar</button>
                </div>
            ))}

            <h2>{selectedClientId ? 'Actualizar Cliente' : 'Crear Cliente'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    DNI del Cliente:
                    <input
                        type="number"
                        name="dniCliente"
                        value={formData.dniCliente}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Nombre del Cliente:
                    <input
                        type="text"
                        name="nombreCliente"
                        value={formData.nombreCliente}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Teléfono del Cliente:
                    <input
                        type="text"
                        name="telefonoCliente"
                        value={formData.telefonoCliente}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Fecha de Nacimiento:
                    <input
                        type="date"
                        name="fechaNacimientoCliente"
                        value={formData.fechaNacimientoCliente}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Apellido del Cliente:
                    <input
                        type="text"
                        name="apellidoCliente"
                        value={formData.apellidoCliente}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">{selectedClientId ? 'Actualizar Cliente' : 'Crear Cliente'}</button>
            </form>

            {/* Mensajes de éxito o error */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
