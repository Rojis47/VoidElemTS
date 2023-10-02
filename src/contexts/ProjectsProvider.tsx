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
  updateProject: (id: number) => Promise<void>;
  handleProjectUpdateChange: (
    field: "html" | "css" | "javascript",
    value: string
  ) => void;

  activeSelector: TActiveSelector;
  setActiveSelector: (selector: TActiveSelector) => void;
  originalProject: Project | null;
  editedProject: Project | null;
  setOriginalProject: (project: Project) => void;
  setEditedProject: (project: Project) => void;
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
    setEditedProject({ ...editedProject, [field]: value });
  };

  const updateProject = async (id: number) => {
    if (!editedProject) return;

    // Here, we're sending the entire editedProject, without checking for differences.
    const response = await Requests.patchUpdateProject(id, editedProject);

    if (response && response.data) {
      setOriginalProject(editedProject); // Update the originalProject after saving
    }

    return response.data;
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        error,
        updateProject,
        handleProjectUpdateChange,
        activeSelector,
        setActiveSelector,
        originalProject,
        editedProject,
        setOriginalProject,
        setEditedProject,
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
