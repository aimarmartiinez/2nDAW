import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardTask from "../components/CardTask";
import imgConnecta4 from "../assets/projectIMG/connecta4.png";
import imgSopa from "../assets/projectIMG/sopa.png";
import imgSimon from "../assets/projectIMG/simon.png";

function M06ra1ra2() {
    return (
        <section className="min-vh-100 d-flex align-items-center py-5 bg-body-tertiary">
            <Container fluid="xl">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold">M06 - RA1 i RA2</h1>
                    <p className="lead text-muted">Sintaxi de Javascript, variables, bucles i logica inicial</p>
                </div>

                <Row xs={1} md={2} lg={3} xl={4} className="g-4 justify-content-center">
                    <CardTask
                        title="Exercicis JavaScript"
                        description="Diversos exercicis per practicar la sintaxi bàsica de JavaScript, variables, bucles i lògica de programació."
                        image="https://placehold.co/600x400/052c65/ffffff?text=Exercicis+JS"
                        iframeUrl="/EntornClient/RA1-RA2/JS_INICIALS/index.html"
                    />
                    <CardTask
                        title="Connecta 4"
                        description="Classic joc de taula del Connecta 4 on l'objectiu es alinear 4 fitxes del teu color."
                        image={imgConnecta4}
                        iframeUrl="/EntornClient/RA1-RA2/connecta4.html"
                    />
                    <CardTask
                        title="Sopa de Lletres"
                        description="Joc interactiu de sopa de lletres creat amb Javascript pur."
                        image={imgSopa}
                        iframeUrl="/EntornClient/RA1-RA2/sopa.html"
                    />
                    <CardTask
                        title="Simon"
                        description="El joc de memoria Simon Diu on has de repetir els patrons de colors."
                        image={imgSimon}
                        iframeUrl="/EntornClient/RA1-RA2/simon/index.html"
                    />
                </Row>
            </Container>
        </section>
    );
}

export default M06ra1ra2;
