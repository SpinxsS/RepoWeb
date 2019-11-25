import React from 'react';

/** The Footer de la aplicación */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              Hecho por <br />
              Rubiano Ronaldo y Felipe Cortés<br />
            <a href="https://www.meteor.com">Página de meteor</a>
          </div>
        </footer>
    );
  }
}

export default Footer;
