import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Peliculas, peliculaEsquema } from '/imports/api/Película';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Esta clase tiene el propósito construir la lógica para poder editar una película */
class EditarPelicula extends React.Component {

  /** En el envío exitoso, inserte los datos. */
  submit(data) {
    const { titulo, anoEstreno, genero, duracion, calificacion, poster, actoresPrincipales, sinopsis, resena, director, _id } = data;
    Peliculas.update(_id, { $set: { titulo, anoEstreno, genero, duracion, calificacion, poster, actoresPrincipales, sinopsis, resena, director } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item actualizado correctamente', 'success')));
  }

  /**  
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }
*/


  /** Renderiza el formulario. https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Editar Película</Header>
            <AutoForm schema={peliculaEsquema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
              <TextField name='titulo'/>
                <NumField name='anoEstreno' decimal={false}/>
                <TextField name='genero'/>
                <NumField name='duracion' decimal={false}/>
                <NumField name='calificacion' decimal={true}/>
                <TextField name='poster'/>
                <TextField name='actoresPrincipales'/>
                <TextField name='sinopsis'/>
                <TextField name='resena'/>
                <TextField name='director'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Requerir la presencia de un documento película. Agrega 'modelo' a los accesorios, que usamos. */
EditarPelicula.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker conecta los datos de Meteor a los componentes React. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Obtenga el documentID del campo URL. Consulte import / ui / layouts / App.jsx para ver la ruta que contiene: _id.
  const documentId = match.params._id;
  // Obtenga acceso a los documentos de Pelicula.
  const subscription = Meteor.subscribe('Película');
  return {
    doc: Peliculas.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditarPelicula);
