import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/Película';
import PeliculaItemAdmin from '/imports/ui/components/PeliculaItemAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListaPeliculasAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. 
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }*/

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Lista Películas del admin (Admin)</Header>
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
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.peliculas.map((pelicula) => <PeliculaItemAdmin key={pelicula._id} stuff={pelicula} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListaPeliculasAdmin.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('StuffAdmin');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListaPeliculasAdmin);
