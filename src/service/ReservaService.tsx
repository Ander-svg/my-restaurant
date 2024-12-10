import axios from "axios";
import { Reserva } from "../types/Reserva";

const API_URL = '/api/reserva';

class ReservaService {

    getReserva(){
        return axios.get<Reserva[]>(API_URL);
    }

    getReservaById(reservaId: number){
        return axios.get<Reserva>(`${API_URL}/${reservaId}`);
    }

    createReserva(reserva: Reserva){
        return axios.post<Reserva>(API_URL, reserva);
    }

    updateReserva(reservaId: number, reserva: Reserva) {
        return axios.put<Reserva>(`${API_URL}/${reservaId}`, reserva);
    }

    declareReserva(reservaId: number){
        return axios.delete<void>(`${API_URL}/${reservaId}`)
    }

}

export default new ReservaService();