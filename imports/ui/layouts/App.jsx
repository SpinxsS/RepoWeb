import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import ListarPelicula from '../pages/ListarPelicula';
import ListaPeliculasAdmin from '../pages/ListaPeliculasAdmin';
import AgregarPelicula from '../pages/AgregarPelicula';
import EditarPelicula from '../pages/EditarPelicula';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Peliculas from '../pages/Peliculas';

/** clase principal de la aplicación donde importamos muchos de los componentes y utilizamos rutas para especificar cada vista */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <ProtectedRoute path="/listar" component={ListarPelicula}/>
              <ProtectedRoute path="/agregar" component={AgregarPelicula}/>
              <ProtectedRoute path="/edit/:_id" component={EditarPelicula}/>
              <ProtectedRoute path="/buscar" component={Peliculas}/>
              <AdminProtectedRoute path="/admin" component={ListaPeliculasAdmin}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * Comprueba el inicio de sesión de Meteor antes de enrutar a la página solicitada, de lo contrario va a la página de inicio de sesión.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * Comprueba el inicio de sesión de Meteor antes de enrutar a la página solicitada, de lo contrario va a la página de inicio de sesión.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Requiere que se pase un componente y una ruta a cada ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Requiere que se pase un componente y una ruta a cada ProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
