import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

const url = "http://localhost:5178/api/projects";

function Projects() {
  const [allProjects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const [projectData, setProjectData] = useState({ name: "", description: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    console.log("Button clicked - show modal");
    setShow(true);
  };

  const getProjects = async () => {
    const options = {
      method: "GET"
    };
    const result = await fetch(url, options);
    if (result.ok) {
      const projects = await result.json();
      console.log("Data:", projects);
      setProjects(projects);
      return projects;
    }
    return [];
  };

  useEffect(() => {
    getProjects();
  }, []);

  const createProject = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(projectData)
      };
      const result = await fetch(url, options);
      if (result.ok) {
        // Обновляем список проектов после успешного добавления нового проекта
        await getProjects();
        // Закрываем модальное окно
        handleClose();
        // Очищаем поля ввода
        setProjectData({ name: "", description: "" });
      } else {
        console.error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleChangeProject = () => {
    if (projectData.id){
      updateProject(projectData.id);
    }
    else {
      createProject();
    }
  };

  const updateProject = async (projectId) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(projectData)
    };
    const result = await fetch(`${url}/${projectId}`, options);
    if (result.ok) {
      // Обновляем список проектов после успешного добавления нового проекта
      await getProjects();
      // Закрываем модальное окно
      handleClose();
      // Очищаем поля ввода
      setProjectData({ name: "", description: "" });
      console.log("Updating project with id:", projectId);
    } else {
      console.error("Failed to create project");
    }
  };

  const handleUpdateProject = (projectId) => {
    setProjectData({
      ...projectData,
      id: projectId,
      name: allProjects.find(project => project.id === projectId).name,
      description: allProjects.find(project => project.id === projectId).description
    });
    setShow(true);
  };

  const deleteProject = async (projectId) => {
    const options = {
      method: "DELETE",
    };
    const result = await fetch(`${url}/${projectId}`, options);
    if (result.ok) {
      await getProjects();
      handleClose();
      console.log("Delete project with id:", projectId);
    } else {
      console.error("Failed to delete project");
    }
  }

  const handleDeleteProject = (projectId) => {
    deleteProject(projectId);
  };

  return (
    <Container fluid className="project-section" style={{ minHeight: "100vh" }}>
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Projects </strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {allProjects.map((project) => (
            <Col md={4} className="project-card" key={project.id}>
              <ProjectCard
                id={project.id}
                name={project.name}
                description={project.description}
                issues={"http://localhost:3000"}
                onUpdateProject = {handleUpdateProject}
                onDeleteProject = {handleDeleteProject}
              />
            </Col>
          ))}
        </Row>
        <Button variant="primary" onClick={handleShow} className="btn-primary">
          Add Project
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Project name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Name" 
                value={projectData.name} 
                onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                autoFocus 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={projectData.description} 
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
              />
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleChangeProject}>
              {projectData.id ? "Update project" : "Create project"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
}

export default Projects;
