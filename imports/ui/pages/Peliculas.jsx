import React, { Component } from 'react';
import InputSearch from './InputSearch';
import CardPelicula from './CardPelicula';
import { Grid } from '@material-ui/core';
import SimpleModalWrapped from './Modal';

class Peliculas extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      peliculas: [],
      pelicula: [],
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.abrirModal = this.abrirModal.bind(this);
    this.cerrarModal = this.cerrarModal.bind(this)
    this.listMovies = this.listMovies.bind(this)
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log('ingresado en input: ' + this.state.value);
    fetch(`https://www.omdbapi.com/?apikey=a076b37c&s=${this.state.value}`)
      .then(res => res.json())
      .then(res => this.setState({ peliculas: res.Search }))
      .catch(e => console.log(e))
    event.preventDefault();
  }
  cerrarModal() {
    this.setState({ open: false, pelicula: [] })
  }
  abrirModal(e) {
    fetch(`https://www.omdbapi.com/?apikey=a076b37c&i=${e.imdbID}`)
      .then(res => res.json())
      .then(res => this.setState({ pelicula: res }))
      .catch(e => console.log(e))
    this.setState({ open: !this.state.open })

  }
  listMovies() {
    return (
      this.state.peliculas === undefined ? <div><h2>Ups! no encontramos nada con ese nombre</h2></div> : (
        this.state.peliculas.map((e, i) => {
          return (
            <Grid key={i} item md={3} style={{ padding: '1em' }}>
              <CardPelicula clickmodal={this.abrirModal} datos={e} />
            </Grid>
          )
        })
      )
    )
  }

  render() {
    console.log('open: ' + this.state.open)
    return (
      <div>
        <InputSearch valor={this.state.value} change={this.handleChange} submits={this.handleSubmit} />
        <Grid container direction="row" justify="flex-start" alignItems="center" >
          {
            this.listMovies()
          }
          <SimpleModalWrapped abrir={this.state.open} cerrar={this.cerrarModal} datos={this.state.pelicula} />
        </Grid>
      </div>

    )
  }
}
export default Peliculas;