import { useEffect } from "react";
import BottomCategory from "../components/BottomCategory";
import styles from "../css/routes/MyClub.module.css";
import useSignInStore from "../../stores/useSignInStore";

function MyClub() {

    const { signInUser, setSignInUser } = useSignInStore();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.clubTitle}>
                        <div className={styles.topCategory}><i class="fa-solid fa-reply"></i></div>
                        <span className={styles.topCategory}>test</span>
                        <div className={styles.topCategory}><i class="fa-solid fa-right-from-bracket"></i></div>
                    </div>
                    <div className={styles.clubNav}>
                        <button className={styles.clubNavBtns}><span className={styles.btnSpan}>홈</span></button>
                        <button className={styles.clubNavBtns}><span className={styles.btnSpan}>기록실</span></button>
                        <button className={styles.clubNavBtns}><span className={styles.btnSpan}>게시판</span></button>
                        <button className={styles.clubNavBtns}><span className={styles.btnSpan}>랭킹</span></button>
                    </div>
                </div>
                {
                    signInUser.clubId !== null &&
                    <div className={styles.contextArea}>
                        <div className={`${styles.clubBannerArea} ${styles.commonDiv}`}>
                            배너
                        </div>
                        <div className={`${styles.clubDescription} ${styles.commonDiv}`}>
                            부산 서면볼링센터 상주 <br></br>
                            정모 : 매월 2,4주 일요일 오후 2시 <br></br>
                            정법 : 매월 1,3주 월요일 오후 8시 <br></br>
                            회비 : 매월 1만원 <br></br>
                            · 볼링초보, 볼링구력자 모두 대환영 (장비와 유니폼은 필수 구입해야 함!) <br></br>
                            번개 매일, <br></br>
                            금요일 정기 판게임 있음 3인조, <br></br>
                            주간하이 등 수시 이벤트 다양 <br></br>
                            진정 볼링을 사랑하는 볼러들 모집중 <br></br>
                            볼링레슨 가능~~ <br></br>
                            볼링이중 클럽 <br></br>
                            나이제한 83년생까지 <br></br>
                            가입 후 한달이내 참석필수 <br></br>
                            #부산볼링 #볼링클럽 #서면볼링 #볼링 #부산볼링클럽 #볼링동호회 #2030 #부산동호회
                        </div>
                        <div>
                            <h3>클럽 일정</h3>
                        </div>
                        <div className={`${styles.clubSchedule} ${styles.commonDiv}`}>
                            <div className={styles.scheduleBox}>
                                <div className={styles.scheduleTitle}>
                                    <p>7월 첫번째 정기모임</p>
                                    <div className={styles.scheduleTitle}>
                                        <p>7/14 (일)</p>
                                        <button className={styles.scheduleJoinBtn}>참석</button>
                                    </div>
                                </div>
                                <div className={styles.scheduleContnet}>
                                    <div>
                                        <img className={styles.scheduleImg} src={require("../../imges/club/bowlingGame.png")}></img>
                                    </div>
                                    <div className={styles.scheduleDescriptionArea}>
                                        <div className={styles.scheduleDescriptionBox}>
                                            <span className={styles.descriptionSubTitle}>일시</span>
                                            <h5 className={styles.descriptionSubContent}>7/14 (일) 오후 2:00</h5>
                                        </div>
                                        <div className={styles.scheduleDescriptionBox}>
                                            <span className={styles.descriptionSubTitle}>일시</span>
                                            <h5 className={styles.descriptionSubContent}>7/14 (일) 오후 2:00</h5>
                                        </div>
                                        <div className={styles.scheduleDescriptionBox}>
                                            <span className={styles.descriptionSubTitle}>일시</span>
                                            <h5 className={styles.descriptionSubContent}>7/14 (일) 오후 2:00</h5>
                                        </div>
                                        <div className={styles.scheduleDescriptionBox}>
                                            <span className={styles.descriptionSubTitle}>참석</span>
                                            <h5 className={styles.descriptionSubContent}>11명</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>최근 게임</h3>
                        </div>
                        <div className={`${styles.clubRecentGame} ${styles.commonDiv}`}>
                            <div className={styles.recentGameBox}>
                                <p>제 41회 정모</p>
                                <div className={styles.recentGameCeremony}>
                                    <div className={styles.recentGameDescriptionBox}>
                                        <span className={styles.recentGameSubTitle}>1등</span>
                                        <h5 className={styles.recentGameSubContent}>강호</h5>
                                    </div>
                                    <div className={styles.recentGameDescriptionBox}>
                                        <span className={styles.recentGameSubTitle}>슈퍼히어로</span>
                                        <h5 className={styles.recentGameSubContent}>강호</h5>
                                    </div>
                                </div>
                                <div className={styles.recentGameCeremony}>
                                    <div className={styles.recentGameDescriptionBox}>
                                        <span className={styles.recentGameSubTitle}>1군 1등</span>
                                        <h5 className={styles.recentGameSubContent}>강호</h5>
                                    </div>
                                    <div className={styles.recentGameDescriptionBox}>
                                        <span className={styles.recentGameSubTitle}>2군 1등</span>
                                        <h5 className={styles.recentGameSubContent}>강호</h5>
                                    </div>
                                </div>
                                <div className={styles.recentGameCeremony}>
                                    <div className={styles.recentGameDescriptionBox}>
                                        <span className={styles.recentGameSubTitle}>3군 1등</span>
                                        <h5 className={styles.recentGameSubContent}>강호</h5>
                                    </div>
                                    <div className={styles.recentGameDescriptionBox}>
                                        <span className={styles.recentGameSubTitle}>4군 1등</span>
                                        <h5 className={styles.recentGameSubContent}>강호</h5>
                                    </div>
                                </div>
                                <div className={styles.recentGameTeamCeremony}>
                                    <span className={styles.recentGameSubTitle}>팀 1등</span>
                                    <h5 className={styles.recentGameSubContent}>강호, 강호, 강호, 강호, 강호</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    !signInUser &&
                    <>
                        ㅇ
                    </>
                }
            </div>
            <div className={styles.bottom}>
                    <BottomCategory></BottomCategory>
            </div>
        </>
    )
}

export default MyClub;