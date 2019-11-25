import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class PeliculaItemAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.pelicula.titulo}</Table.Cell>
          <Table.Cell>{this.props.pelicula.anoEstreno}</Table.Cell>
          <Table.Cell>{this.props.pelicula.genero}</Table.Cell>
          <Table.Cell>{this.props.pelicula.duracion}</Table.Cell>
          <Table.Cell>{this.props.pelicula.calificacion}</Table.Cell>
          <Table.Cell>{this.props.pelicula.poster}</Table.Cell>
          <Table.Cell>{this.props.pelicula.actoresPrincipales}</Table.Cell>
          <Table.Cell>{this.props.pelicula.sinopsis}</Table.Cell>
          <Table.Cell>{this.props.pelicula.resena}</Table.Cell>
          <Table.Cell>{this.props.pelicula.director}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
PeliculaItemAdmin.propTypes = {
  stuff: PropTypes.object.isRequired,
};

export default PeliculaItemAdmin;
