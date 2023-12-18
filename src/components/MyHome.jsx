import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const MyHome = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [nome, setNome] = useState();
  const [cognome, setCognome] = useState();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const login = async e => {
    console.log("sono qui");
    e.preventDefault();
    try {
      const resp = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        console.log(email);
        console.log(password);
        console.log(data);
        sessionStorage.setItem("token", JSON.stringify(data));
        localStorage.setItem("token", JSON.stringify(data));
        setEmail("");
        setPassword("");
        navigate("/parcoMacchine");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async e => {
    e.preventDefault();
    try {
      const resp = await fetch(`http://localhost:3001/auth/register`, {
        method: "POST",
        body: JSON.stringify({ username: username, nome: nome, cognome: cognome, email: email, password: password }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        setUsername("");
        setNome("");
        setCognome("");
        setEmail("");
        setPassword("");
        login(e);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  return (
    <>
      <div className="full-height-background">
        <Button variant="danger" onClick={handleShow} className="bottom-button btn-lg">
          Log In
        </Button>
        <Button variant="danger" onClick={handleShow2} className="bottom-button2 btn-lg">
          Sign Up
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Form onSubmit={login}>
            <Modal.Body>
              <Form.Group className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="email"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  style={{ boxShadow: "none" }}
                  className="input"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="password"
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  style={{ boxShadow: "none" }}
                  className="input"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" type="submit" onClick={handleClose}>
                Log In
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Form onSubmit={register}>
            <Modal.Body>
              <Form.Group className="mt-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="username"
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                  style={{ boxShadow: "none" }}
                  className="input"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="name"
                  onChange={e => {
                    setNome(e.target.value);
                  }}
                  style={{ boxShadow: "none" }}
                  className="input"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="lastname"
                  onChange={e => {
                    setCognome(e.target.value);
                  }}
                  style={{ boxShadow: "none" }}
                  className="input"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="email"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  style={{ boxShadow: "none" }}
                  className="input"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="password"
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  style={{ boxShadow: "none" }}
                  className="input"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
              <Button variant="danger" type="submit" onClick={handleClose2}>
                Register
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};
export default MyHome;
