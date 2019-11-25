import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';
import './index.css';

/** Inicie la aplicación representando el componente de diseño de la aplicación. */
Meteor.startup(() => {
  render(<App />, document.getElementById('root')); 
});
