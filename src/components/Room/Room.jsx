import React, { useState } from "react";
import { Row, Col, Button, Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./room.css";

export default function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Row className="bs">
      <Col className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" alt="Roomimage"/>
      </Col>
      <Col className="col-md-7 text-left">
        <h1>{room.name}</h1>
        <b>
          <p>Max Days : {room.maxdays}</p>
          <p>phone Number: {room.phonenumber}</p>
          <p>Type : {room.type}</p>
          <p>Rent / day : {room.rentperday}</p>
        </b>

        <div style={{ float: "right" }}>
          {fromdate && todate && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <Button className="btn btn-primary m-2">Book Now</Button>
            </Link>
          )}

          <Button className="btn btn-dark" onClick={handleShow}>
            View details
          </Button>
        </div>
      </Col>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item key={url}>
                  <img className="d-block w-100 bigimg" src={url} alt="roomimage" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
