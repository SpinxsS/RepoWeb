import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {
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

/** Require a document to be passed to this component. */
StuffItem.propTypes = {
  pelicula: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StuffItem);
