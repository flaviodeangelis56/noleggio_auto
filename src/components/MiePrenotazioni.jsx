import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MiePrenotazioni = () => {
  const [data, setData] = useState();
  const [show3, setShow3] = useState(false);
  const [reservationId, setReservationId] = useState();

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const setReservationIdOnClick = id => {
    console.log(id);
    setReservationId(id);
    handleShow3();
  };

  const getPrenotazioni = async e => {
    const aut = JSON.parse(localStorage.getItem("token"));
    const token = aut.accessToken;
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;
    try {
      const resp = await fetch(`http://localhost:3001/reservation/user/` + userId, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${aut.accessToken}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const restituisciAuto = async e => {
    e.preventDefault();
    const aut = JSON.parse(localStorage.getItem("token"));
    try {
      const resp = await fetch(`http://localhost:3001/reservation/rest/` + reservationId, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${aut.accessToken}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        handleClose3();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrenotazioni();
  }, []);
  return (
    <>
      <h2 className="ms-3 pb-0 mb-0 mt-4 text-center">Tutte le mie prenotazioni</h2>
      <Row xs={1} md={2} className="g-4 ms-2 me-2 mt-1">
        {data && data.length > 0 ? (
          data.map(prenotazione => (
            <Col>
              <Card>
                <Link to={"/vehicleDetails/" + prenotazione.vehicles.id}>
                  <Card.Img
                    variant="top"
                    src={prenotazione.vehicles.imgVehicles}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>
                    {prenotazione.vehicles.marca} {prenotazione.vehicles.name}
                  </Card.Title>
                  <Card.Text>
                    Data inizio prestito : {prenotazione.dataInizioPrestito}
                    <hr /> Data restituzione prevista : {prenotazione.dataRestituzionePrevista}
                    {prenotazione.dataRestituzione === null ? (
                      <>
                        <>
                          <hr />
                        </>
                        <Button onClick={() => setReservationIdOnClick(prenotazione.id)}>Restituisci auto</Button>
                      </>
                    ) : (
                      <>
                        <hr /> <p>Data restituzione : {prenotazione.dataRestituzione}</p>
                      </>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h3>Non hai nessuna prenotazione</h3>
        )}
      </Row>
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Restituisci auto</Modal.Title>
        </Modal.Header>

        <Modal.Body>Sei sicuro di voler restituire questa auto?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
          <Button variant="danger" type="submit" onClick={restituisciAuto}>
            Restituisci
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default MiePrenotazioni;
