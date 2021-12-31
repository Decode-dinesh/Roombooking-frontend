import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Error from "../Error";
import Loder from "../Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  async function login() {
    const user = {
      email,
      password,
    };
    try {
      setLoading(true);
      const result = (await axios.post("/user/login", user)).data;
      setLoading(false);

      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err);
    }
  }

  return (
    <Container className="mt-5">
      {loading && <Loder />}
      <Form>
        {error && <Error message="Invalid credentials" />}
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="w-50"
            required
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="w-50"
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" onClick={login}>
          Login
        </Button>
      </Form>
    </Container>
  );
}
