"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface UIContextValue {
  scanlines: boolean;
  toggleScanlines: () => void;
  setScanlines: (v: boolean) => void;
  paletteOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [scanlines, setScanlines] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Drive the CSS variable overlay from state (no re-render of the overlay tree).
  useEffect(() => {
    document.documentElement.style.setProperty("--scan-opacity", scanlines ? "0.35" : "0");
  }, [scanlines]);

  const toggleScanlines = useCallback(() => setScanlines((p) => !p), []);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const togglePalette = useCallback(() => setPaletteOpen((p) => !p), []);

  const value = useMemo<UIContextValue>(
    () => ({
      scanlines,
      toggleScanlines,
      setScanlines,
      paletteOpen,
      openPalette,
      closePalette,
      togglePalette,
    }),
    [scanlines, toggleScanlines, openPalette, closePalette, togglePalette],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within <UIProvider>");
  return ctx;
}
