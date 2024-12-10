import axios from "axios";
import { Pedido } from "../types/Pedido";

const API_URL = '/api/pedido';

class PedidoService {

    getPedido(){
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

    declarePedido(pedidoId: number){
        return axios.delete<void>(`${API_URL}/${pedidoId}`)
    }

}

export default new PedidoService();