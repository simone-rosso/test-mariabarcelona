import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import './App.css';
import { Button, MenuItem, Select, OutlinedInput } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const defaultInfos = {
  name: "",
  surname: "",
  gender: "",
  id: undefined,
  document_type: "none",
  identification: undefined,
  email: "",
  password: ""
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      infos: defaultInfos
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.handleRadioCheck = this.handleRadioCheck.bind(this);
  }

  handleChange(event, field) {
    var newName = event.target.value;
    var auxInfo = this.state.infos;

    auxInfo[field] = newName;
    this.setState({ infos: auxInfo })
  }

  handleRadioCheck(event) {
    this.setState({ gender: event.target.value });
  }

  sendInfo() {
    fetch("https://my-json-server.typicode.com/volkz/technical-form/users", {
      method: 'POST',
      body: this.state.infos,
      type: JSON
    }).then((result)=> console.log(result));
  }

  apiCall() {
    fetch("https://my-json-server.typicode.com/volkz/technical-form/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({infos:result[0]})
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth="md">
          <div className="container">
            <h3 id="datos-personales">Tus datos personales</h3>
            <div className="row">
              <div className="col-sm-6 form-name">
                <TextField
                  id="outlined-name"
                  label="Nombre"
                  value={this.state.infos.name}
                  onChange={(e) => this.handleChange(e, "name")}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="col-sm-6 form-surname">
                <TextField
                  id="outlined-surname"
                  label="Apellido"
                  value={this.state.infos.surname}
                  onChange={(e) => this.handleChange(e, "surname")}
                  margin="normal"
                  variant="outlined"
                />
              </div>


              <div className="row col-sm-6 form-birth">
                <label>Fecha de nacimiento</label>
                <div className="birthday-container">
                  <TextField
                    id="outlined-date-day"
                    className="date-fields"
                    type="number"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-date-month"
                    className="date-fields"
                    type="number"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-date-year"
                    className="date-fields"
                    type="number"
                    margin="normal"
                    variant="outlined"
                  />
                </div>
              </div>

              <div className="row col-sm-6 form-document">
                <label>Documento</label>
                <div className="birthday-container">

                  <FormControl variant="outlined" >
                    <Select
                      value={this.state.infos.document_type}
                      onChange={(e) => this.handleChange(e, "document_type")}
                      input={<OutlinedInput />}>
                      <MenuItem value="none">
                      </MenuItem>
                      <MenuItem value="DNI">DNI</MenuItem>
                      <MenuItem value="NIE">NIE</MenuItem>
                      <MenuItem value="PASSPORT">PASSPORT</MenuItem>
                    </Select>
                  </FormControl>

                  <div className="col-sm-7 document-number">
                    <TextField
                      id="outlined-document-number"
                      value={this.state.infos.identification}
                      onChange={(e) => this.handleChange(e, "document-number")}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>

              <div className="col-sm-12 form-gender">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Genero</FormLabel>
                  <RadioGroup aria-label="position" name="position" value={this.state.gender} onChange={this.handleRadioCheck} row>
                    <FormControlLabel
                      value="a"
                      control={<Radio color="primary" />}
                      label="Mujer"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="b"
                      control={<Radio color="primary" />}
                      label="Hombre"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="c"
                      control={<Radio color="primary" />}
                      label="Prefiero no contestar"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="col-sm-6 form-email">
                <TextField
                  id="outlined-email"
                  label="Email"
                  value={this.state.infos.email}
                  onChange={(e) => this.handleChange(e, "email")}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="col-sm-6 form-repeat-email">
                <TextField
                  id="outlined-repeat-email"
                  label="Repeat e-mail"
                  value={this.state.infos.email}
                  onChange={(e) => this.handleChange(e, "email")}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </div>
          </div>


          <Button variant="contained" color="primary" onClick={this.sendInfo}> Send</Button>
          <Button variant="contained" color="primary" onClick={this.apiCall}>Call</Button>
        </Container>
      </div >
    );
  }
}

export default App;
