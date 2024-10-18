import { HOME_PATH, ROOT_PATH } from "../constants";


export const signInUserCheck = (token, navigator) => {
    if(token == null) {
        alert("로그인이 필요한 서비스입니다.");
        navigator(ROOT_PATH);
        return;
    }

    navigator(HOME_PATH)
}