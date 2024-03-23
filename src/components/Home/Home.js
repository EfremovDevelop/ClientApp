import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

const url = "http://localhost:5178/api/projects";

function Home() {

    const [allProjects, setProjects] = useState([]);

    const getProjects = async () => {
        const options = {
            method: 'GET'
        }
        const result = await fetch(url, options)
        if (result.ok){
            const projects = await result.json();
            console.log("Data:", projects);
            setProjects(projects);
            return projects;
        }
        return [];
    }

    useEffect(()=>{
        getProjects();
    },[])

    return (
    <section>
        <Container fluid className="home-section" id="home" style={{minHeight: "100vh"}}>
        <Particle />
        <Container className="home-content">
            <Row>
            <Col md={7} className="home-header">
                <h1 style={{ paddingBottom: 35 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                    👋🏻
                </span>
                </h1>

                <h1 className="heading-name">
                I'M
                <strong className="main-name"> SOUMYAJIT BEHERA</strong>
                </h1>
            </Col>
            </Row>
        </Container>
        </Container>
    </section>
    );
}

export default Home;
