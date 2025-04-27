import React from "react";
import "./index.css";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import { IconContext } from "react-icons";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// import {
//   checkMaloIdValid,
//   generateRandomMaloId,
//   bestandteilZerlegung,
// } from "malocheck";

import * as malo_id from "malocheck"; // Direkt aus malocheck.js

class MaloCheckApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      validity: false,
      messages: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.generateRandomMaloId = this.generateRandomMaloId.bind(this);
  }

  componentDidMount() {
    this.updateWithNewMaloId(malo_id.malo_id.generateRandom());
  }

  updateWithNewMaloId(maloID) {
    let formatiereZerlegung = function (zerlegung) {
      let mapZerlegung = function (item) {
        return item.wert.padEnd(20, " ") + item.beschreibung;
      };
      return zerlegung.map(mapZerlegung).join("\n");
    };

    let value = maloID;
    let res = malo_id.malo_id.isValid(value);
    // checkMaloIdValid(value);
    let zerlegung = res.valid
      ? malo_id.malo_id.bestandteilZerlegung(value)
      : null;
    let formatierteZerlegung = zerlegung ? formatiereZerlegung(zerlegung) : "";
    this.setState({
      value: value,
      validity: res.valid,
      messages: res.messages,
      zerlegungsstring: formatierteZerlegung,
    });
  }

  handleChange(event) {
    this.updateWithNewMaloId(event.target.value);
  }

  generateRandomMaloId() {
    this.updateWithNewMaloId(malo_id.malo_id.generateRandom());
  }

  render() {
    const messages = this.state.messages;

    let validityElement;
    if (this.state.validity) {
      validityElement = (
        <Stack direction="row" spacing={2}>
          <IconContext.Provider value={{ color: "green", size: "50px" }}>
            <MdThumbUp />
          </IconContext.Provider>
          <Box
            component="span"
            alignItems="center"
            justifyContent="center"
            sx={{ fontSize: 16, mt: 1 }}
          >
            Die Malo - Id ist gültig.
          </Box>
        </Stack>
      );
    } else {
      validityElement = (
        <Stack direction="row" spacing={2}>
          <IconContext.Provider value={{ color: "red", size: "50px" }}>
            <MdThumbDown />
          </IconContext.Provider>
          <Box
            component="span"
            alignItems="center"
            justifyContent="center"
            sx={{ fontSize: 16, mt: 1 }}
          >
            Die Malo - Id ist ungültig.
          </Box>
        </Stack>
      );
    }

    return (
      <Stack alignItems="center" spacing={2}>
        <div>
          <Button variant="contained" onClick={this.generateRandomMaloId}>
            Zufällige Malo-Id generieren
          </Button>
        </div>
        <div>
          <TextField
            id="maloid"
            label="Malo-Id"
            value={this.state.value}
            onChange={this.handleChange}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </div>
        {validityElement}
        {!this.state.validity && (
          <div className="messages">
            <ul>
              {messages.map((message) => (
                <li> {message.message} </li>
              ))}
            </ul>
          </div>
        )}
        <div className="Zerlegung">
          <TextField
            id="outlined-basic"
            value={this.state.zerlegungsstring}
            label="Erklärung der Bestandteile"
            variant="outlined"
            multiline
            sx={{ width: 400 }}
          />
        </div>
      </Stack>
    );
  }
}

export default MaloCheckApp;
