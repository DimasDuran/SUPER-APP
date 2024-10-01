// RecentAppProvider.js
import React from "react";
import RecentAppContext from "./RecentAppContext"; // Importa el contexto
import useLastDetection from "../hooks/useLastDetection"; // Hook de Zustand

// Proveedor que envuelve la aplicación
export const RecentAppProvider = ({ children }) => {
  const recentAppStore = useLastDetection(); // Hook de Zustand

  return (
    <RecentAppContext.Provider value={recentAppStore}>
      {children}
    </RecentAppContext.Provider>
  );
};
