import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import './App.css';
import { Typography, Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const defaultInfos = {
  name: "",
  surname: "",
  day: undefined,
  documentType: undefined,
  documentNumber: undefined,
  email: "",
  repeatEmail: ""
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      infos: defaultInfos,
      gender: "a"
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
    this.reset = this.reset.bind(this);
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
    console.log(this.state)
  }

  reset() {
    console.log(defaultInfos)
    this.setState({ infos: defaultInfos })
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
                    type="number"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-date-month"
                    type="number"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-date-year"
                    type="number"
                    margin="normal"
                    variant="outlined"
                  />
                </div>
              </div>




              <div className="row col-sm-6 form-document">
                <label>Documento</label>
                <div className="birthday-container">
                  <div className="col-sm-5 document-type">
                    <TextField
                      id="outlined-document-type"
                      onChange={(e) => this.handleChange(e, "document-type")}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-sm-7 document-number">
                    <TextField
                      id="outlined-document-number"
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
                value={this.state.infos.repeatEmail}
                onChange={(e) => this.handleChange(e, "repeatEmail")}
                margin="normal"
                variant="outlined"
              />
            </div>
          </div>
          </div>


        {/*<Button variant="contained" color="primary" onClick={this.sendInfo}> Send</Button> */}
        </Container>
      </div >
    );
  }
}

export default App;
