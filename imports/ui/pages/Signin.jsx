import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

/**
 * La página de inicio de sesión anula el evento de envío del formulario y llama a loginWithPassword de Meteor ().
 * Los errores de autenticación modifican el estado del componente que se mostrará
 */
export default class Signin extends React.Component {

  /** Inicializa el estado del componente con propiedades para inicio de sesión y redirección. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Actualice los controles del formulario cada vez que el usuario interactúa con ellos. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Manejar el envío de inicio de sesión utilizando el mecanismo de cuenta de Meteor. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Renderiza un formulario de inicio de sesión  */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // Si la autenticación es correcta, redirija a la página en lugar de la pantalla de inicio de sesión
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // De otra manera, retorne de nuevo al login
    return (

      //formulario de login
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Ingrese a su cuenta
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="Ingrese su dirección de email"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button content="Submit"/>
              </Segment>
            </Form>
            <Message>
              <Link to="/signup">Haga click aquí para registrarse</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Login no exitoso"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Se asegura que el objeto de ubicación React Router esté disponible en caso de que necesitemos redirigir.*/
Signin.propTypes = {
  location: PropTypes.object,
};
