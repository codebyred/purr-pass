import { create } from 'zustand'

const useSearchStore = create((set) => ({
  searchQuery: '',
  setSearchQuery: (query:string) => set({ searchQuery: query }),
  clearSearchQuery: () => set({ searchQuery: '' }),
}))

