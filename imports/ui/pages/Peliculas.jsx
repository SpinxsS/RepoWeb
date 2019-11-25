import React, { Component } from 'react';
import BarraBusqueda from './BarraBusqueda';
import CardPelicula from './CardPelicula';
import { Grid } from '@material-ui/core';
import SimpleModalWrapped from './Modal';

//Clase de películas que utiliza una api de omdapi , la cual trae las películas y las muestra
class Peliculas extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      peliculas: [],
      pelicula: [],
      genres: [],
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

  // método para obtener todo el arreglo de las películas del api
  handleSubmit(event) {
    console.log('ingresado en input: ' + this.state.value);
    fetch(`https://www.omdbapi.com/?apikey=a076b37c&s=${this.state.value}`)
      .then(res => res.json())
      .then(res => this.setState({ peliculas: res.Search }))
      .catch(e => console.log(e))
    event.preventDefault();
  }

  obtenerGeneros(event) {
    console.log('ingresado en input: ' + this.state.value);
    fetch(`https://www.omdbapi.com/?apikey=a076b37c&s=${this.state.value}`)
      .then(res => res.json())
      .then(res => this.setState({ genres: res.genres }))
      .catch(e => console.log(e))
    event.preventDefault();
  }

    //Cuando estamos mostrando una sola película y le damos al botón cerrar
  cerrarModal() {
    this.setState({ open: false, pelicula: [] })
  }

  //código que se trae sólo la película específica cuando le damos click a una película
  abrirModal(e) {
    fetch(`https://www.omdbapi.com/?apikey=a076b37c&i=${e.imdbID}`)
      .then(res => res.json())
      .then(res => this.setState({ pelicula: res }))
      .catch(e => console.log(e))
    this.setState({ open: !this.state.open })

  }

  //método para listar todas las películas que se trae el api, en caso de no encontrar alguna película retorna un mensaje.
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

  obtenerDatos(){
    datos=this.state.peliculas;
    console.log(datos+ "imprime algo")
    return datos;
  }

  render() {
    console.log('open: ' + this.state.open)
    return (
      <div>
        
        <BarraBusqueda valor={this.state.value} change={this.handleChange} submits={this.handleSubmit}  genres={this.obtenerGeneros}  />

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