import axios from "axios";
import { Pedido } from "../types/Pedido";

const API_URL = 'http://localhost:8020/api/pedido';

class PedidoService {

    getPedidos(){
        return axios.get<Pedido[]>(API_URL);
    }

    getPedidoById(pedidoId: number){
        return axios.get<Pedido>(`${API_URL}/${pedidoId}`);
    }

    createPedido(pedido: Pedido){
        return axios.post<Pedido>(API_URL, pedido);
    }

    updatePedido(pedidoId: number, pedido: Pedido) {
        return axios.put<Pedido>(`${API_URL}/${pedidoId}`, pedido);
    }

    deletePedido(pedidoId: number){
        return axios.delete<void>(`${API_URL}/${pedidoId}`)
    }

}

export default new PedidoService();