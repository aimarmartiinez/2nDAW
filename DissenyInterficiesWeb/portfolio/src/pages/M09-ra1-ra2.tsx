import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardTask from "../components/CardTask";
import imgEx1 from "../assets/projectIMG/primeraMaquetacio.png";
import imgEx2 from "../assets/projectIMG/formulari.png";
import imgEx3 from "../assets/projectIMG/indexCartes.png";
import imgEx4 from "../assets/projectIMG/flexbox.png";
import imgEx5 from "../assets/projectIMG/grid.png";
import imgEx6 from "../assets/projectIMG/shadow.png";
import imgTransformacions from "../assets/projectIMG/transformacions.png";

function M09ra1ra2() {
    return (
        <section className="min-vh-100 d-flex align-items-center py-5 bg-body-tertiary">
            <Container fluid="xl">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold">M09 - RA1 i RA2</h1>
                    <p className="lead text-muted">Maquetacio, HTML i CSS</p>
                </div>

                <Row xs={1} md={2} lg={3} xl={4} className="g-4 justify-content-center">
                    <CardTask
                        title="Primera Maquetacio"
                        description="Primera practica de maquetacio amb HTML i CSS."
                        image={imgEx1}
                        iframeUrl="/M09/RA1-Maquetacio-RA2-HTML-CSS/p1-Primera-Maquetacio/PrimeraMaquetacio.html"
                    />
                    <CardTask
                        title="Formularis"
                        description="Practica de formularis i camps HTML."
                        image={imgEx2}
                        iframeUrl="/M09/RA1-Maquetacio-RA2-HTML-CSS/p2-Formulacions/formuari1.html"
                    />
                    <CardTask
                        title="Index - Banc"
                        description="Exercici de maquetacio d'un banc amb index."
                        image={imgEx3}
                        iframeUrl="/M09/RA1-Maquetacio-RA2-HTML-CSS/p3-Index/ex2.html"
                    />
                    <CardTask
                        title="Flexbox"
                        description="Practica d'organitzacio amb Flexbox."
                        image={imgEx4}
                        iframeUrl="/M09/RA1-Maquetacio-RA2-HTML-CSS/p4-Organitzacio(FlexBox)/ex2.html"
                    />
                    <CardTask
                        title="Grid - Piet Mondrian"
                        description="Exercici de maquetacio amb Grid."
                        image={imgEx5}
                        iframeUrl="/M09/RA1-Maquetacio-RA2-HTML-CSS/p5-Maquetacio-Amb-Grid/ex5.html"
                    />
                    <CardTask
                        title="Shadows"
                        description="Practica d'ombres amb CSS."
                        image={imgEx6}
                        iframeUrl="/M09/RA1-Maquetacio-RA2-HTML-CSS/p6-Shadows/ex1Shadows.html"
                    />
                    <CardTask
                        title="Transformacions i Transicions"
                        description="Practica de transformacions i transicions CSS."
                        image={imgTransformacions}
                        iframeUrl="/M09/RA1-Maquetacio-RA2-HTML-CSS/p7-Transformacions-i-Transicions/transformacions.html"
                    />
                </Row>
            </Container>
        </section>
    );
}

export default M09ra1ra2;
