import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Es una sola fila de la tabla en donde se muestran las películas */
class PeliculaItem extends React.Component {
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
          <Table.Cell>
            <Link to={'/edit/${this.props.pelicula._id}'}>Edit</Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Con esto, se pasa un documento a este componente */
PeliculaItem.propTypes = {
  pelicula: PropTypes.object.isRequired,
};


export default withRouter(PeliculaItem);
