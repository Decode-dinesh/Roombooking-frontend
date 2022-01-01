import React from "react";
import { Button } from "react-bootstrap";

export default function Readroom({ room, handleEditClick, handleDeleteClick }) {
  return (
    <tr key={room.updatedAt}>
      <td>{room.name}</td>
      <td>{room.phonenumber}</td>
      <td>{room.type}</td>
      <td>{room.rentperday}</td>
      <td>{room.maxdays}</td>
      <td>
        <Button
          className="m-2 btn-secondary"
          type="btn"
          onClick={(e) => handleEditClick(e, room)}
        >
          <i class="fas fa-edit"></i>
        </Button>
        <Button className="m-2 btn-danger" onClick={() => handleDeleteClick(room._id)}>
        <i class="fas fa-trash-alt"></i>
        </Button>
      </td>
    </tr>
  );
}
