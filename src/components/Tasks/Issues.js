import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./Issues.css"; // Подключаем пользовательские стили
import Particle from "../Particle";

const urlProjects = "http://localhost:5178/api/projects";

const Issues = () => {
    const { projectId } = useParams();
    const [allIssues, setIssues] = useState([]);

    const getIssues = async () => {
        const options = {
            method: "GET"
        };
        const result = await fetch(`${urlProjects}/${projectId}/issues/`, options);
        if (result.ok) {
            const issues = await result.json();
            console.log("Data:", issues);
            setIssues(issues);
            return issues;
        }
        return [];
    }

    useEffect(() => {
        getIssues();
    }, [projectId]);

    return (
        <Container fluid className="project-section" style={{ minHeight: "100vh" }}>
            <Particle />
            <Container>
                <Table striped bordered hover variant="dark" className="custom-table">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allIssues.map(issue => (
                            <tr key={issue.id}>
                                <td><Link to={`/projects/${projectId}/issues/${issue.id}`}>{issue.name}</Link></td>
                                <td>{issue.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
};

export default Issues;
