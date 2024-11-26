export interface computadorR {
    tcomputadoras: Tcomputadora[];
}

export interface Tcomputadora {
    _id?:            string;
    marca:          string;
    tRam:           string;
    ramC:           number;
    tMemoria:       string;
    cMemoria:       number;
    procesador:     string;
    tarjetaDrafica: string;
    precio:         number;
}