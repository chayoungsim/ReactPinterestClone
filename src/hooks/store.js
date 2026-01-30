import { create } from "zustand";

export const useStore = create((set) => ({
    savedPins: [],
    addPin: (pin) =>
        set((state) => ({
            savedPins: state.savedPins.some((p) => p.id === pin.id)
                ? state.savedPins
                : [...state.savedPins, pin],
        })),
    removePin: (id) =>
        set((state) => ({
            savedPins: state.savedPins.filter((p) => p.id !== id),
        })),
}));
