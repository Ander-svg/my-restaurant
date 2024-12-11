import React, { useEffect, useState } from 'react';
import MenuService from '../service/MenuService';
import { Menu } from '../types/Menu';
import MenuForm from './MenuForm';

const MenuTable: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuToEdit, setMenuToEdit] = useState<Menu | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await MenuService.getMenu();
      setMenus(response.data);
    } catch (error) {
      alert('No se pudieron cargar los menús');
    }
  };

  const handleMenuAdded = (newMenu: Menu) => {
    setMenus([...menus, newMenu]);
  };

  const handleMenuUpdated = (updatedMenu: Menu) => {
    setMenus(menus.map(menu => 
      menu.menuId === updatedMenu.menuId ? updatedMenu : menu
    ));
    setMenuToEdit(undefined);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    if (window.confirm("¿Estás seguro de que deseas eliminar este menú?")) {
      handleDeleteConfirm();
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      try {
        await MenuService.deleteMenu(deleteId);
        setMenus(menus.filter(menu => menu.menuId !== deleteId));
        alert('Menú eliminado');
      } catch (error) {
        alert('No se pudo eliminar el menú');
      }
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      {/* Formulario para añadir/editar menú */}
      <MenuForm 
        onMenuAdded={handleMenuAdded}
        onMenuUpdated={handleMenuUpdated}
        menuToEdit={menuToEdit}
      />

      {/* Tabla de menús */}
      <div style={{ overflowX: 'auto', width: '100%' }} >
        {menus.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Nombre</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Categoría</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Precio</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Stock</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {menus.map(menu => (
                <tr key={menu.menuId}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{menu.menuId}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{menu.nombre}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{menu.categoria}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{menu.precio}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{menu.stock}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{menu.descripcion}</td>
                  <td>
                    <button onClick={() => setMenuToEdit(menu)} style={{ marginRight: '0.5rem' }} >Editar</button>
                    <button onClick={() => handleDeleteClick(menu.menuId)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay menús registrados</p>
        )}
      </div>
    </div>
  );
};

export default MenuTable;
