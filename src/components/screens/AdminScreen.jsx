import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../Loader";
import Addroom from "../Addroom";
import Readroom from "../Readroom";
import Editroom from "../Editroom";

const { TabPane } = Tabs;

export default function AdminScreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center">Admin Dashboard</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Rooms" key="1">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Rooms" key="2">
          <Addroom />
        </TabPane>
        <TabPane tab="Users" key="3">
          <Users />
        </TabPane>
        <TabPane tab="Bookings" key="4">
          <Bookings />
        </TabPane>
      </Tabs>
    </Container>
  );
}

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyApi() {
      try {
        const data = (await axios.get("/bookings/getallbookings")).data;
        setBookings(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchMyApi();
  }, []);

  return (
    <>
      {/* Bookings */}
      <Row>
        <Col>
          {loading && <Loader />}
          <Table striped bordered hover>
            <thead>
              <tr>
                {/* <th><h2>Booking id</h2></th>
                <th><h2>User id</h2></th> */}
                <th>
                  <h2>Room</h2>
                </th>
                <th>
                  <h2>From</h2>
                </th>
                <th>
                  <h2>To</h2>
                </th>
                <th>
                  <h2>Status</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.length &&
                bookings.map((booking) => {
                  return (
                    <tr key={booking._id}>
                      {/* <td><h5>{booking._id}</h5></td>
                      <td><h5>{booking.userid}</h5></td> */}
                      <td>
                        <h6>{booking.room}</h6>
                      </td>
                      <td>
                        <h6>{booking.fromdate}</h6>
                      </td>
                      <td>
                        <h6>{booking.todate}</h6>
                      </td>
                      <td>
                        <h6>{booking.status}</h6>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editFormData, setEditFormData] = useState({
    name: "",
    phonenumber: "",
    type: "",
    rentperday: "",
    maxdays: "",
  });
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    async function fetchMyApi() {
      try {
        const data = (await axios.get("/room/getallrooms")).data;
        setRooms(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchMyApi();
  }, []);

  const handleEditFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (e, room) => {
    e.preventDefault();
    setEdit(room._id);

    const formValues = {
      roomid: room._id,
      name: room.name,
      phonenumber: room.phonenumber,
      type: room.type,
      rentperday: room.rentperday,
      maxdays: room.maxdays,
    };
    setEditFormData(formValues);
  };

  async function handleEditFormSubmit(e) {
    e.preventDefault();
    const roomid = edit;
    const editedRoom = {
      name: editFormData.name,
      phonenumber: editFormData.phonenumber,
      type: editFormData.type,
      rentperday: editFormData.rentperday,
      maxdays: editFormData.maxdays,
    };
    console.warn(editedRoom);
    try {
      const res = await axios.put(`/room/edit/${roomid}`, editedRoom).data;
      console.log(res);
      const newrooms = [...rooms];
      const index = rooms.findIndex((room) => room._id === roomid);
      newrooms[index] = editedRoom;
      setRooms(newrooms);
      setEdit(null);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCancelClick = () => {
    setEdit(null);
  };

  async function handleDeleteClick(id) {
    try {
      const result = await axios.delete(`/room/${id}`);
      console.log(result);
      let temproom = [...rooms];
      let newroom = temproom.filter((room) => {
        return room._id !== id;
      });
      setRooms(newroom);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* rooms */}
      <Row>
        <Col>
          <Form onSubmit={handleEditFormSubmit}>
            {loading && <Loader />}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>phone</th>
                  <th>Type</th>
                  <th>Rent / day</th>
                  <th>max booking days</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length &&
                  rooms.map((room) => {
                    return (
                      <Fragment key={room._id}>
                        {edit === room._id ? (
                          <Editroom
                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                          />
                        ) : (
                          <Readroom
                            room={room}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}
                          />
                        )}
                      </Fragment>
                    );
                  })}
              </tbody>
            </Table>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyApi() {
      try {
        const data = (await axios.get("/user/allusers")).data;
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchMyApi();
  }, []);

  return (
    <>
      {/* Users */}
      <Row>
        <Col>
          {loading && <Loader />}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>isAdmin</th>
              </tr>
            </thead>
            <tbody>
              {users.length &&
                users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>
                        <h6>{user.name}</h6>
                      </td>
                      <td>
                        <h6>{user.email}</h6>
                      </td>
                      <td>
                        <h6>{user.isAdmin ? "Yes" : "No"}</h6>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
