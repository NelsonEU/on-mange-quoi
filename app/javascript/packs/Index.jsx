
import React from "react";
import { render } from "react-dom";
import App from "../components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

document.addEventListener("DOMContentLoaded", () => {
  const div = document.createElement("div");
  div.style.height = "100%";
  div.style.width = "100%";
  div.style.overflow = "hidden";
  render(<App />, document.body.appendChild(div));
});

