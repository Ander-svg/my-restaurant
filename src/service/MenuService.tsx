import axios from "axios";
import { Menu } from "../types/Menu";

const API_URL = 'http://localhost:8020/api/menu';

class MenuService {

    getMenu(){ ////Obtiene todos los menus
        return axios.get<Menu[]>(API_URL);
    }

    getMenuById(menuId: number){//Obtiene un menu espesifico por Id
        return axios.get<Menu>(`${API_URL}/${menuId}`);
    }

    createMenu(menu: Menu){//Crea un nuevo menu
        return axios.post<Menu>(API_URL, menu);
    }

    updateMenu(menuId: number, menu: Menu) {//Actuliza la informacion del menu
        return axios.put<Menu>(`${API_URL}/${menuId}`, menu);
    }

    deleteMenu(menuId: number){//Elimina un menu por ID
        return axios.delete<void>(`${API_URL}/${menuId}`)
    }

}

// Exporta una instancia única del servicio para su uso en toda la aplicación
export default new MenuService();