import React from "react";
import {
  Route,
  Link,
} from "react-router-dom";


export function SideBar() {
  return (
    <>
    <h4>Ciphers/Tools</h4>
    <ul className="list-group">
      <li className="list-group-item">
        <Link to="/frequency-analysis">Frequency Analysis</Link>
      </li>
      <li className="list-group-item">
        <Link to="/masc">MASC</Link>
      </li>
      <li className="list-group-item">
        <Link to="/caesar-cipher">Caesar Cipher</Link>
      </li>
      <li className="list-group-item">
        <Link to="/multiplicative-cipher">Multiplicative</Link>
      </li>
      <li className="list-group-item">
        <Link to="/affine-cipher">Affine</Link>
      </li>
      <li className="list-group-item">
        <Link to="/vigenere-cipher">Vigenère</Link>
      </li>
      <li className="list-group-item">
        <Link to="/columnar-transposition">Columnar Transposition</Link>
      </li>
    </ul>
    </>
  )
}
