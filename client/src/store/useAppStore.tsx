import { create } from "zustand";

import type { IAppStore } from "../types/Interfaces";
import { persist } from "zustand/middleware";

export const useAppStore = create<IAppStore>()(
    persist(
    (set) => ({
        theme: 'light',
        toggleTheme: () => set((state)=> ({theme: state.theme === 'light' ? 'dark' : 'light'})),
        sort: 'desc',
        toggleSort: () => set((state) => ({sort: state.sort === 'asc' ? 'desc' : 'asc'})),
        isStudio: false,
        toggleIsStudio: (val: boolean) => set((state) => ({isStudio: state.isStudio = val})),
        isRoom: false,
        toggleIsRoom: (val: boolean) => set((state) => ({isRoom: state.isRoom = val})),
        isApartment: false,
        toggleIsApartment: () => set((state) => ({isApartment: state.isApartment === true ? false : true})),
        roomSelectArray: [],
        setRoomSelectArray: (value: number) => set((state) => {
            if (state.roomSelectArray.includes(value)) {
                const newRoomSelect = state.roomSelectArray.filter((val) => val !== value);
                return {roomSelectArray: newRoomSelect}
            } else { 
                const newRoomSelect = [...state.roomSelectArray, value]; 
                return {roomSelectArray: newRoomSelect}
            }
        }),
}),
{name: 'storageApp',
    partialize: (state) => ({
        theme: state.theme,
    })
}
),

);

