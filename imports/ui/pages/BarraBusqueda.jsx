import React from 'react';
import { Button, TextField, Grid } from '@material-ui/core'

//Componente para la barra de busqueda de las películas a mostrar
const BarraBusqueda = ({ valor, change, submits, genress }) => {
  console.log(genress);
  return (

    <Grid container justify="center">
      <Grid item>
        <form onSubmit={submits} style={{ marginTop: "2em" }}>
          

          <TextField
            id="outlined-name"
            label="Busca una película"
            value={valor}
            onChange={change}
            required
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: "8px", marginLeft: "10px" }}>Buscar</Button>
        </form>
      </Grid>
    </Grid>

  )
}

export default BarraBusqueda;