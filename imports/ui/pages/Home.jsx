import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** Pagina por default del home */
class Home extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Welcome to this template</h1>
            <p>Now get to work and modify this app!</p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Home;
