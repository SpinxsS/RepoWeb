import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Colleccion en mongo */
const Peliculas = new Mongo.Collection('Peliculas');

const peliculaEsquema = new SimpleSchema({
 
  titulo: String,
  anoEstreno: Number,
  genero: String,
  duracion: Number,
  calificacion: Number,
  poster:String,
  actoresPrincipales:String,
  sinopsis: String,
  resena:String,
  director: String,
  owner: String,
}, { tracker: Tracker });

/** Agregar el esquema a la colección de películas */
Peliculas.attachSchema(peliculaEsquema);

/** Exporta tanto el esquema como la colección para poder ser usados desde otra clase */
export { Peliculas, peliculaEsquema };
