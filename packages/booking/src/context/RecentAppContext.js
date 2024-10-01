// RecentAppContext.js
import { createContext, useContext } from "react";

// Crea el contexto
const RecentAppContext = createContext(null);

// Hook para usar el contexto
export const useRecentAppContext = () => {
  const context = useContext(RecentAppContext);
  if (!context) {
    throw new Error(
      "useRecentAppContext must be used within a RecentAppProvider"
    );
  }
  return context;
};

export default RecentAppContext;
