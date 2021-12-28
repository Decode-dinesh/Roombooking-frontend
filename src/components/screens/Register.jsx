import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form'; 
import axios from "axios";
import Loader from "../Loader";
import Error from "../Error";
import Success from "../Success";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState("");

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        mobile,
        password,
        cpassword,
      };

      try {
        setLoading(true);
        const result = await axios.post(
          "https://room-booking-backend.herokuapp.com/user/register",
          user
        ).data;
        console.log(result)
        setLoading(false);
        setSuccess(true);
        setName("");
        setEmail("");
        setMobile("");
        setPassword("");
        setCpassword("");
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    } else {
      alert("password not match");
    }
  }

  return (
    <Container className="mt-5 w-50">
      {loading && <Loader />}
      {error && <Error />}
      {success && <Success message="Register successful" />}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="w-50"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="w-50"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            className="w-50"
            type="text"
            placeholder="Name"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="w-50"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className="w-50"
            type="password"
            placeholder="Password"
            value={cpassword}
            onChange={(e) => {
              setCpassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" onClick={register}>
          Register
        </Button>
      </Form>
    </Container>
  );
}
