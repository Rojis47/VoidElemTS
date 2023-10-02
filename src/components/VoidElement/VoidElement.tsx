import { useState } from "react";
import Editor from "./Editor/Editor";
import Header from "./Header/Header";
import ThemeContext from "../../contexts/ThemeContext";
import { ProjectsProvider } from "../../contexts/ProjectsProvider";
import "../../styles/voidElement.css";
import { useProjects } from "../../contexts/ProjectsProvider";
import { Project } from "../../Types";
import { set } from "zod";
type VoidElementProps = {
  initialHtml: string;
  initialCss: string;
  initialJs: string;
  name: string;
  projectId: number;
};

export default function VoidElement({
  initialHtml,
  initialCss,
  initialJs,
  name,
  projectId,
}: VoidElementProps) {
  const [html, setHtml] = useState<string>(initialHtml);
  const [css, setCss] = useState<string>(initialCss);
  const [javascript, setJavascript] = useState<string>(initialJs);
  const [editorPosition, setEditorPosition] = useState<
    "top" | "left" | "right"
  >("top");
  const [abstractDarkTheme, setAbstractDarkTheme] = useState<
    boolean | undefined
  >();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { handleProjectUpdateChange, updateProject } = useProjects();

  const srcDoc = `
  <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${javascript}</script>
  </html>
  `;

  const handleUpdateFields = async () => {
    updateProject(projectId);
    console.log("projectId", projectId);
  };

  const handleHtmlChange = (newHtml: string) => {
    setHtml(newHtml);
    handleProjectUpdateChange("html", newHtml);
  };

  const handleCssChange = (newCss: string) => {
    setCss(newCss);
    handleProjectUpdateChange("css", newCss);
  };

  const handleJavascriptChange = (newJavascript: string) => {
    setJavascript(newJavascript);
    handleProjectUpdateChange("javascript", newJavascript);
  };

  type PaneStyles = {
    paneContainer: React.CSSProperties;
    topPane: React.CSSProperties;
  };

  const appConditionalStyles: Record<"top" | "left" | "right", PaneStyles> = {
    top: {
      paneContainer: { flexDirection: "column" },
      topPane: { flexDirection: "row" },
    },
    left: {
      paneContainer: { flexDirection: "row" },
      topPane: { flexDirection: "column" },
    },
    right: {
      paneContainer: { flexDirection: "row-reverse" },
      topPane: { flexDirection: "column" },
    },
  };

  return (
    <ThemeContext>
      <div className="flex justify-center w-full mx-auto">
        <div className="w-2/3 h-full ">
          <div className="w-full m-4 border-2 border-indigo-300 rounded">
            {" "}
            <Header
              handleUpdateFields={handleUpdateFields}
              projectId={projectId}
              setIsFavorite={setIsFavorite}
              isFavorite={isFavorite}
              name={name}
              editorPosition={editorPosition}
              changeEditorPosition={setEditorPosition}
              changeAbstractDarkTheme={setAbstractDarkTheme}
            />
          </div>
          <div className="w-full m-4 border-2 border-indigo-300 rounded bg-slate-800">
            <div className={`w-full ${abstractDarkTheme ? "dark" : "light"}`}>
              <div
                className="pane-container"
                style={appConditionalStyles[editorPosition].paneContainer}
              >
                <div
                  className="pane top-pane"
                  style={{
                    width: editorPosition === "top" ? "100%" : "50%",
                    height: editorPosition === "top" ? "50%" : "100%",
                    padding: editorPosition === "top" ? 0 : undefined,
                    backgroundColor: abstractDarkTheme
                      ? "hsl(225, 6%, 25%)"
                      : "hsl(0deg 3% 73%)",
                    ...appConditionalStyles[editorPosition].topPane,
                  }}
                >
                  <Editor
                    projectId={projectId}
                    displayName="HTML"
                    language="xml"
                    value={html}
                    onChange={handleHtmlChange}
                    editorPosition={editorPosition}
                  />
                  <Editor
                    projectId={projectId}
                    displayName="CSS"
                    language="css"
                    value={css}
                    onChange={handleCssChange}
                    editorPosition={editorPosition}
                  />
                  <Editor
                    projectId={projectId}
                    displayName="Javascript"
                    language="javascript"
                    value={javascript}
                    onChange={handleJavascriptChange}
                    editorPosition={editorPosition}
                  />
                </div>
                <iframe
                  srcDoc={srcDoc}
                  title="output"
                  sandbox="allow-scripts"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
          <div className="m-4 border-2 border-dashed rounded h-min border-slate-600 bg-slate-800"></div>{" "}
        </div>
      </div>
    </ThemeContext>
  );
}
