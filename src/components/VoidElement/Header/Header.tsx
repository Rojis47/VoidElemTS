import React, { useContext, useState, useEffect, SetStateAction } from "react";
import HeaderStyles from "./Header.module.css";
import { themeContext, setThemeContext } from "../../../contexts/ThemeContext";
import FavourzLogoWhite from "../../../assets/img/favourz-logo-white.png";
import FavourzLogoBlack from "../../../assets/img/favourz-logo-black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import EditorTop from "../Icons/EditorTop";
import EditorLeft from "../Icons/EditorLeft";
import EditorRight from "../Icons/EditorRight";
import EditorModal from "../EditorModal";
import styles from "../Editor/Editor.module.css";
import PropTypes from "prop-types";

type HeaderProps = {
  editorPosition: "top" | "left" | "right";
  changeEditorPosition: React.Dispatch<
    React.SetStateAction<"top" | "left" | "right">
  >;
  changeAbstractDarkTheme: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
};

const Header = ({
  editorPosition = "top",
  changeEditorPosition,
  changeAbstractDarkTheme,
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
    backgroundColor: darkThemeContext ? "hsl(225, 6%, 25%)" : "white",
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
      <div className={`${HeaderStyles["logo-wrapper"]}`}>
        <img
          src={darkThemeContext ? FavourzLogoWhite : FavourzLogoBlack}
          alt="Favour Okoh Logo"
        />
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
