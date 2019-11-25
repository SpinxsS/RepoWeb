import React from 'react';
import { Button, TextField, Grid } from '@material-ui/core'

const InputSearch = ({ valor, change, submits }) => {
  return (

    <Grid container justify="center">
      <Grid item>
        <form onSubmit={submits} style={{ marginTop: "2em" }}>
          <TextField
            id="outlined-name"
            label="look for a movie"
            value={valor}
            onChange={change}
            required
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: "8px", marginLeft: "10px" }}>Search</Button>
        </form>
      </Grid>
    </Grid>

  )
}

export default InputSearch;