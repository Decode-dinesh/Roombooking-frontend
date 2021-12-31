import React from "react";

import { Tabs } from "antd";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const { TabPane } = Tabs;

export default function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  return (
    <Container className="mt-5">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>MY INFO</h1>
          <br />
          <h2>Name: {user.name}</h2>
          <h2>Email: {user.email}</h2>
          <h2>isAdmin: {user.isAdmin ? "Yes" : "No"}</h2>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </Container>
  );
}

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);


  useEffect(() => {
    async function fetchMyApi(){
      try {
      
        const data = (await axios.post("/bookings/getbookingbyuserid", {userid: user._id})).data;
        setBookings(data);
      
      } catch (err) {
        console.log(err);
      
  
      }
    }
    fetchMyApi();

  },[user]);

  async function cancelBooking(bookingid, roomid) {
    try {
      
      const data = (
        await axios.post("/bookings/cancelbooking", {
          bookingid,
          roomid,
        })
      ).data;
      console.log(data);
  
    } catch (err) {
      console.log(err);
    
    }
  }

  return (
    <Container>
      <Row>
        <Col>
      
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="mt-5" key={booking._id}>
                  <h1>{booking.room}</h1>
                  <p>
                    <b>BookingId :</b> {booking._id}
                  </p>
                  <p>
                    <b>CheckIn :</b> {booking.fromdate}
                  </p>
                  <p>
                    <b>Check out :</b> {booking.todate}
                  </p>
                  <p>
                    <b>Amount :</b> {booking.totalamount}
                  </p>
                  <p>
                    <b>Status :</b>{" "}
                    {booking.status === "booked" ? (
                      <Badge bg="success">Confirmed</Badge>
                    ) : (
                      <Badge bg="danger">Cancelled</Badge>
                    )}
                  </p>

                  {booking.status !== "Cancelled" && (
                    <div>
                      <Button
                        onClick={() => {
                          cancelBooking(booking._id, booking.roomid);
                        }}
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
}
