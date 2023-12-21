import { Col, Container, Row } from "react-bootstrap";

const MyFooter = () => {
  return (
    <>
      <div className="pt-5"></div>
      <Container>
        <hr />
        <Row>
          <Col>
            <h6>Scopri e acquista</h6>
            <p className="mb-0 footertext">Store</p>
            <p className="mb-0 footertext">Ferrari</p>
            <p className="mb-0 footertext">Lamborghini</p>
            <p className="mb-0 footertext">Bugatti</p>
            <p className="mb-0 footertext">Porsche</p>
          </Col>
          <Col>
            <h6>Account</h6>
            <p className="mb-0 footertext">Gestisci il tuo account</p>
            <p className="mb-0 footertext">Account noleggio auto</p>
            <p className="mb-0 footertext">Noleggio.com</p>
          </Col>
          <Col>
            <h6>I maghi del noleggio store</h6>
            <p className="mb-0 footertext">Trova uno store</p>
            <p className="mb-0 footertext">Finanziamenti</p>
            <p className="mb-0 footertext">Stato dell'ordine</p>
            <p className="mb-0 footertext">Assistenza agli acquisti</p>
          </Col>
          <Col>
            <h6>Business</h6>

            <p className="mb-0 footertext">Maghi per il business</p>
            <p className="mb-0 footertext">Acquisti per le aziende</p>
          </Col>
          <Col>
            <h6>I nostri valori</h6>
            <p className="mb-0 footertext">Accesibilità</p>
            <p className="mb-0 footertext">Ambiente</p>
            <p className="mb-0 footertext">Privacy</p>
            <p className="mb-0 footertext">Responabilità dei fornitori</p>
          </Col>
        </Row>
        <hr />
        <footer className="footer">
          <p>&copy; 2023 Maghi del noleggio</p>
        </footer>
      </Container>
    </>
  );
};
export default MyFooter;
