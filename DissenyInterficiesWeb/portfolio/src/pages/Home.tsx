import CardPresentation from "../components/CardPresentation";
import Footer from "../components/Footer.tsx";
import Habilities from "../components/Habilities.tsx";
import AboutMe from "../components/CardAbout-me.tsx";

function Home() {
    return (
        <>
            <section id="presentation" className="min-vh-100 d-flex align-items-center py-5">
                <div className="container-xl">
                    <CardPresentation />
                </div>
            </section>

            <section id="about-me" className="min-vh-100 d-flex align-items-center py-5 bg-body-tertiary">
                <div className="container-xl">
                    <AboutMe />
                </div>
            </section>

            <Habilities />

            <Footer />
        </>
    )
}

export default Home;