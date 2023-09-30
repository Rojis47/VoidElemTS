import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Requests } from "../utils/api";
import { Project, TActiveSelector } from "../Types";

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  updateProject: (id: number, newHtmlValue: string) => Promise<void>;
  handleProjectUpdateChange: (
    field: "html" | "css" | "javascript",
    value: string
  ) => void;
  handleUpdateFields: () => void;
  activeSelector: TActiveSelector;
  setActiveSelector: (selector: TActiveSelector) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSelector, setActiveSelector] = useState<TActiveSelector>("home");
  const [originalProject, setOriginalProject] = useState<Project | null>(null);
  const [editedProject, setEditedProject] = useState<Project | null>(null);

  useEffect(() => {
    setOriginalProject(projects[0]);
    setEditedProject(projects[0]);
  }, [projects]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Requests.fetchProjects();
        setProjects(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProjectUpdateChange = (
    field: "html" | "css" | "javascript",
    value: string
  ) => {
    if (editedProject) {
      setEditedProject({ ...editedProject, [field]: value });
    }
  };

  const updateProject = async (id: number) => {
    if (!originalProject || !editedProject) return;

    const updates: Partial<Project> = {};

    if (originalProject.html !== editedProject.html) {
      updates.html = editedProject.html;
    }
    if (originalProject.css !== editedProject.css) {
      updates.css = editedProject.css;
    }
    if (originalProject.javascript !== editedProject.javascript) {
      updates.javascript = editedProject.javascript;
    }

    const response = await Requests.patchUpdateProject(id, updates);
    setOriginalProject(editedProject);
    return response.data;
  };

  const handleUpdateFields = async () => {
    try {
      await updateProject(projects[0].id);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        error,
        updateProject,
        handleProjectUpdateChange,
        handleUpdateFields,
        activeSelector,
        setActiveSelector,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
