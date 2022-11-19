import React from "react";
import { Link } from "react-router-dom";

export default function Record(props) {
  return (
    <tr className="hover">
      <th>{props.id}</th>
      <td>{props.detail}</td>
      {props.children}
    </tr>
  );
}
