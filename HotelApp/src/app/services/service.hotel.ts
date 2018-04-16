import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HotelApp } from '../model/model.hotel';
import { ComentarioApp } from '../model/model.comentario';


@Injectable()
export class HotelService {
  hotelCollection: AngularFirestoreCollection<HotelApp>;
  hotels: Observable<HotelApp[]>;
  hotelDoc: AngularFirestoreDocument<HotelApp>;
  // tasks: Task[];

  @Output() filtro: EventEmitter<HotelApp[]> = new EventEmitter();
  @Output() sizeHotels: EventEmitter<number> = new EventEmitter();

  constructor(public db: AngularFirestore) {
    this.hotelCollection = this.db.collection('hotels');
    // this.tasks = this.taskCollection.valueChanges();
    this.hotels = this.hotelCollection.snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const info = a.payload.doc.data() as HotelApp;
          info.id = a.payload.doc.id;
          return info;
        });
    });
  }

//  setHotelesFiltrados(hotels: HotelApp[]) {
//    this.filtro.emit(hotels);
//  }

//  setSizeHotels(valor: number) {
//    this.sizeHotels.emit(valor);
///  }

//  getHotels(): Observable<HotelApp[]> {
//    this.loadFireBaseHotels();
//    return this.hotels;
//  }


//  deleteHotel(hotel: HotelApp) {
//    this.hotelDoc = this.afs.doc('hotels/' + hotel.id);
//    this.hotelDoc.delete();
//  }

  /**
   * Permite actualizar un hotel con sus nuevos estados y calificaciones
   * @param {HotelApp} hotel
   */
  updateHotel(hotel: HotelApp) {
    this.hotelDoc = this.db.doc('hotels/' + hotel.id);
    this.hotelDoc.update(hotel);
  }

  filtrar(hoteles: HotelApp[], valor: string) {
    // this.loadFireBaseHotels();
    const lista: HotelApp[] = [];
    hoteles.forEach(hotel => {
      const nombre = hotel.nombre.toLowerCase();
        if (nombre.includes(valor.toLowerCase())) {
          lista.push(hotel);
        }
      });
    return { hoteles: lista, sizeH: hoteles.length };
  }


  /**
   * Permite agregar un nuevo hotel
   * @param {HotelApp} hotel
   */
  addHotel(nombre: string, costo: number, ubicacion: string[]) {
    const hotel: HotelApp = {
      id: 0,
      nombre: nombre,
      costo: costo,
      calificacionPromedio: 0,
      ubicacion: ubicacion,
      comentarios: []
    };
    this.hotelCollection.add(hotel);
  }
}
