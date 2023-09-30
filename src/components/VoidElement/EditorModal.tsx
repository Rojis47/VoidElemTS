import { useContext } from "react";
import EditorLeft from "./Icons/EditorLeft";
import EditorTop from "./Icons/EditorTop";
import EditorRight from "./Icons/EditorRight";
import { themeContext } from "../../contexts/ThemeContext";

interface EditorModalProps {
  onblur: () => void;
  editorPosition: "top" | "left" | "right";
  changeEditorPosition: (position: "top" | "left" | "right") => void;
}

const EditorModal = ({ onblur, changeEditorPosition }: EditorModalProps) => {
  const darkThemeContext = useContext(themeContext) || false;
  return (
    <div
      className="editor-position__modal-container"
      // onBlur={onblur}
      // onMouseOut={onblur}
      // onClick={(el) => {
      //   if (el.target !== el.currentTarget) {
      //     onblur();
      //   }
      // }}
      // useRef here 👆
      onMouseLeave={onblur}
      style={{
        backgroundColor: darkThemeContext ? "hsl(225, 6%, 25%)" : "white",
        color: darkThemeContext ? "white" : "hsl(225, 6%, 25%)",
      }}
    >
      <div className="editor-position__modal-wrapper">
        <h3 className="editor-position__title">Change View</h3>
        <ul className="editor-position__action-wrapper">
          <li onClick={() => changeEditorPosition("left")}>
            <EditorLeft dark={darkThemeContext} />
          </li>
          <li onClick={() => changeEditorPosition("top")}>
            <EditorTop dark={darkThemeContext} />
          </li>
          <li onClick={() => changeEditorPosition("right")}>
            <EditorRight dark={darkThemeContext} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditorModal;
