import create from "zustand";

interface ShipmentCostState {
  shipmentCost: number;
  setShipmentCost: (shipmentCost: number) => void;
}

const useShipmentCostStore = create<ShipmentCostState>((set) => ({
  shipmentCost: 22.5,
  setShipmentCost: (shipmentCost) => set({ shipmentCost }),
}));

export default useShipmentCostStore;
