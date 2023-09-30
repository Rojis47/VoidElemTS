import { useState } from "react";
import Editor from "./Editor/Editor";
import Console from "./Console";
import Header from "./Header/Header";
import ThemeContext from "../../contexts/ThemeContext";
import "../../styles/voidElement.css";
type VoidElementProps = {
  initialHtml: string;
  initialCss: string;
  initialJs: string;
};

export default function VoidElement({
  initialHtml,
  initialCss,
  initialJs,
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

  const srcDoc = `
  <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${javascript}</script>
  </html>
  `;

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
      <div className={` ${abstractDarkTheme ? "dark" : "light"}`}>
        <Header
          editorPosition={editorPosition}
          changeEditorPosition={setEditorPosition}
          changeAbstractDarkTheme={setAbstractDarkTheme}
        />
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
              displayName="HTML"
              language="xml"
              value={html}
              onChange={setHtml}
              editorPosition={editorPosition}
            />
            <Editor
              displayName="CSS"
              language="css"
              value={css}
              onChange={setCss}
              editorPosition={editorPosition}
            />
            <Editor
              displayName="Javascript"
              language="javascript"
              value={javascript}
              onChange={setJavascript}
              editorPosition={editorPosition}
            />
          </div>
          <div
            className="pane bottom-pane"
            style={{
              width: editorPosition === "top" ? "100%" : "50%",
              height: editorPosition === "top" ? "50%" : "100%",
            }}
          >
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>
          <Console javascript={javascript} />
        </div>
      </div>
    </ThemeContext>
  );
}
