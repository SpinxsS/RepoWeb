import React from 'react';
import { Peliculas } from '/imports/api/Película';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';

const peliculaEsquema = new SimpleSchema({
 
  titulo: String,
  anoEstreno: Number,
  genero: String,
  duracion: Number,
  calificacion: Number,
  poster:String,
  actoresPrincipales:String,
  sinopsis: String,
  resena:String,
  director: String,
 });


// Esta clase tiene el propósito construir la lógica para poder agregar una película
class AgregarPelicula extends React.Component {

  /** Botón de sumbit para agregar películas */
  submit(data, formRef) {
    const { titulo, anoEstreno, genero, duracion, calificacion, poster, actoresPrincipales, sinopsis, resena, director   } = data;
    const owner = Meteor.user().username;
    Peliculas.insert({ titulo, anoEstreno, genero, duracion, calificacion, poster, actoresPrincipales, sinopsis, resena, director, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item añadido correctamente', 'success');
          formRef.reset();
        }
      });
  }

  /**  Renderiza el formulario.  https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Agregar Película</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={peliculaEsquema} onSubmit={data => this.submit(data, fRef)} >
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
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AgregarPelicula;
