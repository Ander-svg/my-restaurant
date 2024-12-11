import React, { useState, useEffect } from 'react';
import PedidoService from '../service/PedidoService';
import { Pedido } from '../types/Pedido';

interface MenuFormProps {
  onMenuAdded: (menu: Menu) => void;
  onMenuUpdated: (menu: Menu) => void;
  menuToEdit?: Menu;
}

const MenuForm: React.FC<MenuFormProps> = ({
  onMenuAdded,
  onMenuUpdated,
  menuToEdit,
}) => {
  const [categoria, setCategoria] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState<number | string>('');
  const [stock, setStock] = useState<number | string>('');
  const [descripcion, setDescripcion] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (menuToEdit) {
      setCategoria(menuToEdit.categoria);
      setNombre(menuToEdit.nombre);
      setPrecio(menuToEdit.precio.toString());
      setStock(menuToEdit.stock.toString());
      setDescripcion(menuToEdit.descripcion);
      setIsEditMode(true);
    }
  }, [menuToEdit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const menuData: Omit<Menu, 'menuId'> = { 
      categoria, 
      nombre, 
      precio: Number(precio), 
      stock: Number(stock), 
      descripcion 
    };

    try {
      if (isEditMode && menuToEdit) {
        const response = await MenuService.updateMenu(menuToEdit.menuId, menuData as Menu);
        onMenuUpdated(response.data);
        setMessage('Menú actualizado correctamente');
      } else {
        const response = await MenuService.createMenu(menuData as Menu);
        onMenuAdded(response.data);
        setMessage('Menú agregado correctamente');
      }
      resetForm();
    } catch (error) {
      setMessage('No se pudo guardar el menú');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCategoria('');
    setNombre('');
    setPrecio('');
    setStock('');
    setDescripcion('');
    setIsEditMode(false);
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="categoria">Categoría</label>
          <input
            id="categoria"
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Ingrese categoría"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese nombre"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="precio">Precio</label>
          <input
            id="precio"
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ingrese precio"
            required
            style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Ingrese stock"
            required
            style={{ width: '100%', padding: '0.5em', marginTop: '0.5em' }}
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ingrese descripción"
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
            ? 'Actualizar Menú'
            : 'Agregar Menú'}
        </button>
      </form>
    </div>
  );
};

export default PedidoForm;