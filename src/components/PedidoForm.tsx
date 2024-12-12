import React, { useState, useEffect } from 'react';
import PedidoService from '../service/PedidoService';
import { Pedido } from '../types/Pedido';

interface PedidoFormProps {
  onPedidoAdded: (pedido: Pedido) => void;
  onPedidoUpdated: (pedido: Pedido) => void;
  pedidoToEdit?: Pedido;
}

const PedidoForm: React.FC<PedidoFormProps> = ({
  onPedidoAdded,
  onPedidoUpdated,
  pedidoToEdit,
}) => {
  const [cantidadPersonas, setCantidadPersonas] = useState<number | string>('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [menuId, setMenuId] = useState<number | string>('');
  const [estadoOrden, setEstadoOrden] = useState('');
  const [fecha, setFecha] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (pedidoToEdit) {
      setCantidadPersonas(pedidoToEdit.cantidadPersonas.toString());
      setNombreCliente(pedidoToEdit.nombreCliente);
      setMenuId(pedidoToEdit.menuId.toString());
      setEstadoOrden(pedidoToEdit.estadoOrden);
      setFecha(pedidoToEdit.fecha.toISOString().substring(0, 10));
      setIsEditMode(true);
    }
  }, [pedidoToEdit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const pedidoData: Omit<Pedido, 'pedidoId'> = { 
      cantidadPersonas: Number(cantidadPersonas), 
      nombreCliente, 
      menuId: Number(menuId), 
      estadoOrden, 
      fecha: new Date(fecha) 
    };

    try {
      if (isEditMode && pedidoToEdit) {
        const response = await PedidoService.updatePedido(pedidoToEdit.pedidoId, pedidoData as Pedido);
        onPedidoUpdated(response.data);
        setMessage('Pedido actualizado correctamente');
      } else {
        const response = await PedidoService.createPedido(pedidoData as Pedido);
        onPedidoAdded(response.data);
        setMessage('Pedido agregado correctamente');
      }
      resetForm();
    } catch (error) {
      setMessage('No se pudo guardar el pedido');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCantidadPersonas('');
    setNombreCliente('');
    setMenuId('');
    setEstadoOrden('');
    setFecha('');
    setIsEditMode(false);
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="cantidadPersonas">Cantidad de Personas</label>
          <input
            id="cantidadPersonas"
            type="number"
            value={cantidadPersonas}
            onChange={(e) => setCantidadPersonas(e.target.value)}
            placeholder="Ingrese cantidad de personas"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="nombreCliente">Nombre del Cliente</label>
          <input
            id="nombreCliente"
            type="text"
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
            placeholder="Ingrese nombre del cliente"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="menuId">ID del Menú</label>
          <input
            id="menuId"
            type="number"
            value={menuId}
            onChange={(e) => setMenuId(e.target.value)}
            placeholder="Ingrese ID del menú"
            required
            style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="estadoOrden">Estado de la Orden</label>
          <input
            id="estadoOrden"
            type="text"
            value={estadoOrden}
            onChange={(e) => setEstadoOrden(e.target.value)}
            placeholder="Ingrese estado de la orden"
            required
            style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="fecha">Fecha</label>
          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '0.5em 1em',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {isSubmitting
            ? 'Guardando...'
            : isEditMode
            ? 'Actualizar Pedido'
            : 'Agregar Pedido'}
        </button>
      </form>
    </div>
  );
};

export default PedidoForm;