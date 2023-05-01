import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { http } from '../services/api';
import { Ticket } from '../types/ticket';
import ticket from '../pages/ticket';
import { Project } from '../types/project';

type ProjectsContext = {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  fetchProject: (projectId: string) => Promise<void>;
  currentProject: Project | null;
  addNewProject: (values: { name?: string; description?: string }, projectId?: string) => Promise<void>;
  updateProject: (values: { status?: string; description?: string; name?: string }, projectId?: string) => Promise<void>;
  addNewContributor: (values: { email: string }) => Promise<void>;
  isError: boolean;
  isLoading: boolean;
};

const defaultValue: ProjectsContext = {
  projects: [],
  currentProject: null,

  fetchProjects: async () => {},
  fetchProject: async (projectId: string) => {},
  addNewProject: async (values: { name?: string; description?: string }) => {},
  updateProject: async (values: { status?: string; description?: string; name?: string }, projectId?: string) => {},
  addNewContributor: async (values: { email: string }) => {},

  isError: false,
  isLoading: false
};

const ProjectsContext = createContext(defaultValue);

export const ProjectContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncCallback = async (callback: () => Promise<any>) => {
    try {
      setIsLoading(true);

      await callback();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    await handleAsyncCallback(async () => {
      const { data } = await http.get<{ projects: Project[]; success: boolean }>(`/project`);

      setProjects(data.projects);
    });
  };

  const fetchProject = async (projectId: string) => {
    await handleAsyncCallback(async () => {
      const { data } = await http.get<{ project: Project; success: boolean }>(`/project/${projectId}`);

      setCurrentProject(data.project);
    });
  };

  const addNewProject = async (values: { name?: string; description?: string }) => {
    await handleAsyncCallback(async () => {
      if (!currentProject) return;

      const { data } = await http.post<{ project: Project; success: boolean }>(`/project/${currentProject._id}`, values);

      setProjects((prevState) => [...prevState, data.project]);
    });
  };

  const updateProject = async (values: { status?: string; description?: string; name?: string }) => {
    await handleAsyncCallback(async () => {
      if (!currentProject) return;

      const { data } = await http.patch<{ project: Project; success: boolean }>(`/project/${currentProject._id}`, values);

      setCurrentProject(data.ticket);
    });
  };

  const addNewContributor = async (values: { email: string }) => {
    await handleAsyncCallback(async () => {
      if (!currentProject) return;

      const { data } = await http.post<{ project: Project; success: boolean }>(`/project/${currentProject._id}/team`, values);

      setCurrentProject(data.project);
    });
  };

  const value = {
    projects,
    currentProject,

    fetchProjects,
    fetchProject,
    addNewProject,
    updateProject,

    addNewContributor,

    isError,
    isLoading
  };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
};

export const useProjects = () => {
  return useContext(ProjectsContext);
};
