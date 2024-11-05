import { create } from "zustand";
import { persist } from "zustand/middleware";


const useSignInStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      signInUser: null, // 초기 상태: 로그인 사용자 없음
      login: (signInUser) =>
        set({
          isLoggedIn: true,
          signInUser,
        }), // 사용자 상태 업데이트
      logOut: () =>
        set({
          isLoggedIn: false,
          signInUser: null,
        }),
    }),
    {
      name: "signInUser", // 로컬 스토리지에 저장할 key 이름
      getStorage: () => localStorage, // 기본 저장소 설정
    }
  )
);

export default useSignInStore;