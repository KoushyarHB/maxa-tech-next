import create from "zustand";

interface TabState {
  tab: string;
  setTab: (tab: string) => void;
}

const useTabStore = create<TabState>((set) => ({
  tab: "Personal Data",
  setTab: (tab) => set({ tab }),
}));

export default useTabStore;
