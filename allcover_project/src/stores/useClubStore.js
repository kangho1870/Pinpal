import { create } from "zustand";
import { persist } from "zustand/middleware";

const useClubStore = create(
  persist(
    (set) => ({
      members: [],
      ceremonys: [],
      games: [],
      setMembers: (data) => set({ members: data }),
      setCeremonys: (data) => set({ ceremonys: data}),
      setGames: (data) => set({games: data}),
      setPage: (index) => set({ page: index }),
      
    }),
    {
      name: "club-storage", // 로컬 스토리지에 저장될 키 이름
      getStorage: () => localStorage, // 로컬 스토리지 사용
    }
  )
);

export default useClubStore;
