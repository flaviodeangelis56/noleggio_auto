import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const McLaren = () => {
  const [mc, setMC] = useState([]);

  const getAllMc = async e => {
    const aut = JSON.parse(localStorage.getItem("token"));
    try {
      const resp = await fetch(`http://localhost:3001/vehicle/byMarca/McLaren`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${aut.accessToken}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        setMC(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMc();
  }, []);
  return (
    <>
      <h2 className="ms-3 pb-0 mb-0 mt-4 text-center">McLaren</h2>
      <Row xs={1} md={2} className="g-4 ms-2 me-2 mt-1">
        {mc && mc.length > 0
          ? mc.map(auto => (
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
export default McLaren;
