import { useState } from "react";
import styles from "../css/routes/Main.module.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, HOME_PATH, ROOT_PATH } from "../../constants";
import { useEffect } from "react";

function Main() {

      // state: 쿠키 상태 //
    const [cookies] = useCookies();

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // effect: 마운트 시 경로 이동 effect //
    useEffect(() => {
        if(cookies[ACCESS_TOKEN]) navigator(HOME_PATH);
        else navigator(ROOT_PATH);
    }, []);

    const [snsBtn, setSnsBtn] = useState(["kakao", "guest"])

    const authBtnClickHandler = (sns) => {
        window.location.href = `http://52.78.178.156:8000/ap1/v1/auth/sns-sign-in/${sns}`
    };

    return (
        <>
            <div className={styles.container}>
                
                <header>
                    <div>
                        <h3>
                            진짜 볼링의 세계로,
                        </h3>
                        <h4>
                            PinPal
                        </h4>
                    </div>
                </header>
                <section>
                    <div className={styles.mainBox}>
                        <div>
                            <img src={require("../../imges/login-img/logo.png")} className={styles.logo}></img>
                        </div>
                        <div className={styles.btnArea}>
                            <button className={styles.kakaoBtn}>
                                <div className={styles.btnBox} onClick={() => authBtnClickHandler("kakao")}>
                                    <img src={require("../../imges/login-img/kakao.png")} className={styles.kakaoImg}></img>
                                    <p>카카오로 계속하기</p>
                                </div>
                            </button>
                            <button className={styles.guestBtn} onClick={() => authBtnClickHandler("guest")}>
                                <div className={styles.btnBox}>
                                    <div className={styles.geustIcon}>
                                        <i class="fa-solid fa-bowling-ball"></i>
                                    </div>
                                    <p>Guest로 계속하기</p>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div style={{height: "1px", marginTop: "15px", borderTop: "1px solid #dbdbdb", width: "65%"}}></div>
                    
                </section>
                
            </div>
        </>
    )
}

export default Main;