export interface EjemploAll {
    ejemplo: Ejemplo[];
}

export interface Ejemplo {
    _id?:      string;
    name:     string;
    apellido: string;
    edad:     number;
    contacto: string[];
}
