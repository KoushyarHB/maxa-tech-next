import { create } from "zustand";

interface GrandTotalState {
  grandTotal: number;
  setGrandTotal: (grandTotal: number) => void;
}

const useGrandTotalStore = create<GrandTotalState>((set) => ({
  grandTotal: 0,
  setGrandTotal: (grandTotal) => set({ grandTotal }),
}));

export default useGrandTotalStore;
