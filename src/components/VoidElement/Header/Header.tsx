import React, { useContext, useState, useEffect, SetStateAction } from "react";
import HeaderStyles from "./Header.module.css";
import { themeContext, setThemeContext } from "../../../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import EditorTop from "../Icons/EditorTop";
import EditorLeft from "../Icons/EditorLeft";
import EditorRight from "../Icons/EditorRight";
import EditorModal from "../EditorModal";
import styles from "../Editor/Editor.module.css";
import PropTypes from "prop-types";
import FavoriteVoidElement from "../FavoriteVoidElement";
import SaveVoidElement from "../../SaveVoidElement";
import BubbleText from "../../BubbleText";

type HeaderProps = {
  editorPosition: "top" | "left" | "right";
  changeEditorPosition: React.Dispatch<
    React.SetStateAction<"top" | "left" | "right">
  >;
  changeAbstractDarkTheme: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  name: string;
  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
  handleUpdateFields: (id: number) => void;
};

const Header = ({
  editorPosition = "top",
  changeEditorPosition,
  changeAbstractDarkTheme,
  name,
  isFavorite,
  setIsFavorite,
  projectId,
  handleUpdateFields,
}: HeaderProps) => {
  const [isEditorModalActive, setIsEditorModalActive] = useState(false);

  const darkThemeContext = useContext(themeContext) || false;
  const setDarkThemeContext = useContext(setThemeContext) as React.Dispatch<
    SetStateAction<boolean>
  >;

  const setEditorIcon = {
    top: () => <EditorTop dark={darkThemeContext} />,
    left: () => <EditorLeft dark={darkThemeContext} />,
    right: () => <EditorRight dark={darkThemeContext} />,
  };

  const headerConditionalStyle = {
    backgroundColor: darkThemeContext ? "black" : "white",
    color: darkThemeContext ? "white" : "hsl(225, 6%, 25%)",
    fill: darkThemeContext ? "white" : "hsl(225, 6%, 25%)",
  };

  useEffect(() => {
    if (changeAbstractDarkTheme) {
      changeAbstractDarkTheme(darkThemeContext);
    }
  }, [darkThemeContext, changeAbstractDarkTheme]);
  return (
    <header className={HeaderStyles.header} style={headerConditionalStyle}>
      <div className={` ${HeaderStyles["logo-wrapper"]}`}>
        <h3 className="text-2xl font-bold">
          <BubbleText text={name} />
        </h3>
      </div>
      <div className={HeaderStyles["header-action-wrapper"]}>
        <div
          className={`${HeaderStyles["header-action-btn"]} ${HeaderStyles["info-container"]}`}
        >
          <FontAwesomeIcon
            icon={faInfo}
            className={HeaderStyles["info-icon"]}
          />
          <div
            className={HeaderStyles["info-content-wrapper"]}
            style={headerConditionalStyle}
          >
            <div className={HeaderStyles["info-content-header"]}>INFO:</div>
            <ul className={HeaderStyles["info-content-list-wrapper"]}>
              <li className={HeaderStyles["info-content-list-item"]}>
                Enter fullscreen mode
              </li>
              <li className={HeaderStyles["info-content-list-item"]}>
                Exit fullscreen mode
              </li>
              <li className={HeaderStyles["info-content-list-item"]}>
                Display console terminal (bottom left)
              </li>
              <li className={HeaderStyles["info-content-list-item"]}>
                Love this? My{" "}
                <a href="#" target="_blank">
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={HeaderStyles["header-action-btn"]}>
          <SaveVoidElement handleUpdateFields={handleUpdateFields} />
        </div>
        <div className={HeaderStyles["header-action-btn"]}>
          <FavoriteVoidElement
            projectId={projectId}
            isFavorite={isFavorite}
            onClick={() => setIsFavorite(!isFavorite)}
          />
        </div>
        <div
          className={`${HeaderStyles["header-action-btn"]} ${HeaderStyles["theme-btn"]}`}
          onClick={() => setDarkThemeContext((prevTheme) => !prevTheme)}
          tabIndex={0}
        >
          <FontAwesomeIcon
            icon={darkThemeContext ? faSun : faMoon}
            transform="right-4"
          />
        </div>
        <div
          className={HeaderStyles["header-action-btn"]}
          onClick={() => setIsEditorModalActive(!isEditorModalActive)}
        >
          {setEditorIcon[editorPosition]()}
          {isEditorModalActive && (
            <div className={styles.someClassName}>
              <EditorModal
                editorPosition={editorPosition}
                changeEditorPosition={changeEditorPosition}
                onblur={() => setIsEditorModalActive(false)}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  editorPosition: PropTypes.string.isRequired,
  changeEditorPosition: PropTypes.func,
};

Header.defaultProps = {
  editorPosition: "top",
};

export default Header;
