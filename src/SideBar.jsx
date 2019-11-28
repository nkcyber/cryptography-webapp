import React from "react";
import {
  Route,
  Link,
} from "react-router-dom";


export function SideBar() {
  return (
    <>
    <h4>Ciphers/Tools</h4>
    <ul class="list-group">
      <li class="list-group-item">
        <Link to="/frequency-analysis">Frequency Analysis</Link>
      </li>
      <li class="list-group-item">
        <Link to="/masc">MASC</Link>
      </li>
      <li class="list-group-item">
        <Link to="/caesar-cipher">Caesar Cipher</Link>
      </li>
      <li class="list-group-item">
        <Link to="/multiplicative-cipher">Multiplicative</Link>
      </li>
      <li class="list-group-item">
        <Link to="/affine-cipher">Affine</Link>
      </li>
    </ul>
    </>
  )
}
