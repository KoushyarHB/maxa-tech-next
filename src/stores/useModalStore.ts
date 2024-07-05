import { create } from "zustand";

interface ModalState {
  open: boolean;
  modalTitle: string;
  modalType: string;
  setOpen: (open: boolean) => void;
  setModalTitle: (title: string) => void;
  setModalType: (type: string) => void;
}

const useModalStore = create<ModalState>((set) => ({
  open: false,
  modalType: "",
  modalTitle: "",
  setOpen: (isOpen) => set({ open: isOpen }),
  setModalTitle: (title) => set({ modalTitle: title }),
  setModalType: (type) => set({ modalType: type }),
}));

export default useModalStore;
