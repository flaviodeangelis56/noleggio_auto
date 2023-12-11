import { Col, Container, Row } from "react-bootstrap";

const MyFooter = () => {
  return (
    <>
      <div className="pt-5"></div>
      <Container>
        <hr />
        <Row>
          <Col>
            Scopri e acquista
            <p className="mb-0">Store</p>
            <p className="mb-0">Ferrari</p>
            <p className="mb-0">Lamborghini</p>
            <p className="mb-0">Bugatti</p>
            <p className="mb-0">Porsche</p>
          </Col>
          <Col>
            Account
            <p className="mb-0">Gestisci il tuo account</p>
            <p className="mb-0">Account noleggio auto</p>
            <p className="mb-0">Noleggio.com</p>
          </Col>
          <Col>
            I maghi del noleggio store
            <p className="mb-0">Trova uno store</p>
            <p className="mb-0">Finanziamenti</p>
            <p className="mb-0">Stato dell'ordine</p>
            <p className="mb-0">Assistenza agli acquisti</p>
          </Col>
          <Col>
            Business
            <p className="mb-0">Maghi per il business</p>
            <p className="mb-0">Acquisti per le aziende</p>
          </Col>
          <Col>
            I nostri valori
            <p className="mb-0">Accesibilità</p>
            <p className="mb-0">Ambiente</p>
            <p className="mb-0">Privacy</p>
            <p className="mb-0">Responabilità dei fornitori</p>
          </Col>
        </Row>
        <hr />
        <footer className="footer">
          <p>&copy; 2023 Il Tuo Nome</p>
        </footer>
      </Container>
    </>
  );
};
export default MyFooter;
