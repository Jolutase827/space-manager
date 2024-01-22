import React, { Component } from "react";
import "../hoja-de-estilos/Footer.css";
export class Footer extends Component {
  render() {
    return (
      <div className="footer pt-5">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3  border-top">
          <div className="col-md-5 d-flex align-items-center">
            <span className="mb-3 mb-md-0 ms-3">
              © 2023 Jose Luis Tárraga Segura, 2DAW
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
