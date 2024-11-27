export interface Cursos {
    cursos: Curso[];
}

export interface Curso {
    _id?:           string;
    nombre:        string;
    duracionHoras: number;
    nivel:         string;
    precio:        number;
}
