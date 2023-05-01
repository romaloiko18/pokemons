import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProjectList from '../components/ProjectList';
import Spinner from '../components/Spinner';
import { useProjects } from '../context/project';

function Projects() {
  const { projects, fetchProjects, isLoading } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []);

  return <Container>{isLoading ? <Spinner /> : <ProjectList projects={projects} />}</Container>;
}

export default Projects;
