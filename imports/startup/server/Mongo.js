import { Meteor } from 'meteor/meteor';
import { Peliculas } from '../../api/Película.js';

/** Inicializa mongo con un documento por defecto */
function addData(data) {
  console.log('agregando : ${data.name} (${data.owner}');
  Peliculas.insert(data);
}

/** Inicializa la colección si se encuentra vacía */
if (Peliculas.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Crear datos por defecto.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
