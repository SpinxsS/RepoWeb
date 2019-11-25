import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * El componente de registro es similar al componente de inicio de sesión, pero en su lugar creamos un nuevo usuario.
 */
class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Actualice los controles del formulario cada vez que el usuario interactúa con ellos. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Cree una cuenta de usuario y una entrada de perfil, luego redirija a la página de inicio. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Mostrar el formulario de registro. Redireccionar a la ruta de agregar después de un registro exitoso e iniciar sesión.*/
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/agregar' } };
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Registra tu cuenta
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="Ingrese su correo"
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
            ¿Ya tienes una cuenta? Iniciar sesión <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Se asegura que el objeto de ubicación React Router esté disponible en caso de que necesitemos redirigir */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
