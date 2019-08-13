import React, { Component, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import './App.css';
import { Button, MenuItem, Select, OutlinedInput, Zoom } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

const path = "https://my-json-server.typicode.com/volkz/technical-form/users/";

const defaultInfos = {
  name: "",
  surname: "",
  gender: "",
  document_type: "",
  identification: undefined,
  email: "",
  password: "",
  id: ""
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      infos: defaultInfos,
      repeatEmail: "",
      repeatPassword: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeExtra = this.handleChangeExtra.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);

  }

  handleChange(event, field) {
    var newName = event.target.value;
    var auxInfo = this.state.infos;

    auxInfo[field] = newName;
    this.setState({ infos: auxInfo })
  }

  handleChangeExtra(event, field) {
    var newValue = event.target.value;
    field === "repeat-email" ?
      this.setState({ repeatEmail: newValue }) :
      this.setState({ repeatPassword: newValue })
  }

  createUser(data) {
    fetch(path, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((res) => res.json()).then((result) => alert("Created user with these fields" + JSON.stringify(result)))
  }

  getUser(id) {
    fetch(path + id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ infos: result })
        }
      ).catch(
        this.setState({
          infos: {
            name: "",
            surname: "",
            gender: "",
            document_type: "",
            identification: undefined,
            email: "",
            password: ""
          },
          isLoaded: true
        })
      )
  }

  handleUpdateUser(id, data) {
    if (id === undefined || id === null) {
      return alert("Insert ID")
    }
    this.updateUser(id, data);
  }

  updateUser(id, data) {
    fetch(path + id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((result) => alert("Updated user " + id + " with new fields: " + JSON.stringify(result)))
      .catch(err => err);
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth="md">
          <div className="container">
            <div className="title">
              <h3 id="datos-personales">Tus datos personales</h3>
            </div>

            <div className="row first-row">
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
            </div>

            <div className="row second-row">
              <div className="col-sm-6 form-birth">
                <label>Fecha de nacimiento</label>
                <div className="row birthday-container">
                  <TextField
                    id="outlined-date-day"
                    className="date-fields"
                    type="number"
                    margin="normal"
                    variant="outlined"
                    min="1"
                    max="31"
                  />
                  <TextField
                    id="outlined-date-month"
                    className="date-fields"
                    type="number"
                    margin="normal"
                    variant="outlined"
                    max="12"
                    min="1"
                  />
                  <TextField
                    id="outlined-date-year"
                    className="date-fields"
                    type="number"
                    margin="normal"
                    variant="outlined"
                    max="2019"
                    min="1900"
                  />
                </div>
              </div>

              <div className="col-sm-6 form-document">
                <label>Documento identificativo</label>
                <div className="row document-container">
                  <div className="col-sm-5 document-type">
                    <FormControl variant="outlined" >
                      <Select
                        value={this.state.infos.document_type}
                        onChange={(e) => this.handleChange(e, "document_type")}
                        input={<OutlinedInput />}>
                        <MenuItem value="DNI">DNI</MenuItem>
                        <MenuItem value="NIE">NIE</MenuItem>
                        <MenuItem value="PASSPORT">PASSPORT</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
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
            </div>

            <div className="row third-row">
              <div className="col-sm-12 form-gender">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Genero</FormLabel>
                  <RadioGroup aria-label="position" name="position" row>
                    <FormControlLabel
                      value="Mujer"
                      control={<Radio color="primary" />}
                      label="Mujer"
                      labelPlacement="end"
                      onChange={(e) => this.handleChange(e, "gender")}
                    />
                    <FormControlLabel
                      value="Hombre"
                      control={<Radio color="primary" />}
                      label="Hombre"
                      labelPlacement="end"
                      onChange={(e) => this.handleChange(e, "gender")}
                    />
                    <FormControlLabel
                      value="Prefiero no contestar"
                      control={<Radio color="primary" />}
                      label="Prefiero no contestar"
                      labelPlacement="end"
                      onChange={(e) => this.handleChange(e, "gender")}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div className="row fourth-row">
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
                  label="Repetir e-mail"
                  value={this.state.repeatEmail}
                  onChange={(e) => this.handleChangeExtra(e, "repeat-email")}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </div>

            <div className="row buttons-row">
              <div className="col-md-12 button-column">
                <Button color="primary" onClick={() => this.createUser(this.state.infos)}>Crea usuario</Button>
              </div>
            </div>

            <div className="title">
              <h4 id="change-password-title">Contraseña</h4>
              <Tooltip
                TransitionComponent={Zoom}
                title="Para modificar la contraseña inserir un ID correcto">
                <Icon>info</Icon>
              </Tooltip>
            </div>
            <div className="row fifth-row">
              <div className="col-sm-6 form-password">
                <TextField
                  id="outlined-password"
                  label="Contraseña"
                  type="password"
                  value={this.state.infos.password}
                  onChange={(e) => this.handleChange(e, "password")}
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="col-sm-6 form-repeat-password">
                <TextField
                  id="outlined-repeat-password"
                  label="Repetir contraseña"
                  type="password"
                  value={this.state.repeatPassword}
                  onChange={(e) => this.handleChangeExtra(e, "repeat-password")}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </div>

            <div className="row buttons-row">
              <div className="col-md-12 button-column">
                <Button
                  color="primary"
                  onClick={() => this.handleUpdateUser(this.state.infos.id, this.state.infos)}
                  disabled={this.state.infos.id === ""}>
                  Cambiar tu contraseña
                  </Button>
              </div>
            </div>

            <div className="title">
              <h4 id="change-password-title">Busca por ID:</h4>
            </div>
            <div className="row id-row">
              <div className="col-xs-12">
                <TextField
                  id="outlined-id"
                  label="ID"
                  value={this.state.infos.id}
                  onChange={(e) => this.handleChange(e, "id")}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="row buttons-row">
              <div className="col-md-12 button-column">
                <Button color="default" onClick={() => this.getUser(this.state.infos.id)}>Buscar por ID</Button>
              </div>
            </div>

          </div>
        </Container>
      </div >
    );
  }
}

export default App;
