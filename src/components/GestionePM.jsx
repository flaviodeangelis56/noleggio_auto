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
  const [marcaAuto, setMarcaAuto] = useState();
  const [nome, setNome] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [cilindrata, setCilindrata] = useState();
  const [lung, setLung] = useState();
  const [larg, setLarg] = useState();
  const [alt, setAlt] = useState();
  const [passo, setPasso] = useState();
  const [massa, setMassa] = useState();
  const [consumo, setConsumo] = useState();
  const [anno, setAnno] = useState();
  const [maxP, setMaxP] = useState();
  const [prezzo, setPrezzo] = useState();
  const [desc, setDesc] = useState();

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseAdd = () => {
    setShow2(false);
    CreaAuto();
  };

  const handleCloseDelate = () => {
    console.log(autoId);
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
        setData(data);
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
      console.log(error.errorsList);
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

  const CreaAuto = async e => {
    const aut = JSON.parse(localStorage.getItem("token"));
    const annoPars = parseInt(anno);
    const cilindrataPars = parseInt(cilindrata);
    const maxPars = parseInt(maxP);
    const lungPars = parseFloat(lung);
    const largPars = parseFloat(larg);
    const altPars = parseFloat(alt);
    const passoPars = parseFloat(passo);
    const massaPars = parseInt(massa);

    try {
      const resp = await fetch(`http://localhost:3001/vehicle`, {
        method: "POST",
        body: JSON.stringify({
          nome: nome,
          marca: marcaAuto,
          imgUrl: imgUrl,
          annoProduzione: annoPars,
          cilindrata: cilindrataPars,
          maxPower: maxPars,
          lunghezza: lungPars,
          larghezza: largPars,
          altezza: altPars,
          passo: passoPars,
          massa: massaPars,
          ConsumiMisto: consumo,
          prezzo: prezzo,
          descrizione: desc,
        }),
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
  }, [data]);

  return (
    <>
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="danger" onClick={handleShow2} className=" btn-lg">
            Aggiungi un auto
          </Button>
        </Col>
        <Col className="text-center">
          <Button variant="danger" onClick={handleShow3} className=" btn-lg">
            Cerca auto per marca
          </Button>
        </Col>
      </Row>
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
                      <Card.Text className="text-center">
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
          <Modal.Title>Aggiungi un auto</Modal.Title>
        </Modal.Header>
        <Form onSubmit={CreaAuto}>
          <Modal.Body>
            <Form.Group className="mt-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="marca"
                onChange={e => {
                  setMarcaAuto(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="nome"
                onChange={e => {
                  setNome(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Url dell'imaggine</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="URL"
                onChange={e => {
                  setImgUrl(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Anno di produzione</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="anno"
                onChange={e => {
                  setAnno(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Cilindrata</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="cilindrata"
                onChange={e => {
                  setCilindrata(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Potenza massima</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="potenza massima"
                onChange={e => {
                  setMaxP(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Lunghezza</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="lunghezza"
                onChange={e => {
                  setLung(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Larghezza</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Larghezza"
                onChange={e => {
                  setLarg(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Altezza</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="altezza"
                onChange={e => {
                  setAlt(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Passo</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="passo"
                onChange={e => {
                  setPasso(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Massa</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="massa"
                onChange={e => {
                  setMassa(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Consumo sul misto</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="consumo"
                onChange={e => {
                  setConsumo(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="prezzo"
                onChange={e => {
                  setPrezzo(e.target.value);
                }}
                style={{ boxShadow: "none" }}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="descrizione"
                onChange={e => {
                  setDesc(e.target.value);
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
            <Button
              variant="danger"
              type="submit"
              onClick={() => {
                handleCloseAdd();
              }}
            >
              Crea
            </Button>
          </Modal.Footer>
        </Form>
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
