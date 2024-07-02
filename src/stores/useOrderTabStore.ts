import create from "zustand";

interface OrderTabState {
  orderTab: string;
  setOrderTab: (orderTab: string) => void;
}

const useOrderTabStore = create<OrderTabState>((set) => ({
  orderTab: "Current",
  setOrderTab: (orderTab) => set({ orderTab }),
}));

export default useOrderTabStore;
