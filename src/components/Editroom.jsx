import React from "react";
import { Button } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";

export default function Editroom({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) {
  return (
    <tr key={editFormData._id}>
      <td>
        <FormControl
          type="text"
          required="required"
          placeholder="enter name"
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <FormControl
          type="text"
          required="required"
          placeholder="enter number"
          name="phonenumber"
          value={editFormData.phonenumber}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <FormControl
          type="text"
          required="required"
          placeholder="enter type"
          name="type"
          value={editFormData.type}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <FormControl
          type="text"
          required="required"
          placeholder="enter rent"
          name="rentperday"
          value={editFormData.rentperday}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <FormControl
          type="text"
          required="required"
          placeholder="enter max booking"
          name="maxdays"
          value={editFormData.maxdays}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Button className="m-2" type="submit">
          Save
        </Button>
        <Button onClick={handleCancelClick}>Cancel</Button>
      </td>
    </tr>
  );
}
