import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Habilidades() {
    return (
        <section id="habilities" className="min-vh-100 d-flex align-items-center py-5">

            <Container fluid="xl">

                <Row className="mb-5 text-center">

                    <Col>

                        <h2 className="display-3 fw-bold mb-3">
                            Habilidades
                        </h2>

                        <p className="text-secondary fs-5">
                            Tecnologies i eines que utilitzo
                        </p>

                    </Col>

                </Row>

                <Row className="g-4">

                    <Col md={6} lg={3}>

                        <Card className="text-center border-0 h-100 bg-body-tertiary shadow-none">

                            <Card.Body className="p-4">

                                <i className="bi bi-code-slash fs-1 mb-3 text-primary"></i>

                                <h5>Frontend</h5>

                                <p className="text-muted">
                                    HTML, CSS, JS, React
                                </p>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col md={6} lg={3}>

                        <Card className="text-center border-0 h-100 bg-body-tertiary shadow-none">

                            <Card.Body className="p-4">

                                <i className="bi bi-server fs-1 mb-3 text-primary"></i>

                                <h5>Backend</h5>

                                <p className="text-muted">
                                    Laravel, APIs REST
                                </p>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col md={6} lg={3}>

                        <Card className="text-center border-0 h-100 bg-body-tertiary shadow-none">

                            <Card.Body className="p-4">

                                <i className="bi bi-database fs-1 mb-3 text-primary"></i>

                                <h5>Bases de datos</h5>

                                <p className="text-muted">
                                    MySQL, modelado
                                </p>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col md={6} lg={3}>

                        <Card className="text-center border-0 h-100 bg-body-tertiary shadow-none">

                            <Card.Body className="p-4">

                                <i className="bi bi-git fs-1 mb-3 text-primary"></i>

                                <h5>Control de versiones</h5>

                                <p className="text-muted">
                                    Git y GitHub
                                </p>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </Container>

        </section>
    );
}

export default Habilidades;
