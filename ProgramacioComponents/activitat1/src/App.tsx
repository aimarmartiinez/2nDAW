import { useState } from 'react'
import { Button, Col, Container, Form, ListGroup, Navbar, Row, Card } from 'react-bootstrap'
import './App.css'

const provincies = [
  {
    nom: 'Valencia',
    ciutats: ['Valencia', 'Torrent', 'Gandia'],
  },
  {
    nom: 'Alicante',
    ciutats: ['Alicante', 'Elx', 'Benidorm'],
  },
  {
    nom: 'Castello',
    ciutats: ['Castello de la Plana', 'Vila-real', 'Vinaros'],
  },
]

const tasques = [
  'Fer la compra',
  'Estudiar React',
  'Fer els deures de DAW',
  'Repassar TypeScript',
  'Preparar el projecte',
  'Enviar la practica',
]

const noticies = [
  'Noticia principal de portada',
  'Actualitat politica',
  'Resultats esportius',
  'Agenda cultural',
]

function SelectorsProvinciaCiutat() {
  const [provincia, setProvincia] = useState('')
  const [ciutat, setCiutat] = useState('')
  const [resultat, setResultat] = useState('')

  const provinciaSeleccionada = provincies.find((p) => p.nom === provincia)
  const ciutats = provinciaSeleccionada ? provinciaSeleccionada.ciutats : []

  function enviar() {
    if (provincia !== '' && ciutat !== '') {
      setResultat('Has escollit ' + provincia + ' i ' + ciutat)
      setProvincia('')
      setCiutat('')
    }
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>1. Selectors de provincia i ciutat</Card.Title>

        <Row className="g-3">
          <Col md={5}>
            <Form.Label>Provincia</Form.Label>
            <Form.Select
              value={provincia}
              onChange={(event) => {
                setProvincia(event.target.value)
                setCiutat('')
              }}
            >
              <option value="">Selecciona una provincia</option>
              {provincies.map((provincia) => (
                <option key={provincia.nom} value={provincia.nom}>
                  {provincia.nom}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={5}>
            <Form.Label>Ciutat</Form.Label>
            <Form.Select value={ciutat} onChange={(event) => setCiutat(event.target.value)}>
              <option value="">Selecciona una ciutat</option>
              {ciutats.map((ciutat) => (
                <option key={ciutat} value={ciutat}>
                  {ciutat}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={2} className="d-flex align-items-end">
            <Button onClick={enviar} className="w-100">
              Enviar
            </Button>
          </Col>
        </Row>

        <p className="mt-3 mb-0">{resultat}</p>
      </Card.Body>
    </Card>
  )
}

function BuscadorTasques() {
  const [text, setText] = useState('')

  let tasquesFiltrades = tasques

  if (text.length >= 3) {
    tasquesFiltrades = tasques.filter((tasca) =>
      tasca.toLowerCase().includes(text.toLowerCase()),
    )
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>2. Buscador de tasques</Card.Title>

        <Form.Label>Buscar</Form.Label>
        <Form.Control
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Escriu una tasca"
        />

        <ListGroup className="mt-3">
          {tasquesFiltrades.map((tasca) => (
            <ListGroup.Item key={tasca}>{tasca}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

function CapcaleraDiari() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="px-3">
      <Navbar.Brand>El Periodico</Navbar.Brand>
    </Navbar>
  )
}

function MenuDiari() {
  return (
    <div className="menu-diari">
      <span>Portada</span>
      <span>Politica</span>
      <span>Societat</span>
      <span>Esports</span>
      <span>Cultura</span>
    </div>
  )
}

function Noticia({ titol }: { titol: string }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">Seccio</Card.Subtitle>
        <Card.Title>{titol}</Card.Title>
        <Card.Text>Text curt de la noticia per veure com quedaria la pagina.</Card.Text>
      </Card.Body>
    </Card>
  )
}

function Diari() {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>3. Estructura d'un diari</Card.Title>

        <CapcaleraDiari />
        <MenuDiari />

        <Row className="mt-3">
          <Col md={8}>
            {noticies.map((noticia) => (
              <Noticia key={noticia} titol={noticia} />
            ))}
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Mes llegides</Card.Title>
                <ol>
                  <li>Noticia destacada</li>
                  <li>Ultima hora</li>
                  <li>Entrevista del dia</li>
                </ol>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

function App() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Activitat 1</h1>
      <SelectorsProvinciaCiutat />
      <BuscadorTasques />
      <Diari />
    </Container>
  )
}

export default App
