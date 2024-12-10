export interface Pedido {

    pedidoId: number;
    cantidadPersonas: number;
    nombreCliente: string;
    menuId: number;
    estadoOrden: string;
    fecha: Date;
}