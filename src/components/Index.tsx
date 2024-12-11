import React from 'react';
import '../Styles/Index.css';

const App: React.FC = () => {
  return (
    <>
      <header className="header">
        <div className="menu container">
          <a href="#" className="logo">Restaurante</a>
          <label htmlFor="menu">
            <img src="img/menu.png" className="menu-icono" alt="Menu Icon" />
          </label>
          <nav className="navbar">
            <ul>
              <li><a href="#reMenu">Menú</a></li>
              <li><a href="#foPedidos">Pedidos</a></li>
              <li><a href="#foReserva">Reserva</a></li>
            </ul>
          </nav>
        </div>
        <div className="header-content container">
          <img className="logo" src="img/Logo.png" alt="Logo" />
        </div>
      </header>

      <section className="plato">
        <div className="plato-content container">
          <h2 className="tplato1">Platos</h2>
          <h2 className="tplato2">más populares</h2>
          <div className="plato-group">
            <div className="plato-1">
              <img className="ceviche" src="img/ceviche.png" alt="Ceviche" />
              <h3>Ceviche</h3>
              <p>
                El cebiche, ceviche, sebiche o seviche es un plato consistente en carne marinada ―pescado, mariscos o
                ambos― en aliños cítricos, reconocido por la Unesco como expresión de la cocina tradicional peruana y
                patrimonio cultural inmaterial de la humanidad
              </p>
            </div>

            <div className="plato-1">
              <img className="chicharon" src="img/chicharron.png" alt="Chicharrón" />
              <h3>Chicharrón</h3>
              <p>
                En Perú, la palabra “chicharrones” (plural de chicharrón) se refiere a buñuelos elaborados con carne
                animal. Los más comunes son el pollo (chicharrones de pollo), el sándwich de cerdo frito (pan con
                chicharrón) y el pescado (chicharrones de pescado).
              </p>
            </div>

            <div className="plato-1">
              <img className="combinado" src="img/combinado.png" alt="Combinado" />
              <h3>Combinado</h3>
              <p>
                En Perú, el combinado es una comida que reúne varios potajes en un solo platillo. Este nace gracias a la
                creatividad de los cocineros, ya que en zonas populares, como el paladar es exigente y un solo platillo
                no suele llenar el estómago de algunos, se le agrega otros alimentos más.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="form-1" id="reMenu">
        <div className="container">
          <div className="row">
            <h1>Registro del menú</h1>
            <div className="description">
              <p>
                "Bienvenido al sistema de registro de menú. Aquí puedes agregar de manera rápida y sencilla nuevos platos
                al menú ingresando el nombre del plato, una breve descripción y su precio. Haz clic en el botón
                'Agregar' para guardar la información y actualizar la lista de platos registrada en la tabla inferior.
              </p>
            </div>
            <form id="menuForm">
              <div className="mb-3">
                <input type="text" className="form-control" id="categoria" placeholder="Categoria" required />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" id="nombreMenu" placeholder="Nombre del plato" required />
              </div>
              <div className="mb-3">
                <input type="number" className="form-control" id="precioMenu" placeholder="Precio" required />
              </div>
              <div className="mb-3">
                <input type="number" className="form-control" id="stock" placeholder="Stock" required />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" id="descripcionMenu" placeholder="Descripcion" required />
              </div>
              <div className="mb-3">
                <button className="btn" type="submit">Agregar</button>
              </div>
            </form>
            <table id="menuTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Categoria</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Descripcion</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <div id="editMenu" className="modal">
            <div className="modal-content">
              <span className="close">&times;</span>
              <h2>Editar plato</h2>
              <form id="editFormMenu">
                <div className="mb-3">
                  <input type="hidden" id="editIdMenu" />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="editcategoriaMenu"
                    placeholder="Categoria"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="editNameMenu"
                    placeholder="Nombre del plato"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="editPreMenu"
                    placeholder="Precio"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="editstockMenu"
                    placeholder="Stock"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="editDesMenu"
                    placeholder="Descripcion"
                    required
                  />
                </div>
                <div className="mb-3">
                  <button className="btn" type="submit">
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Similar conversion will continue for the "foPedidos" and "foReserva" sections */}
    </>
  );
};

export default App;
