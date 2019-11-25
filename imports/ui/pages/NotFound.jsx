import React from 'react';
import { Header } from 'semantic-ui-react';

/** Página por defecto para cuando ingrese a una ruta mala */
class NotFound extends React.Component {
  render() {
    return (
      <Header as="h2" textAlign="center">
        <p>Página no encontrada</p>
      </Header>
    );
  }
}

export default NotFound;
