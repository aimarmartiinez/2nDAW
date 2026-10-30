import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CardPresentation() {
    return (
        <Card className="overflow-hidden border-0 bg-body-tertiary w-100 shadow-none">
            <Row className="g-0 align-items-center">
                <Col lg={5} xl={4}>
                    <Card.Img 
                        src="../src/assets/aimar.png" 
                        className="img-fluid h-100 object-fit-cover"
                        alt="Aimar Martínez"
                        style={{ minHeight: '100px', maxHeight: '500px', minWidth: '100px', maxWidth: '500px' }}
                    />
                </Col>
                <Col lg={7} xl={8}>
                    <Card.Body className="p-4 p-md-5 p-xl-6">
                        <h1 className="display-2 fw-bold mb-4">Aimar Martínez Calzado</h1>
                        <p className="fs-3 text-secondary mb-5">
                            Bienvenidos a mi portfolio web donde podreis ver los diferentes proyectos que he realizado durante el Ciclo Formativo de Grado Superior de Desarrollo de Aplicaciones Web.
                        </p>
                        <div className="d-flex gap-3 mt-4">
                            <Button variant="primary" size="lg" className="px-5 py-3 fs-4 shadow-none">
                                <i className="bi bi-briefcase me-2"></i> Mis proyectos
                            </Button>
                            <Button variant="outline-primary" size="lg" className="px-5 py-3 fs-4 shadow-none">
                                <i className="bi bi-person me-2"></i> Sobre mi
                            </Button>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default CardPresentation;