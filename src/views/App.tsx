import IconSideNav from "../components/IconSideNav";
import ProjectListContainer from "../containers/ProjectListContainer";
import { ProjectsProvider } from "../contexts/ProjectsProvider";

export default function App() {
  return (
    <ProjectsProvider>
      {/* <IconSideNav /> */}
      <ProjectListContainer />
    </ProjectsProvider>
  );
}
