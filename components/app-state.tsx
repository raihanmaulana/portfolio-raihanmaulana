"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AppState = {
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  projectSlug: string | null;
  setProjectSlug: (slug: string | null) => void;
};

const AppStateContext = createContext<AppState | null>(null);

// Shared by the nav pill, the command palette and the project grid, so the
// palette can open a project's detail dialog.
export function AppStateProvider({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [projectSlug, setProjectSlug] = useState<string | null>(null);

  const value = useMemo(
    () => ({ paletteOpen, setPaletteOpen, projectSlug, setProjectSlug }),
    [paletteOpen, projectSlug],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const state = useContext(AppStateContext);
  if (!state) throw new Error("useAppState must be used in AppStateProvider");
  return state;
}
