import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ParcoMacchine = () => {
  const [data, setData] = useState([]);
  const [ferrari, setFerrari] = useState([]);
  const [lambo, setLambo] = useState([]);

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
        console.log(data.length);
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllFerrari = async e => {
    const aut = JSON.parse(localStorage.getItem("token"));
    try {
      const resp = await fetch(`http://localhost:3001/vehicle/byMarca/Ferrari`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${aut.accessToken}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        setFerrari(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllLambo = async e => {
    const aut = JSON.parse(localStorage.getItem("token"));
    try {
      const resp = await fetch(`http://localhost:3001/vehicle/byMarca/Lamborghini`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${aut.accessToken}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        setLambo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAuto();
    getAllFerrari();
    getAllLambo();
  }, []);

  return (
    <>
      <h2 className="ms-3 pb-0 mb-0 mt-4">Le Novità</h2>
      <Row xs={1} md={2} className="g-4 ms-2 me-2 mt-1">
        {data.length > 0
          ? data.slice(0, 4).map(auto => (
              <Col>
                <Card>
                  <Link to={"/vehicleDetails/" + auto.id}>
                    <Card.Img variant="top" src={auto.imgVehicles} style={{ height: "300px", objectFit: "cover" }} />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      {auto.marca} {auto.name}
                    </Card.Title>
                    <Card.Text className="texto-2-righe">{auto.descrizione}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : null}
      </Row>
      <h2 className="ms-3 pb-0 mb-0 mt-4">Tutto In Casa Ferrari</h2>
      <Row xs={1} md={2} className="g-4 ms-2 me-2 mt-1">
        {ferrari && ferrari.length > 0
          ? ferrari.slice(0, 4).map(auto => (
              <Col>
                <Card>
                  <Link to={"/vehicleDetails/" + auto.id}>
                    <Card.Img variant="top" src={auto.imgVehicles} style={{ height: "300px", objectFit: "cover" }} />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      {auto.marca} {auto.name}
                    </Card.Title>
                    <Card.Text className="texto-2-righe">{auto.descrizione}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : null}
      </Row>
      <h2 className="ms-3 pb-0 mb-0 mt-4">Tutto In Casa Lamborghini</h2>
      <Row xs={1} md={2} className="g-4 ms-2 me-2 mt-1">
        {lambo && lambo.length > 0
          ? lambo.slice(0, 4).map(auto => (
              <Col>
                <Card>
                  <Link to={"/vehicleDetails/" + auto.id}>
                    <Card.Img variant="top" src={auto.imgVehicles} style={{ height: "300px", objectFit: "cover" }} />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      {auto.marca} {auto.name}
                    </Card.Title>
                    <Card.Text className="texto-2-righe">{auto.descrizione}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : null}
      </Row>
    </>
  );
};
export default ParcoMacchine;
