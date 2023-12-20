import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Lamborghini = () => {
  const [lambo, setLambo] = useState([]);

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
    getAllLambo();
  }, []);
  return (
    <>
      <h2 className="ms-3 pb-0 mb-0 mt-4 text-center">Lamborghini</h2>
      <Row xs={1} md={2} className="g-4 ms-2 me-2 mt-1">
        {lambo && lambo.length > 0
          ? lambo.map(auto => (
              <Col>
                <Card>
                  <Link to={"/vehicleDetails/" + auto.id}>
                    <Card.Img variant="top" src={auto.imgVehicles} style={{ height: "300px", objectFit: "cover" }} />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      {auto.marca} {auto.name}
                    </Card.Title>
                    <Card.Text>{auto.descrizione}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : null}
      </Row>
    </>
  );
};
export default Lamborghini;
