import { create } from "zustand";

const useSignInStore = create((set) => ({
    signInUser: null, // 초기 상태: 로그인 사용자 없음
    setSignInUser: (signInUser) => set({ signInUser }), // 사용자 상태 업데이트
}));

export default useSignInStore;