import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import CardTask from '../components/CardTask';
import imgAnalisi from '../assets/projectIMG/analisisImatges.png';
import videoAnalisi from '../assets/projectIMG/videoAnalisi.png';
import imgResponsive from '../assets/projectIMG/dissenyResponsive.png';
import imgResponsive2 from '../assets/projectIMG/responsiveDesign2.png';


function M09ra5ra6() {
    return (
        <section className="min-vh-100 d-flex align-items-center py-5 bg-body-tertiary">
            <Container fluid="xl">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold">M09 - RA5-RA6</h1>
                    <p className="lead text-muted">Anàlisi de imatges, videos i dissenys responsius.</p>
                </div>

                <Card className="border-0 shadow-sm">
                    <Card.Body className="p-4 p-md-5 text-center">
                        <Row xs={1} md={2} lg={3} xl={4} className="g-4 justify-content-center">
                            <CardTask
                                title="Anàlisi d'imatges"
                                description="Analisi d'imatges."
                                image={imgAnalisi}
                                iframeUrl="/DissenyInterficiesWeb/rendiment-Imatges/analisi/analisi/index.html"
                            />
                            <CardTask
                                title="Anàlisi de videos"
                                description="Analisi de videos."
                                image={videoAnalisi}
                                iframeUrl="/DissenyInterficiesWeb/rendiment-Imatges/analisi/video/index.html"
                            />
                            <CardTask
                                title="Disseny responsiu"
                                description="Disseny responsiu."
                                image={imgResponsive}
                                iframeUrl="/DissenyInterficiesWeb/ra5-ra6/responsive/index.html"
                            />
                            <CardTask
                                title="Disseny responsiu 2"
                                description="Disseny responsiu."
                                image={imgResponsive2}
                                iframeUrl="/DissenyInterficiesWeb/ra5-ra6/responsive/index2.html"
                            />
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    );
}

export default M09ra5ra6;
