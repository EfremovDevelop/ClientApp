import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

function ProjectCards(props) {
  const handleUpdateProject = () => {
    if (props.onUpdateProject) {
      props.onUpdateProject(props.id);
    }
  };

  const handleDeleteProject = () => {
    if (props.onDeleteProject){
      props.onDeleteProject(props.id);
    }
  };

  const navigate = useNavigate();
  const showProjectIssues = () => {
    navigate(`/project/${props.id}/issue`);
  };

  return (
    <Card className="project-card-view">
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        { props.id && (
          <Button variant="primary" onClick={showProjectIssues} style={{ marginLeft: "10px" }}>
            <CgWebsite /> &nbsp;
            {"Issues"}
          </Button>
        )}
        {props.onUpdateProject && (
          <Button variant="primary" onClick={handleUpdateProject} style={{ marginLeft: "10px" }}>
            Update
          </Button>
        )}
        {props.onDeleteProject && (
          <Button variant="primary" onClick={handleDeleteProject} style={{ marginLeft: "10px" }}>
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
