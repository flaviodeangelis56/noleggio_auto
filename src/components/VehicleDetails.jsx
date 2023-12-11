import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const VehicleDetails = () => {
  const [car, setCar] = useState(null);
  const params = useParams();

  const getCar = async e => {
    const aut = JSON.parse(localStorage.getItem("token"));
    try {
      const resp = await fetch(`http://localhost:3001/vehicle/` + params.Id, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${aut.accessToken}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        setCar(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCar();
  }, []);
  return (
    <>
      <div
        className="full-height-background-no-car"
        style={
          car != null
            ? {
                backgroundImage: `url(${car.imgVehicles})`,
              }
            : null
        }
      ></div>

      {car != null ? (
        <>
          <Container className="d-flex justify-content-center align-items-center my-5">
            <h1>
              {car.name} {car.marca}
            </h1>
          </Container>
          <Container className="d-flex justify-content-center align-items-center">
            <Row xs={1} md={2}>
              <Col className="text-center my-2">
                <h3>Anno di produzione : {car.annoProduzione}</h3>
              </Col>
              <Col className="text-center my-2">
                <h3>Cilindrata : {car.cilindrata} cm3</h3>
              </Col>
              <Col className="text-center my-2">
                <h3>Consumo nel misto : {car.consumiMisto}</h3>
              </Col>
              <Col className="text-center my-2">
                <h3>Potenza massima : {car.maxPower} PS</h3>
              </Col>
              <Col className="text-center my-2">
                <h3>Lunghezza : {car.lunghezza} cm</h3>
              </Col>
              <Col className="text-center my-2">
                <h3>Larghezza : {car.larghezza} cm</h3>
              </Col>
              <Col className="text-center my-2">
                <h3>Passo : {car.passo} cm</h3>
              </Col>
              <Col className="text-center my-2">
                <h3>Altezza : {car.altezza} cm</h3>
              </Col>
              <Col className="text-center my-2">
                <h3>Massa : {car.massa} kg</h3>
              </Col>
            </Row>
          </Container>
          <Container className="d-flex justify-content-center align-items-center my-5">
            {car.vehicleAvailability === "DISPONIBILE" ? (
              <Button variant="success" type="submit" className="btn-lg">
                Prenota Ora
              </Button>
            ) : (
              <Button variant="danger" type="submit" className="btn-lg">
                Non Disponibile
              </Button>
            )}
          </Container>
        </>
      ) : null}
    </>
  );
};
export default VehicleDetails;
