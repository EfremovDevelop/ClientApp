import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";

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

  return (
    <Card className="project-card-view">
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        { props.issues && (
          <Button
            variant="primary"
            href={props.issues}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
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
