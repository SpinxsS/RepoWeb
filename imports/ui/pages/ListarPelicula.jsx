import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Peliculas } from '/imports/api/Película';
import PeliculaItem from '/imports/ui/components/PeliculaItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Representa una tabla que contiene todos los documentos de pelicula. Usa <PeliculaItem> para representar cada fila. */
class ListarPelicula extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /*Renderice la página una vez que se hayan recibido las suscripciones.*/
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Lista de películas</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Titulo</Table.HeaderCell>
                <Table.HeaderCell>Año Estreno</Table.HeaderCell>
                <Table.HeaderCell>Género</Table.HeaderCell>
                <Table.HeaderCell>Duración</Table.HeaderCell>
                <Table.HeaderCell>Calificación</Table.HeaderCell>
                <Table.HeaderCell>Poster</Table.HeaderCell>
                <Table.HeaderCell>Actores Principales</Table.HeaderCell>
                <Table.HeaderCell>Sinopsis</Table.HeaderCell>
                <Table.HeaderCell>Reseña</Table.HeaderCell>
                <Table.HeaderCell>Director</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.peliculas.map((pelicula) => <PeliculaItem key={pelicula._id} pelicula={pelicula} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/**Rquiere un arreglo de documentos de peliculas en las propiedades*/
ListarPelicula.propTypes = {
  peliculas: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker conecta la data de meteor con los componentes. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Obtiene acceso a los documentos de las películas
  const subscription = Meteor.subscribe('Película');
  return {
    peliculas: Peliculas.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListarPelicula);
