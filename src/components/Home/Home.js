import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

function Home() {
    return (
    <section>
        <Container fluid className="home-section" id="home" style={{minHeight: "100vh"}}>
        <Particle />
        <Container className="home-content">
            <Row>
            <Col md={7} className="home-header">
                <h1 style={{ paddingBottom: 5 }} className="heading">
                Еще не знаю что здесь будет{" "}
                </h1>
            </Col>
            </Row>
        </Container>
        </Container>
    </section>
    );
}

export default Home;
