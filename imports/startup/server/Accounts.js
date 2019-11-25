import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

// Nos hemos apoyado en esta guía para usar el paquete accounts-base de meteor y poder crear usuarios
// https://github.com/DiscoverMeteor/DiscoverMeteor_Es/blob/master/06-adding-users.md.erb
// https://guide.meteor.com/accounts.html

function createUser(email, password, role) {
  console.log('Creando usuario ${email}.');
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Cuando ejecute la aplicación por primera vez, pase un archivo de configuración para configurar una cuenta de usuario predeterminada */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creando un usuario por defecto');
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('No se pudo inicializar la base de datos');
  }
}
