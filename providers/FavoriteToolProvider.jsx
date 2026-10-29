import React from "react";

import TOOL_LIST from "@constants/tool_list";

const FavoriteToolContext = React.createContext();

const FavoriteToolProvider = ({ children }) => {
  const [favoriteTools, setFavoriteTools] = React.useState([]);

  const getFavoriteTools = () => {
    let localFavoriteTools = [];
    try {
      const stored = localStorage.getItem("favoriteTools");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          localFavoriteTools = parsed;
        }
      }
    } catch {
      localFavoriteTools = [];
    }

    const selectedTools = [];
    TOOL_LIST.forEach((section) => {
      const tools = section.tools.filter((tool) =>
        localFavoriteTools.includes(section.path + tool.path),
      );

      if (tools.length) {
        const selected = [];
        tools.forEach((tool) => {
          selected.push({
            ...tool,
            path: section.path + tool.path,
          });
        });

        selectedTools.push(...selected);
      }
    });

    setFavoriteTools(selectedTools);
  };

  const toggleFavorite = (path) => {
    let localFavoriteTools = [];
    try {
      const stored = localStorage.getItem("favoriteTools");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          localFavoriteTools = parsed;
        }
      }
    } catch {
      localFavoriteTools = [];
    }

    if (localFavoriteTools.includes(path)) {
      localFavoriteTools = localFavoriteTools.filter((item) => item !== path);
    } else {
      localFavoriteTools.push(path);
    }

    localStorage.setItem("favoriteTools", JSON.stringify(localFavoriteTools));

    getFavoriteTools();
  };

  React.useEffect(() => {
    getFavoriteTools();
  }, []);

  return (
    <FavoriteToolContext.Provider value={{ favoriteTools, toggleFavorite }}>
      {children}
    </FavoriteToolContext.Provider>
  );
};

export { FavoriteToolProvider, FavoriteToolContext };
