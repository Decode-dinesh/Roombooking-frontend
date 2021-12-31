import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Loader from "../Loader";
import Error from "../Error";
import moment from "moment";

export default function Bookingscreen({ match }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  

  // const roomid = match.params.roomid;
  const fromdate = moment.utc(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment.utc(match.params.todate, "DD-MM-YYYY");
  // console.log(fromdate);
  // console.log(todate);

  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;

  const [totalamount, setTotalamount] = useState();

  useEffect(() => {
    async function fetchMyApi(){
      try {
        setLoading(true);
        const data = (
          await axios.post("https://room-booking-backend.herokuapp.com/room/getroombyid", { roomid: match.params.roomid })
        ).data;
        setTotalamount(
          totaldays <= data.maxdays
            ? data.rentperday * totaldays
            : "Not available"
        );
        setRooms(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
    
      }
    }
    fetchMyApi();
  },[match.params.roomid, totaldays]);

  async function bookRoom() {
  
    const bookingDetails = {
      rooms,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };

    try {
      const result = await axios.post(
        "https://room-booking-backend.herokuapp.com/bookings/bookroom",
        bookingDetails
      );
      window.location.href = "/profile";
      console.log(result)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : rooms ? (
        <div>
          <Row className="justify-content-center mt-5 bs">
            <Col className="col-md-5">
              <h1>{rooms.name}</h1>
              <img src={rooms.imageurls[0]} className="bigimg" alt="bigimage" />
            </Col>
            <Col className="col-md-5">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>
                    Name :{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From Date: {match.params.fromdate}</p>
                  <p>To Date : {match.params.todate}</p>
                  <p>Max Days : {rooms.maxdays}</p>
                  <p>Total days: {totaldays} </p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <h1>Amount</h1>

                <p>
                  <b>Rent per day :</b> {rooms.rentperday}
                </p>
                <p>
                  <b>Total Amount :</b> {totalamount}
                </p>
              </div>

              {totaldays > rooms.maxdays ? (
                <h3 style={{ textAlign: "right" }}>book less than max days</h3>
              ) : (
                <div style={{ float: "right" }}>
                  <Button className="btn btn-primary" onClick={bookRoom}>
                    Book Now
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <Error />
      )}
    </Container>
  );
}
