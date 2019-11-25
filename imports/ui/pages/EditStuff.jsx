import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Peliculas, peliculaEsquema } from '/imports/api/Película';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders the Page for editing a single document. */
class EditStuff extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { titulo, anoEstreno, genero, duracion, calificacion, poster, actoresPrincipales, sinopsis, resena, director, _id } = data;
    Peliculas.update(_id, { $set: { titulo, anoEstreno, genero, duracion, calificacion, poster, actoresPrincipales, sinopsis, resena, director } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
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

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditStuff.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Película');
  return {
    doc: Peliculas.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditStuff);
