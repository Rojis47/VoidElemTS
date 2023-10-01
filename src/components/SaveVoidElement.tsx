import { CiSaveDown2 } from "react-icons/ci";
import { useProjects } from "../contexts/ProjectsProvider";

type SaveVoidElementProps = {
  handleUpdateFields: () => void;
};

const SaveVoidElement = ({ handleUpdateFields }: SaveVoidElementProps) => {
  return (
    <button title="save" onClick={handleUpdateFields}>
      <CiSaveDown2 />
    </button>
  );
};

export default SaveVoidElement;
