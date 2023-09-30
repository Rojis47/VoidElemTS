import SideNav from "../components/SideNav";
import ProjectListContainer from "../containers/ProjectListContainer";
import { ProjectsProvider } from "../contexts/ProjectsProvider";

export default function App() {
  return (
    <ProjectsProvider>
      <div className="flex bg-slate-900 text-slate-100">
        <SideNav />
        <div>
          <ProjectListContainer />
        </div>
      </div>
    </ProjectsProvider>
  );
}
