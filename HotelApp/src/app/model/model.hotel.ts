import {ComentarioApp} from './model.comentario';

export class HotelApp {
  id: number;
  comentarios: ComentarioApp[];
  calificacionPromedio: number;
  costo: number;
  nombre: string;
  ubicacion: string[];
}
