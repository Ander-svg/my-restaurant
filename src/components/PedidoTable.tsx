import React, { useEffect, useState } from 'react';
import PedidoService from '../service/PedidoService';
import { Pedido } from '../types/Pedido';
import PedidoForm from './PedidoForm';

const PedidoTable: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [pedidoToEdit, setPedidoToEdit] = useState<Pedido | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await PedidoService.getPedidos();
      setPedidos(response.data);
    } catch (error) {
      alert('No se pudieron cargar los pedidos');
    }
  };

  const handlePedidoAdded = (newPedido: Pedido) => {
    setPedidos([...pedidos, newPedido]);
  };

  const handlePedidoUpdated = (updatedPedido: Pedido) => {
    setPedidos(pedidos.map(pedido => 
      pedido.pedidoId === updatedPedido.pedidoId ? updatedPedido : pedido
    ));
    setPedidoToEdit(undefined);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    if (window.confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
      handleDeleteConfirm();
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      try {
        await PedidoService.deletePedido(deleteId);
        setPedidos(pedidos.filter(pedido => pedido.pedidoId !== deleteId));
        alert('Pedido eliminado');
      } catch (error) {
        alert('No se pudo eliminar el pedido');
      }
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      {/* Formulario para añadir/editar pedido */}
      <PedidoForm 
        onPedidoAdded={handlePedidoAdded}
        onPedidoUpdated={handlePedidoUpdated}
        pedidoToEdit={pedidoToEdit}
      />

      {/* Tabla de pedidos */}
      <div style={{ overflowX: 'auto', width: '100%' }} >
        {pedidos.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Cliente</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Cantidad</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Menu ID</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Estado</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map(pedido => (
                <tr key={pedido.pedidoId}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pedido.pedidoId}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pedido.nombreCliente}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pedido.cantidadPersonas}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pedido.menuId}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pedido.estadoOrden}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(pedido.fecha).toLocaleString()}</td>
                  <td>
                    <button onClick={() => setPedidoToEdit(pedido)} style={{ marginRight: '0.5rem' }}>Editar</button>
                    <button onClick={() => handleDeleteClick(pedido.pedidoId)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay pedidos registrados</p>
        )}
      </div>
    </div>
  );
};

export default PedidoTable;
