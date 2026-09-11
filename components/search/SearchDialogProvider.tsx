"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SearchDialogContextType = {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const SearchDialogContext = createContext<SearchDialogContextType | null>(null);

export function SearchDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SearchDialogContext.Provider
      value={{
        isOpen,
        openSearch: () => setIsOpen(true),
        closeSearch: () => setIsOpen(false),
      }}
    >
      {children}
    </SearchDialogContext.Provider>
  );
}

export function useSearchDialog() {
  const ctx = useContext(SearchDialogContext);
  if (!ctx) throw new Error("useSearchDialog must be used inside SearchDialogProvider");
  return ctx;
}
