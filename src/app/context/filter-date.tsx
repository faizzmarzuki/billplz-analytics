"use client";

import React from "react";

export type DateRange = {start: string;end: string;} | null;

type FilterDateContextType = {
  range: DateRange;
  setRange: (r: DateRange) => void;
};

const FilterDateContext = React.createContext<FilterDateContextType | undefined>(undefined);

export function FilterDateProvider({ children, value }: {children: React.ReactNode;value: FilterDateContextType;}) {
  return <FilterDateContext.Provider value={value}>{children}</FilterDateContext.Provider>;
}

export function useFilterDate() {
  const ctx = React.useContext(FilterDateContext);
  if (!ctx) throw new Error("useFilterDate must be used within a FilterDateProvider");
  return ctx;
}