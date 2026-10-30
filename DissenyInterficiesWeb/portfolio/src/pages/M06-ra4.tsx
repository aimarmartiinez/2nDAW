import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardTask from "../components/CardTask";


function M06ra4() {
    return (
        <section className="min-vh-100 d-flex align-items-center py-5 bg-body-tertiary">
            <Container fluid="xl">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold">M06 - RA4</h1>
                    <p className="lead text-muted">POO, classes, moduls i workspaces en Javascript</p>
                </div>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4 justify-content-center">
                    <CardTask
                        title="Data Types - Exercici 1"
                        description="Variables basiques, arrays numerics i comprovacio de valors positius amb TypeScript."
                        image="https://placehold.co/600x400/adb5bd/ffffff?text=Data+Types+1"
                        iframeUrl="/EntornClient/RA4/DataTypesExercises/index.html"
                    />
                    <CardTask
                        title="Data Types - Exercici 2"
                        description="Enums per talles, dies de la setmana i colors de l'arc de Sant Marti."
                        image="https://placehold.co/600x400/868e96/ffffff?text=Data+Types+2"
                        iframeUrl="/EntornClient/RA4/DataTypesExercises/index.html"
                    />
                    <CardTask
                        title="Data Types - Exercici 3"
                        description="Funcions generiques per obtenir tipus, buscar valors i ordenar arrays."
                        image="https://placehold.co/600x400/6c757d/ffffff?text=Data+Types+3"
                        iframeUrl="/EntornClient/RA4/DataTypesExercises/index.html"
                    />
                    <CardTask
                        title="Data Types - Exercici 4"
                        description="Type aliases, usuaris, unions de tipus i calcul d'arees."
                        image="https://placehold.co/600x400/495057/ffffff?text=Data+Types+4"
                        iframeUrl="/EntornClient/RA4/DataTypesExercises/index.html"
                    />
                    <CardTask
                        title="Classes - Box"
                        description="Classe generica per encapsular valors i descriure el seu contingut."
                        image="https://placehold.co/600x400/212529/ffffff?text=Box"
                        iframeUrl="/EntornClient/RA4/classes/index.html"
                    />
                    <CardTask
                        title="Classes - Figures"
                        description="Classes Rectangle, Quadrat i Cercle amb calcul de perimetres."
                        image="https://placehold.co/600x400/343a40/ffffff?text=Figures"
                        iframeUrl="/EntornClient/RA4/classes/index.html"
                    />
                    <CardTask
                        title="Classes - Conductor"
                        description="Classe Conductor amb metodes sobrecarregats per mostrar informacio."
                        image="https://placehold.co/600x400/495057/ffffff?text=Conductor"
                        iframeUrl="/EntornClient/RA4/classes/index.html"
                    />
                    <CardTask
                        title="Classes - Repository"
                        description="Repositori generic per afegir, consultar i eliminar entitats."
                        image="https://placehold.co/600x400/6c757d/ffffff?text=Repository"
                        iframeUrl="/EntornClient/RA4/classes/index.html"
                    />
                    <CardTask
                        title="Moduls - Toggle Theme"
                        description="Modul per alternar estils de tema clar i fosc sobre un element."
                        image="https://placehold.co/600x400/052c65/ffffff?text=Toggle+Theme"
                        iframeUrl="/EntornClient/RA4/moduls_workspaces/index.html"
                    />
                    <CardTask
                        title="Moduls - Mathematics"
                        description="Funcions exportades per calcular minims, maxims i descomposicio factorial."
                        image="https://placehold.co/600x400/084298/ffffff?text=Mathematics"
                        iframeUrl="/EntornClient/RA4/moduls_workspaces/index.html"
                    />
                </Row>
                
            </Container>
        </section>
    );
}

export default M06ra4;
