import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

const GestioneUtenti = () => {
  const [data, setData] = useState([]);

  const getUtenti = async e => {
    const aut = JSON.parse(localStorage.getItem("token"));
    try {
      const resp = await fetch(`http://localhost:3001/user`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${aut.accessToken}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        console.log(data.content);
        setData(data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUtenti();
  }, []);
  return (
    <>
      <h2 className="ms-3 pb-0 mb-0 mt-4 text-center">Tutti gli utenti</h2>
      <Row xs={1} md={2} className="g-4 ms-2 me-2 mt-1">
        {data.length
          ? data.map(user => (
              <Col>
                <Card>
                  <Card.Img variant="top" src={user.avatar} style={{ height: "300px", objectFit: "cover" }} />
                  <Card.Body>
                    <Card.Title>
                      {user.cognome} {user.nome}
                    </Card.Title>
                    <Card.Text>
                      {user.ruolo}
                      <hr /> {user.email}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : null}
      </Row>
    </>
  );
};
export default GestioneUtenti;
