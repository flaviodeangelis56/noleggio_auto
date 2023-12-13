import { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const GestionePM = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [autoId, setAutoId] = useState();

  const handleClose = () => setShow(false);

  const handleClick = id => {
    setShow(true);
    // setAutoId(id);
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
      const resp = await fetch(`http://localhost:3001/vehicle/`, {
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

  useEffect(() => {
    getAllAuto();
  }, []);

  return (
    <>
      <h2 className="ms-3 pb-0 mb-0 mt-4">Tutte le auto</h2>
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
                        <Button variant="danger" onClick={handleClick(auto.id)}>
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
          <Link to={"/parcoMacchine"}>
            <Button variant="danger" type="submit" onClick={handleClose}>
              Elimina
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default GestionePM;
