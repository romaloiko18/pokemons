import React, { useState } from 'react';
import { Card, Carousel, Col, Row } from 'react-bootstrap';
import FAQ from '../components/FAQ';

const Main = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setActiveSlideIndex(selectedIndex);
  };

  return (
    <>
      <div className="bg-primary" style={{ width: '100vw', height: '100vh', marginRight: 100 }}>
        <h1 className="text-center" style={{ color: 'white', paddingTop: 20 }}>
          Team Management
        </h1>

        <Carousel activeIndex={activeSlideIndex} onSelect={handleSelect} className="p1">
          <Carousel.Item className="d-flex justify-content-center p-3">
            <Card bg="blue" className="p-3 w-50">
              <div className="d-flex justify-content-center">
                <Card.Img variant="top" className="w-25" src="../image2.jpeg" />
              </div>

              <Card.Body>
                <div className="d-flex justify-content-center flex-column align-items-center">
                  <Card.Title>Unlock your team's best work with TeamW Software</Card.Title>

                  <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>

                  <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Carousel.Item>

          <Carousel.Item className="d-flex justify-content-center p-3">
            <Card bg="blue" className="p-3 w-50">
              <div className="d-flex justify-content-center">
                <Card.Img variant="top" className="w-25" src="../image2.jpeg" />
              </div>
              <Card.Body>
                <div className="d-flex justify-content-center flex-column align-items-center">
                  <Card.Title>Unlock your team's best work with TeamW Software</Card.Title>

                  <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>

                  <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Carousel.Item>

          <Carousel.Item className="d-flex justify-content-center p-3">
            <Card bg="blue" className="p-3 w-50">
              <div className="d-flex justify-content-center">
                <Card.Img variant="top" className="w-25" src="../image2.jpeg" />
              </div>

              <Card.Body>
                <div className="d-flex justify-content-center flex-column align-items-center">
                  <Card.Title>Unlock your team's best work with TeamW Software</Card.Title>

                  <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>

                  <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Carousel.Item>
        </Carousel>
      </div>

      <div style={{ width: '100vw', background: 'white' }}>
        <div className="p-5 d-flex justify-content-center align-items-center flex-column">
          <Row className="g-4 p-10 w-75">
            <h1 className="text-center">Complete guide</h1>

            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx}>
                <Card>
                  <div className="d-flex justify-content-evenly">
                    <Card.Img className="p-3 w-50" variant="top" src="../image2.jpeg" />
                  </div>

                  <Card.Body>
                    <Card.Title>Card title</Card.Title>

                    <Card.Text>Guide for different operations n this application, that help to achieve goals</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div className="p-10 d-flex justify-content-center bg-primary" style={{ minHeight: 500 }}>
        <div className="w-75">
          <FAQ />
        </div>
      </div>
    </>
  );
};

export default Main;
