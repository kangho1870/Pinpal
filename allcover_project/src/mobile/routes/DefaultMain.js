import styles from "../css/routes/DefaultMain.module.css";


function DefaultMain() {
    return (
        <div className={styles.section}>
            <div className={styles.bannerArea}>
                <div className={styles.bannerBox}>
                    배너
                </div>
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
            <div className={styles.line}></div>
            <div className={styles.contentArea}>
                <div className={styles.contentBox}>
                    <div>카테고리</div>
                    <div>카테고리</div>
                    <div>카테고리</div>
                    <div>카테고리</div>
                    <div>카테고리</div>
                    <div>카테고리</div>
                    <div>카테고리</div>
                    <div>카테고리</div>
                    <div>카테고리</div>
                </div>
            </div>
        </div>
    )
}

export default DefaultMain;