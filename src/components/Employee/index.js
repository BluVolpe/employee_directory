import React from "react";

function Employee(props) {

  return (
    <tr>
        <th>{props.name}</th>
        <th>{props.email}</th>
        <th>{props.phone}</th>
    </tr>
  );
}

export default Employee;
