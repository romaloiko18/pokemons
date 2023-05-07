import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProjectList from '../components/ProjectList';
import Spinner from '../components/Spinner';
import { useProjects } from '../context/project';
import UsefulLinksProjects from '../components/UsefulLinksProjects';

function Projects() {
  const { projects, fetchProjects, isLoading } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <div style={{ height: '50vh', overflow: 'auto' }}>
            <h2>Projects</h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, tempore.</p>

            <ProjectList projects={projects} />
          </div>

          <UsefulLinksProjects />
        </div>
      )}
    </Container>
  );
}

export default Projects;
