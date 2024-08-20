import styles from "../css/routes/DefaultMain.module.css";


function DefaultMain() {
    return (
        <div className={styles.section}>
            <div className={styles.bannerArea}>
                배너
            </div>
            <div className={styles.categoryArea}>
                <ul className={styles.categoryMainBox}>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                    <li className={styles.categoryBox}>
                        <span className={styles.categoryImgSpan}>
                            <img src={require("../../imges/home-img/board.png")} className={styles.categoryImg}></img>
                        </span>
                        <span>커뮤니티</span>
                    </li>
                </ul>
            </div>
            <div className={styles.contentArea}>
                각 카테고리
            </div>
        </div>
    )
}

export default DefaultMain;