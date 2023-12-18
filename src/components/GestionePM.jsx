import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const GestionePM = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [autoId, setAutoId] = useState();
  const [marca, setMarca] = useState();

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const handleClose = () => {
    setShow(false);
    console.log(autoId);
  };

  const handleCloseDelate = () => {
    setShow(false);
    eliminaAuto();
  };

  const handleClick = id => {
    setShow(true);
    setAutoId(id);
  };

  const getAllAuto = async e => {
    const aut = JSON.parse(localStorage.getItem("token"));
    try {
      const resp = await fetch(`http://localhost:3001/vehicle`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${aut.accessToken}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        setData(data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const eliminaAuto = async e => {
    const aut = JSON.parse(localStorage.getItem("token"));
    try {
      const resp = await fetch(`http://localhost:3001/vehicle/` + autoId, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${aut.accessToken}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        setData(data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAutoCercate = async e => {
    e.preventDefault();
    const aut = JSON.parse(localStorage.getItem("token"));
    try {
      const resp = await fetch(`http://localhost:3001/vehicle/byMarca/` + marca, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${aut.accessToken}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAuto();
  }, []);

  return (
    <>
      <h2 className="ms-3 pb-0 mb-0 mt-4 text-center">Tutte le auto</h2>
      <Button variant="danger" onClick={handleShow2} className=" btn-lg">
        Aggiungi un auto
      </Button>
      <Button variant="danger" onClick={handleShow3} className=" btn-lg">
        Cerca auto per marca
      </Button>
      <Row xs={1} md={2} className="g-4 ms-2 me-2 mt-1">
        {data.length > 0
          ? data.map(auto => (
              <>
                <Col>
                  <Card>
                    <Link to={"/vehicleDetails/" + auto.id}>
                      <Card.Img variant="top" src={auto.imgVehicles} style={{ height: "300px", objectFit: "cover" }} />
                    </Link>
                    <Card.Body>
                      <Card.Title>
                        {auto.marca} {auto.name}
                      </Card.Title>
                      <Card.Text>
                        <Button variant="danger" onClick={() => handleClick(auto.id)}>
                          Delete Car
                        </Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            ))
          : null}
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Avviso eliminazione dell'auto dal DB</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vuoi davvero eliminare quest'auto ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No ci ho ripensato
          </Button>
          <Link to={"/gestionePM"}>
            <Button variant="danger" type="submit" onClick={handleCloseDelate}>
              Elimina
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Link to={"/parcoMacchine"}>
            <Button variant="danger" type="submit" onClick={handleClose2}>
              Register
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Cerca auto per marca</Modal.Title>
        </Modal.Header>
        <Form onSubmit={getAutoCercate}>
          <Modal.Body>
            <Form.Group className="mt-3">
              <Form.Control
                required
                type="text"
                placeholder="Marca"
                onChange={e => {
                  setMarca(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose3}>
              Close
            </Button>
            <Button variant="danger" type="submit" onClick={handleClose3}>
              Cerca
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default GestionePM;
