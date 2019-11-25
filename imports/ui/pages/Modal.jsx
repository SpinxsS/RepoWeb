import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Grid, Typography, Button, Hidden } from '@material-ui/core';
import './Style.css'

// Esta clase tiene como propósito darle estilo a lo que es la renderización cuando se obtienen las películas con la api cuando se abre específicamente
//una película y cuando se cierra.
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true
class SimpleModal extends React.Component {

  render() {
    console.log(this.props.datos)
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.abrir}
          onClose={() => this.props.cerrar()}>
          <div>
            
            <Hidden only={['xs']}>
              <Grid container direction="row" justify="center" style={{ border: "none important", padding: "7em", background: "white", height: '100vh', paddingTop: "4em" }}>
                <Grid item xs={12} md={6} sm={6}>
                  <Grid container justify="center">
                    <Grid item>
                      <img src={this.props.datos.Poster} alt="img" />
                    </Grid>
                  </Grid>
                  <Grid container justify="center">
                    <Grid item>
                      <Button onClick={() => this.props.cerrar()} variant="contained" color="secondary">Cerrar</Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
                  <Typography variant="h4" >
                    {this.props.datos.Title}
                  </Typography>
                  <Typography variant="h6" >
                    <strong>Sipnosis: </strong>
                  </Typography>
                  <Grid >
                    <Typography variant="h6">
                      {this.props.datos.Plot}
                    </Typography>
                  </Grid>
                  <Typography variant="subtitle1" >
                    <strong className="h6Typography">Director: </strong> <br />  {this.props.datos.Director}
                  </Typography>
                  <Typography variant="subtitle1" >
                    <strong className="h6Typography" >Actores </strong> <br />  {this.props.datos.Actors}
                  </Typography>
                  <Typography variant="subtitle1" >
                    <strong className="h6Typography">Género</strong> <br /> {this.props.datos.Genre}
                  </Typography>
                  <Typography variant="subtitle1" >
                    <strong className="h6Typography">Año de publicación </strong> <br />  {this.props.datos.Released}
                  </Typography>
                  <Typography variant="subtitle1" >
                    <strong className="h6Typography">Duración </strong> <br /> {this.props.datos.Runtime}
                  </Typography>
                </Grid>
              </Grid>
            </Hidden>
            <Hidden only={['lg', 'md', 'sm', 'xl']}>
              <Grid container direction="row" justify="center" style={{ border: "none important", padding: "1em", background: "white", height: "100vh" }}>
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Grid item>
                      <img style={{ width: "5em" }} src={this.props.datos.Poster} alt="img" />
                    </Grid>
                    <Grid item style={{marginLeft: "1em"}}>
                      <p>
                        <strong className="h6Typography">Género </strong> <br /> {this.props.datos.Genre}
                      </p>
                      <p>
                        <strong className="h6Typography">Duración: </strong> <br /> {this.props.datos.Runtime}
                      </p>
                    </Grid>
                    
                  </Grid>
                  <Grid container justify="center">
                    <Grid item>
                      <Grid >
                        <p>
                          {this.props.datos.Plot}
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container justify="center">
                    <Grid item>
                      <Button onClick={() => this.props.cerrar()} variant="contained" color="secondary">Cerrar</Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} >
                </Grid>
              </Grid>
            </Hidden>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SimpleModal;