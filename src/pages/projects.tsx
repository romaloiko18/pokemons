import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { http } from '../services/api';
import { Project } from '../types/project';
import ProjectList from '../components/ProjectList';
import Spinner from '../components/Spinner';

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data } = await http.get<{ projects: Project[]; success: boolean }>('/project');

        setProjects(data.projects);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return <Container>{isLoading ? <Spinner /> : <ProjectList projects={projects} />}</Container>;
}

export default Projects;
