import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardTask from "../components/CardTask";
import imgDom from "../assets/projectIMG/dom.png";
import imgEvents4 from "../assets/projectIMG/events4.png";
import imgEvents6 from "../assets/projectIMG/events6.png";
import imgFvalidacio from "../assets/projectIMG/validacio.png";
import imgAmazones from "../assets/projectIMG/amazones.png";
import imgKanban from "../assets/projectIMG/kanban.png";

function M06ra3ra5ra6() {
    return (
        <section className="min-vh-100 d-flex align-items-center py-5 bg-body-tertiary">
            <Container fluid="xl">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold">M06 - RA3, RA5 i RA6</h1>
                    <p className="lead text-muted">DOM, esdeveniments, Drag and Drop i formularis</p>
                </div>

                <Row xs={1} md={2} lg={3} xl={4} className="g-4 justify-content-center">
                    <CardTask
                        title="DOM Exercici 3"
                        description="Practica sobre manipulacio de l'arbre del DOM utilitzant els metodes natius de JS."
                        image={imgDom}
                        iframeUrl="/EntornClient/RA3-RA5-RA6/DOM/Exercici3/index.html"
                    />
                    <CardTask
                        title="Events Exercici 4"
                        description="Gestio d'esdeveniments del ratoli i teclat per crear interaccions dinamicas."
                        image={imgEvents4}
                        iframeUrl="/EntornClient/RA3-RA5-RA6/Events/Exercici4/index.html"
                    />
                    <CardTask
                        title="Events Exercici 6"
                        description="Gestio d'esdeveniments del ratoli i pantalla per controlar posicions del click"
                        image={imgEvents6}
                        iframeUrl="/EntornClient/RA3-RA5-RA6/Events/Exercici6/index.html"
                    />
                    <CardTask
                        title="Formularis - Validacio"
                        description="Validacio de formularis amb expressions regulars i feedback a l'usuari."
                        image={imgFvalidacio}
                        iframeUrl="/EntornClient/RA3-RA5-RA6/Formularis/Validacio/index.html"
                    />
                    <CardTask
                        title="Joc de les Amazones"
                        description="Joc de taula estrategic implementat manipulant l'estructura del DOM."
                        image={imgAmazones}
                        iframeUrl="/EntornClient/RA3-RA5-RA6/Navegacio_DOM/joc_amazones/dist/index.html"
                    />
                    <CardTask
                        title="Kanban"
                        description="Tauler de tasques Kanban utilitzant l'API nativa de Drag and Drop."
                        image={imgKanban}
                        iframeUrl="/EntornClient/RA3-RA5-RA6/drag_and_drop/kanban/index.html"
                    />
                </Row>
            </Container>
        </section>
    );
}

export default M06ra3ra5ra6;
