import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useLocation, useNavigate, withRouter } from "react-router-dom";

const TopBar = ({ location }) => {
  const [user, setUser] = useState();
  const navigate = useLocation();
  const getUserFromToken = async () => {
    const aut = JSON.parse(localStorage.getItem("token"));
    const token = aut.accessToken;
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;
    try {
      const resp = await fetch(`http://localhost:3001/user/byId/` + userId, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${aut.accessToken}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  useEffect(() => {
    if (navigate.pathname === "/") {
      console.log(navigate.pathname);
    } else {
      getUserFromToken();
    }
  }, [navigate.pathname]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home">
          <Image
            src="https://imaghidelnoleggio.it/wp-content/uploads/2023/04/Logo-mdn-copia-03-ok-colori-solo-logo-e-sito.png"
            width="100px"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                {" "}
                {navigate.pathname === "/" ? (
                  <></>
                ) : (
                  <>
                    {user.ruolo === "ADMIN" ? (
                      <>
                        <Nav.Link
                          href="/gestionePM"
                          className={navigate.pathname === "/gestionePM" ? "nav-link active" : "nav-link"}
                        >
                          Gestione Parco Macchine
                        </Nav.Link>
                        <Nav.Link
                          href="/gestioneUT"
                          className={navigate.pathname === "/gestioneUT" ? "nav-link active" : "nav-link"}
                        >
                          Gestione Utenti
                        </Nav.Link>
                        <Nav.Link
                          href="/gestionePR"
                          className={navigate.pathname === "/gestionePR" ? "nav-link active" : "nav-link"}
                        >
                          Gestione Prenotazioni
                        </Nav.Link>
                        <Nav.Link href="/" className={navigate.pathname === "/" ? "nav-link active" : "nav-link"}>
                          Esci
                        </Nav.Link>
                      </>
                    ) : (
                      <>
                        <Nav.Link
                          href="/parcoMacchine"
                          className={navigate.pathname === "/parcoMacchine" ? "nav-link active" : "nav-link"}
                        >
                          Parco Macchine
                        </Nav.Link>
                        <Nav.Link
                          href="/ferrari"
                          className={navigate.pathname === "/ferrari" ? "nav-link active" : "nav-link"}
                        >
                          Ferrari
                        </Nav.Link>
                        <Nav.Link
                          href="/lamborghini"
                          className={navigate.pathname === "/lamborghini" ? "nav-link active" : "nav-link"}
                        >
                          Lamborghini
                        </Nav.Link>
                        <Nav.Link
                          href="/bugatti"
                          className={navigate.pathname === "/bugatti" ? "nav-link active" : "nav-link"}
                        >
                          Bugatti
                        </Nav.Link>
                        <Nav.Link
                          href="/mclaren"
                          className={navigate.pathname === "/mclaren" ? "nav-link active" : "nav-link"}
                        >
                          McLaren
                        </Nav.Link>
                        <Nav.Link
                          href="/MiePrenotazioni"
                          className={navigate.pathname === "/MiePrenotazioni" ? "nav-link active" : "nav-link"}
                        >
                          Le mie prenotazioni
                        </Nav.Link>
                        <Nav.Link href="/">Esci</Nav.Link>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default TopBar;
