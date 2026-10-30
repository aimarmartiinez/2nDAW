import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardTask from "../components/CardTask";
import imgPr1 from "../assets/projectIMG/pr1.png";
import imgCrud from "../assets/projectIMG/crud.png";


function M06ra7() {
    return (
        <section className="min-vh-100 d-flex align-items-center py-5 bg-body-tertiary">
            <Container fluid="xl">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold">M06 - RA7</h1>
                    <p className="lead text-muted">Asincronia, fetch, promises i APIs</p>
                </div>

                <Row xs={1} md={2} lg={3} xl={4} className="g-4 justify-content-center">
                    <CardTask
                        title="Practica 1 - Asincronia"
                        description="Us de promises i async await per manejar crides asincrones a APIs externes."
                        image={imgPr1}
                        iframeUrl="/EntornClient/ra7-asincronia/pr1/dist/index.html"
                    />
                    <CardTask
                        title="Gestió de Jugadors"
                        description="Aplicacio de gestió de futbolistes amb operacions CRUD, asincronía."
                        image={imgCrud}
                        videoUrl="/EntornClient/ra7-asincronia/web-app-template/web-app-template.mp4"
                    />
                </Row>
            </Container>
        </section>
    );
}

export default M06ra7;
