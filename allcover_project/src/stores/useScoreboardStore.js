import { create } from "zustand";
import { persist } from "zustand/middleware";

const useScoreboard = create(
  persist(
    (set) => ({
      members: [],
      gradeModal: false,
      teamModal: false,
      confirmModal: false,
      sideJoinUserModal: false,
      sideRankingModal: false,
      scoreInputModal: false,
      page: 0,
      navTitle: ['대기실', '점수표', '팀전', '시상'],
      team1stMember: {},

      setMembers: (data) => set({ members: data }),
      toggleGradeModal: () => set((state) => ({ gradeModal: !state.gradeModal })),
      toggleTeamModal: () => set((state) => ({ teamModal: !state.teamModal })),
      toggleConfirmModal: () => set((state) => ({ confirmModal: !state.confirmModal })),
      toggleSideJoinUserModal: () => set((state) => ({ sideJoinUserModal: !state.sideJoinUserModal })),
      toggleSideRankingModal: () => set((state) => ({ sideRankingModal: !state.sideRankingModal })),
      toggleScoreInputModal: () => set((state) => ({ scoreInputModal: !state.scoreInputModal })),
      setPage: (index) => set({ page: index }),
      
      clearMembers : () => set({ members: [] }),
      setTeam1stMember: (data) => set({team1stMember: data}),
    }),
    {
      name: "scoreboard-storage", // 로컬 스토리지에 저장될 키 이름
      getStorage: () => localStorage, // 로컬 스토리지 사용
    }
  )
);

export default useScoreboard;
