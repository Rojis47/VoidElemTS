import { CiSaveDown2 } from "react-icons/ci";
import { useProjects } from "../contexts/ProjectsProvider";

const SaveVoidElement = () => {
  const { handleUpdateFields } = useProjects();

  return (
    <button title="save" onClick={handleUpdateFields}>
      <CiSaveDown2 />
    </button>
  );
};

export default SaveVoidElement;
