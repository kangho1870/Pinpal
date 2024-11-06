import { span } from "framer-motion/client";
import styles from "../css/routes/DefaultMain.module.css";
import { useState } from "react";
import AddClub from "./AddClub";
import { useNavigate } from "react-router-dom";
import { CLUB_DETAIL_PATH } from "../../constants";


function DefaultMain() {
    const [addClubModal, setAddClubModal] = useState(true);
    const navigator = useNavigate();

    const goToClub = (clubId) => {
        navigator(CLUB_DETAIL_PATH(clubId));
    };
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
                <p>신규 클럽</p>
                <div className={styles.contentBox}>
                    <div className={styles.clubContainer} onClick={() => goToClub(1)}>
                        <img className={styles.clubLogo} src={require("../../imges/headerCategory-img/logo.png")}></img>
                        <div className={styles.clubDescription}>
                            <p>Allcover 볼링클럽</p>
                            <span className={styles.clubDescriptionFont}>부산 서면볼링센터 상주</span>
                            <div className={styles.clubPlace}>
                                <div className={styles.clubPlaceBox}>부산/진구</div>
                                <span className={styles.clubDescriptionFont}>멤버 : 20</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DefaultMain;