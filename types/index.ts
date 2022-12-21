export interface IClientInfo {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    direccion: string;
    fechanacimiento: Date;
    imagen: string;
    items: Item[];
}

export interface Item {
    id: number;
    descripcion: string;
    cantidad: number;
    precio: number;
}
