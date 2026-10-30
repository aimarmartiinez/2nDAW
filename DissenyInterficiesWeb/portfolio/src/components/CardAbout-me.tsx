import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SobreMi() {
    return (
        <Card className="border-0 bg-body-tertiary w-100 shadow-none mt-4">

            <Row className="g-0 align-items-stretch">

                {/* Texto principal */}
                <Col lg={8}>

                    <Card.Body className="p-4 p-md-5 p-xl-6">

                        <h2 className="display-3 fw-bold mb-4">
                            Quién soy
                        </h2>

                        <p className="fs-4 text-secondary mb-4">
                            Soy estudiante de Desarrollo de Aplicaciones Web con interés
                            en crear interfaces limpias y funcionales.
                        </p>

                        <p className="fs-5 text-muted lh-lg mb-4">
                            Me encuentro en una etapa de aprendizaje constante,
                            combinando formación académica con proyectos personales
                            enfocados en frontend y experiencia de usuario.
                        </p>

                        <div className="d-flex flex-wrap gap-2">

                            <span className="badge text-bg-primary p-3">
                                Aprendizaje continuo
                            </span>

                            <span className="badge text-bg-success p-3">
                                Desarrollo web
                            </span>

                            <span className="badge text-bg-dark p-3">
                                Trabajo en equipo
                            </span>

                        </div>

                    </Card.Body>

                </Col>

                {/* Aficiones dentro de SobreMi */}
                <Col lg={4} className="bg-body-secondary">

                    <Card.Body className="p-4 p-md-5 p-xl-6">

                        <h3 className="fw-bold mb-4 text-body">
                            Aficiones
                        </h3>

                        <div className="d-flex flex-column gap-3">

                            <div className="p-3 bg-body rounded shadow-sm text-body">
                                <i className="bi bi-trophy text-warning me-2"></i>
                                Fútbol
                            </div>

                            <div className="p-3 bg-body rounded shadow-sm text-body">
                                <i className="bi bi-music-note text-primary me-2"></i>
                                Música
                            </div>

                            <div className="p-3 bg-body rounded shadow-sm text-body">
                                <i className="bi bi-controller text-success me-2"></i>
                                Videojuegos
                            </div>

                            <div className="p-3 bg-body rounded shadow-sm text-body">
                                <i className="bi bi-people text-info me-2"></i>
                                Amigos
                            </div>

                        </div>

                    </Card.Body>

                </Col>

            </Row>

        </Card>
    );
}

export default SobreMi;
