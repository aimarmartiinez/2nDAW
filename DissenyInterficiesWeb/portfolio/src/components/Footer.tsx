import Container from 'react-bootstrap/Container';

function Footer() {
    return (
        <footer className="bg-body-tertiary border-top mt-5 py-4">
            <Container className="text-center">

                <h5 className="fw-bold mb-3">Contacto</h5>

                <div className="d-flex flex-column gap-2 text-muted">
                    <div>
                        <i className="bi bi-envelope me-2"></i>
                        aimar@example.com
                    </div>

                    <div>
                        <i className="bi bi-telephone me-2"></i>
                        +34 600 000 000
                    </div>

                    <div>
                        <i className="bi bi-geo-alt me-2"></i>
                        Barcelona, Catalunya
                    </div>
                </div>

                <div className="d-flex justify-content-center gap-3 fs-5 mt-3">
                    <i className="bi bi-github"></i>
                    <i className="bi bi-linkedin"></i>
                    <i className="bi bi-instagram"></i>
                </div>

                <hr className="my-3" />

                <small className="text-muted">
                    © {new Date().getFullYear()} Aimar Martínez Calzado · Todos los derechos reservados
                </small>

            </Container>
        </footer>
    );
}

export default Footer;