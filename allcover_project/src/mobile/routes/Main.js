import styles from "../css/routes/Main.module.css";

function Main() {

    return (
        <>
            <div className={styles.container}>
                <header>
                    <div>
                        <h3>
                            진짜 볼링의 세계로,
                        </h3>
                        <h4>
                            볼링AtoZ
                        </h4>
                    </div>
                </header>
                <section>
                    <div className={styles.mainBox}>
                        <div>
                            <img src={require("../../imges/login-img/logo.png")} className={styles.logo}></img>
                        </div>
                        <div>
                            <button className={styles.kakaoBtn}>
                                <div className={styles.btnBox}>
                                    <img src={require("../../imges/login-img/kakao.png")} className={styles.kakaoImg}></img>
                                    <p>카카오로 계속하기</p>
                                </div>
                            </button>
                            <button className={styles.guestBtn}>
                                <div className={styles.btnBox}>
                                    <div className={styles.geustIcon}>
                                        <i class="fa-solid fa-bowling-ball"></i>
                                    </div>
                                    <p>Guest로 계속하기</p>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div style={{height: "1px", marginTop: "15px", borderTop: "1px solid #dbdbdb", width: "270px"}}></div>
                    
                </section>
                
            </div>
        </>
    )
}

export default Main;