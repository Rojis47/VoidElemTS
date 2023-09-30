import React, {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the types for the context values
type ThemeContextType = boolean;
type SetThemeContextType = Dispatch<SetStateAction<boolean>>;

// Create the contexts with explicit types
export const themeContext = createContext<ThemeContextType | undefined>(
  undefined
);
export const setThemeContext = createContext<SetThemeContextType | undefined>(
  undefined
);

interface ThemeContextProps {
  children: ReactNode;
}

const ThemeContext = ({ children }: ThemeContextProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <themeContext.Provider value={darkMode}>
      <setThemeContext.Provider value={setDarkMode}>
        {children}
      </setThemeContext.Provider>
    </themeContext.Provider>
  );
};

export default ThemeContext;
