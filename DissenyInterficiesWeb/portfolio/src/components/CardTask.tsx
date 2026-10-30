import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Ratio from 'react-bootstrap/Ratio';

interface CardTaskProps {
    title: string;
    description: string;
    image: string;
    iframeUrl?: string;
    videoUrl?: string;
}

function CardTask({ title, description, image, iframeUrl, videoUrl }: CardTaskProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Col>
                <Card className="h-100 shadow-sm border-0">
                    {image && (
                        <Ratio aspectRatio="16x9">
                            <Card.Img src={image} className="object-fit-cover" alt={title} />
                        </Ratio>
                    )}

                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="fw-bold">{title}</Card.Title>
                        <Card.Text className="text-muted mb-4">{description}</Card.Text>

                        <Button
                            variant="primary"
                            className="mt-auto rounded-pill"
                            onClick={() => setShowModal(true)}
                        >
                            <i className="bi bi-play-circle me-2"></i> Ver práctica
                        </Button>
                    </Card.Body>
                </Card>
            </Col>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body className="p-0">
                    <Ratio aspectRatio="16x9">
                        {videoUrl ? (
                            <video
                                src={videoUrl}
                                controls
                                className="w-100 h-100"
                                style={{ objectFit: 'cover' }}
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <iframe
                                src={iframeUrl}
                                title={title}
                                className="border-0"
                                allowFullScreen
                            ></iframe>
                        )}
                    </Ratio>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CardTask;
