import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Peliculas } from '../../api/Película';

//Las publicaciones son las que nos permiten publicar un grupo de documentos
// de manera reactiva que se actualiza en tiempo real con cualquier cambio


/** Esta suscripción publica solo los documentos asociadosal usuario logueado */
Meteor.publish('Película', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Peliculas.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('PeliculaAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Peliculas.find();
  }
  return this.ready();
});
