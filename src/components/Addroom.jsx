import React from "react";
import { useState } from "react";
import {
  Row,
  InputGroup,
  Col,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import axios from "axios";
import Success from "./Success";
import Loader from "./Loader";
import Error from "./Error";

export default function Addroom() {
  const [name, setName] = useState("");
  const [rentperday, setRentperday] = useState("");
  const [maxdays, setMaxdays] = useState();
  const [description, setDescription] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [type, setType] = useState();
  const [imageurl1, setImageurl1] = useState();
  const [imageurl2, setImageurl2] = useState();
  const [imageurl3, setImageurl3] = useState();

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  async function addroom() {
    const newroom = {
      name,
      rentperday,
      maxdays,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    try {
      setLoading(true);
      const result = await axios.post("https://room-booking-backend.herokuapp.com/room/addroom", newroom)
        .data;
      setLoading(false);
      setSuccess(true);
      setName("");
      setRentperday("");
      setMaxdays("");
      setDescription("");
      setPhonenumber("");
      setType("");
      setImageurl1("");
      setImageurl2("");
      setImageurl3("");
      console.log(result);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <Container>
      {loading && <Loader />}
      {error && <Error />}
      {success && <Success message="Sucessfully added" />}
      <Row>
        <Col>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
            <FormControl
              required
              placeholder="Room name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">
              Rent /day
            </InputGroup.Text>
            <FormControl
              required
              placeholder="Rent per day"
              value={rentperday}
              onChange={(e) => {
                setRentperday(e.target.value);
              }}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">
              max Days
            </InputGroup.Text>
            <FormControl
              required
              placeholder="maximum days"
              value={maxdays}
              onChange={(e) => {
                setMaxdays(e.target.value);
              }}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">
              description
            </InputGroup.Text>
            <FormControl
              required
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">
              Phone Number
            </InputGroup.Text>
            <FormControl
              required
              placeholder="Mobile Number"
              value={phonenumber}
              onChange={(e) => {
                setPhonenumber(e.target.value);
              }}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Type</InputGroup.Text>
            <FormControl
              required
              placeholder="Room type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Img 1</InputGroup.Text>
            <FormControl
              required
              placeholder="image1"
              value={imageurl1}
              onChange={(e) => {
                setImageurl1(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Img 2</InputGroup.Text>
            <FormControl
              required
              placeholder="image2"
              value={imageurl2}
              onChange={(e) => {
                setImageurl2(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Img 3</InputGroup.Text>
            <FormControl
              required
              placeholder="image3"
              value={imageurl3}
              onChange={(e) => {
                setImageurl3(e.target.value);
              }}
            />
          </InputGroup>

          <div style={{ float: "right" }}>
            <Button variant="secondary" onClick={addroom}>
              Add room
            </Button>{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
