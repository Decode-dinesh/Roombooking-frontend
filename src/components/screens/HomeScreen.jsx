import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Room from "../Room/Room";
import Loader from "../Loader";
import moment from "moment";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

export default function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();

  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();

  const [duplicaterooms, setDuplicaterooms] = useState([]);

  const [searchkey, setSearchkey] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    async function fetchMyApi(){
      try {
        setLoading(true);
        const result = (await axios.get("/room/getallrooms")).data;
        setRooms(result);
        setDuplicaterooms(result);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchMyApi();
  }, []);

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  function filterByDate(dates) {
    const start =(moment(dates[0]).format("DD-MM-YYYY"));
    const end =(moment(dates[1]).format("DD-MM-YYYY"));
    setFromdate(start);
    setTodate(end);

    var temprooms = [];
    var availability = false;
    for (const rooms of duplicaterooms) {
      if (rooms.currentbookings.length > 0) {
        for (var booking of rooms.currentbookings) {
          if (
            !moment(start).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(end).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              start == booking.fromdate &&
              start == booking.todate &&
              end == booking.fromdate &&
              end == booking.todate
            ) {
              availability = true
            }
          }
        }
      }
      if (availability === true || rooms.currentbookings.length === 0){
        temprooms.push(rooms);
        console.log(temprooms);
      }


      setRooms(temprooms)
      
    }
    console.log(start);
    console.log(end);
  }

 
  function filterBySearch() {

    const temprooms = duplicaterooms.filter(rooms => rooms.name.toLowerCase().includes(searchkey.toLowerCase()))

    setRooms(temprooms)

  }

  function filterByType(e){

    setType(e)
    if(e!=='all'){
      const temprooms = duplicaterooms.filter(rooms => rooms.type.toLowerCase()=== e.toLowerCase())

    setRooms(temprooms)
    }else{
      setRooms(duplicaterooms)
    }
    
  };

  return (
    <Container>
      <Row>
        <Col className="mt-5">
          <Space>
              <RangePicker  format="DD-MM-YYYY" onChange={filterByDate} disabledDate={disabledDate} />
          </Space>
        </Col>
        <Col className="mt-5">
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search Rooms"
              value={searchkey}
              onChange={(e) => {
                setSearchkey(e.target.value);
              }}
              onKeyUp={filterBySearch}
            />
          </InputGroup>
        </Col>
        <Col className="mt-5">
          <Form.Select value={type} onChange={(e) => {filterByType(e.target.value)}} >
            <option value='all'>All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mt-5">
        {loading ? (
          <Loader />
        ) : (
          <Col className="mt-2">
          {rooms.map((room) => {
            return (
                <Room key={room._id} room={room} fromdate={fromdate} todate={todate} />
                );
              })}
              </Col>
        ) }
      </Row>
    </Container>
  );
}
