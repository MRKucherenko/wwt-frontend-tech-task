import { create } from "zustand";

type FiltersState = {
    filters: Record<string,string[]>;
    setFilters: (filters: Record<string, string[]>) => void
}

export const useFiltersStore = create<FiltersState>((set) => ({
    filters: {},
    setFilters: (filters) => set({filters})
}))