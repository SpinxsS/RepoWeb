import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** Después de que el usuario haga clic en el enlace "Cerrar sesión" en la barra de navegación, cierre la sesión y muestre esta página. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <Header as="h2" textAlign="center">
        <p>Tu has cerrado sesión</p>
      </Header>
    );
  }
}
