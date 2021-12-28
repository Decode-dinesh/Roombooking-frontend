import React from "react";
import { Button } from "react-bootstrap";

export default function Readroom({ room, handleEditClick, handleDeleteClick }) {
  return (
    <tr key={room._id}>
      <td>{room.name}</td>
      <td>{room.phonenumber}</td>
      <td>{room.type}</td>
      <td>{room.rentperday}</td>
      <td>{room.maxdays}</td>
      <td>
        <Button className="m-2" type="btn"  onClick={(e) => handleEditClick(e, room)}>
          Edit
        </Button>
        <Button className="m-2" onClick={() => handleDeleteClick(room._id)}>Delete</Button>
      </td>
    </tr>
  );
}
